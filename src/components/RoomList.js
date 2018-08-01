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

  dismissNewChatPopup(e) {
    e.preventDefault();
    this.setState({ creatingNewRoom: false });
  }

  saveRoomName(e) {
    this.newRoomName = e.target.value;
  }

  createRoom(e) {
    e.preventDefault();
    if (this.newRoomName && this.newRoomName.length)
      this.roomsRef.push({name: this.newRoomName});
    this.setState({ creatingNewRoom: false });
  }

  deleteRoom(roomId) {
    let del = window.confirm("Are you sure you want to delete this chat room?");
    if (del === true) {
      this.roomsRef.child(roomId).remove();
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== this.props.activeRoom.key) });
      this.props.onRoomChange('');
    }
  }

  changeRoomName(roomId) {
    let newRoomName = window.prompt("Rename this room to?");
    if (newRoomName) {
      // update database
      this.roomsRef.child(roomId).update({ name: newRoomName });

      // update name on left
      let roomIndex = this.state.rooms.findIndex( obj => obj.key === roomId );
      let rooms = this.state.rooms;
      rooms[roomIndex].name = newRoomName;
      this.setState({ rooms: rooms });

      // update name on messagse header
      this.props.onRoomChange(rooms[roomIndex]);
    }
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
              <div className="room" key={index} onClick={()=>this.props.onRoomChange(room)}>{room.name}</div>
            )
          }
        </section>
        <section className={this.getNewChatPopupClass()}>
          <div className="popup-title">Create New Room</div>
          <form>
            <div className="popup-subtitle">Enter a Room Name</div>
            <input className="popupInput" type="text" name="roomName" onChange={e => this.saveRoomName(e)}/><br />
            <input className="createButton" type="submit" value="Create Room" onClick={e => this.createRoom(e)}/>
            <input className="cancelButton" type="submit" value="Cancel" onClick={(e) => this.dismissNewChatPopup(e)}/>
          </form>
        </section>
      </aside>
    );
  }
}

export default RoomList;
