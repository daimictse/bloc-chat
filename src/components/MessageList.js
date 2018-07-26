import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      if (room.messages) {
          //console.log("ML msg:", room.messages.m1);
        this.setState({messages: this.state.messages.concat( room.messages )});
      }
      console.log("ML", this.state.messages);
    });
    /*
    this.roomsRef.orderByChild("name").equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
      const room = snapshot.val();
      if (room.messages)
        this.setState({messages: this.state.messages.concat( room.messages )});
      console.log("ML", this.state.messages);
    });*/
  }

  render() {
    return (
      <section className="messages">
        <div className='room-title'>{this.props.activeRoom.name}</div>
        <div className="conversation">
          { /* filter message here? */
          }
          </div>
      </section>
    );
  }
}

export default MessageList;
