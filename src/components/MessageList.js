import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
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

  render() {
    return (
      <section className="messages">
        <div className='room-title'>{this.props.activeRoom.name}</div>
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
      </section>
    );
  }
}

export default MessageList;
