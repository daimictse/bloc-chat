import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room )});
    });
  }

  render() {
    return (
      <aside>
        <div id="chat-name">Bloc Chat</div>
        <section id='room-list'>
          {
            this.state.rooms.map( (room, index ) =>
              <div className="room" key={index}>{room.name}</div>
            )
          }
          </section>
      </aside>
    );
  }
}

export default RoomList;
