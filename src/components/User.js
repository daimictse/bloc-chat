import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      creatingNewUsername: false
    };
    const newUsername = '';
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  displayName() {
    if (this.newUsername)
      return this.newUsername;
    if (this.props.activeUser)
      return this.props.activeUser.displayName;
    return "Guest";
  }

  setUsername() {
    this.setState({ creatingNewUsername: true });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
    this.props.setUser('');
    this.newUsername = undefined;
  }

  getNewUsernamePopupClass() {
    let className = "new-username-popup";
    if (this.state.creatingNewUsername)
      className += " new-username-popup-active";
    return className;
  }

  clearText(e) {
    e.target.value = '';
  }

  saveNewUsername(e) {
    this.newUsername = e.target.value;
  }

  changeUsername(e) {
    e.preventDefault();
    this.setState({ creatingNewUsername: false });
  }

  render() {
    return (
      <section className="authentication">
        <div className="user" onClick={() => this.setUsername()}>{this.displayName()}</div>
        <button type="button" onClick={() => this.signIn()}>Sign In</button>
        <button type="button" onClick={() => this.signOut()}>Sign Out</button>
        <div className={this.getNewUsernamePopupClass()}>
          <div className="popup-title">Set a username</div>
          <form>
            <div className="popup-subtitle">This name will appear when you send messages</div>
            <input className="popupInput" type="text" name="username" onClick={e => this.clearText(e)} onChange={e => this.saveNewUsername(e)}/><br />
            <input className="createButton" type="submit" value="Set username" onClick={e => this.changeUsername(e)}/>
          </form>
        </div>
      </section>
    );
  }
}

export default User;
