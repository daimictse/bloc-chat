import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      theMessage: 'Write your message here'
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message )});
    });
  }

  formatTime(unixTime)
  {
    var dt = new Date(unixTime*1000);
    var hr = dt.getHours();
    var apm = hr < 12 ? "am" : "pm";
    hr = hr % 12;
    hr = hr === 0 ? 12 : hr;
    var m = "0" + dt.getMinutes();
    return hr + ':' + m.substr(-2) + " " + apm;
  }

  getDeleteTrashClass() {
    if (this.props.activeRoom)
     return "ion-md-trash custom-icon";
  }

  clearText(e) {
    this.setState({ theMessage: '' });
  }

  saveTheMessage (e) {
    this.setState({ theMessage: e.target.value });
  }

  createMessage(e) {
    e.preventDefault();
    if (this.props.activeRoom) {
      this.messagesRef.push({
        username: this.props.activeUser,
        content: this.state.theMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key
      });
    }
    this.setState({ theMessage: "Write your message here" });
  }

  render() {
    return (
      <section className="messages">
        <div className='room-header'>
          <span className='room-title' onClick={() => this.props.changeRoomName(this.props.activeRoom)}>{this.props.activeRoom.name}</span>
          <span className={this.getDeleteTrashClass()} onClick={() => this.props.deleteRoom(this.props.activeRoom)}></span>
        </div>
        <div className="conversation">
        {
          this.state.messages.filter( (message, index ) =>
            message.roomId === this.props.activeRoom.key
          ).map( (message, index ) =>
            <div className="message" key={index}>
              <div className="message-user">{message.username}
                <span className="message-sentAt">{this.formatTime(message.sentAt)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          )
        }
        </div>
        <form>
          <div className="nextMessage">
            <input className="theMessage" type="text" name="msg" value={this.state.theMessage}
              onClick={e => this.clearText(e)} onChange={e => this.saveTheMessage(e)}/>
            <button className="sendButton" type="submit" onClick={e => this.createMessage(e)}>Send</button>
          </div>
        </form>
      </section>
    );
  }
}

export default MessageList;
