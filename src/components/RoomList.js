import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      creatingNewRoom: false
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    const newRoomName = undefined;
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room )});
    });
  }

  getBlocChatClass() {
    let className = "bloc-chat";
    if (this.state.creatingNewRoom)
      className += " bloc-chat-inactive";
    return className;
  }

  getChatNameClass() {
    let className = "chat-name";
    if (this.state.creatingNewRoom)
      className += " chat-room-inactive";
    return className;
  }

  getRoomListClass() {
    let className = "room-list";
    if (this.state.creatingNewRoom)
      className += " chat-room-inactive";
    return className;
  }

  getNewChatPopupClass() {
    let className = "new-chat-popup";
    if (this.state.creatingNewRoom)
      className += " new-chat-popup-active";
    return className;
  }

  launchNewChatPopup() {
    this.setState({ creatingNewRoom: true });
  }

  dismissNewChatPopup() {
    this.setState({ creatingNewRoom: false });
  }

  saveRoomName(e) {
    this.newRoomName = e.target.value;
  }

  createRoom() {
    if (this.newRoomName && this.newRoomName.length)
      this.roomsRef.push({name: this.newRoomName});
    this.setState({ creatingNewRoom: false });
  }

  render() {
    return (
      <aside className={this.getBlocChatClass()}>
        <div className={this.getChatNameClass()}>Bloc Chat
          <span className="ion-md-add-circle custom-icon" onClick={() => this.launchNewChatPopup()}></span>
        </div>
        <section className={this.getRoomListClass()}>
          {
            this.state.rooms.map( (room, index ) =>
              <div className="room" key={index}>{room.name}</div>
            )
          }
        </section>
        <section className={this.getNewChatPopupClass()}>
          <div className="popup-title">Create New Room</div>
          <form>
            <div className="popup-subtitle">Enter a Room Name</div>
            <input className="roomNameInput" type="text" name="roomName" onChange={e => this.saveRoomName(e)}/><br />
            <input className="createButton" type="submit" value="Create Room" onClick={() => this.createRoom()}/>
            <input className="cancelButton" type="submit" value="Cancel" onClick={() => this.dismissNewChatPopup()}/>
          </form>
        </section>
      </aside>
    );
  }
}

export default RoomList;
