import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      creatingNewUsername: false
    };
    const displayName = 'Guest';
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
    });
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
    this.displayName = "Guest";
    this.props.setUser(null);
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
    this.displayName = e.target.value;
  }

  changeUsername(e) {
console.log("changeusername");
    e.preventDefault();
    this.setState({ creatingNewUsername: false });
    this.props.setUser(this);
  }

  render() {
    return (
      <section className="authentication">
        <div className="user" onClick={() => this.setUsername()}>{this.props.activeUser}</div>
        <button type="button" onClick={() => this.signIn()}>Sign In</button>
        <button type="button" onClick={() => this.signOut()}>Sign Out</button>
        <div className={this.getNewUsernamePopupClass()}>
          <div className="popup-title">Set a username</div>
          <form>
            <div className="popup-subtitle">This name will appear when you send messages</div>
            <input className="popupInput" type="text" name="username"
              onClick={e => this.clearText(e)} onChange={e => this.saveNewUsername(e)}/><br />
            <button className="createButton" type="submit" onClick={e => this.changeUsername(e)}>Set Username</button>
          </form>
        </div>
      </section>
    );
  }
}

export default User;
