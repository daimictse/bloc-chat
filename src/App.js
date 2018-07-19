import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_htlE3xV6cBfuGMjLEAqIohAj6-OTahU",
    authDomain: "bloc-chat-cc4a0.firebaseapp.com",
    databaseURL: "https://bloc-chat-cc4a0.firebaseio.com",
    projectId: "bloc-chat-cc4a0",
    storageBucket: "bloc-chat-cc4a0.appspot.com",
    messagingSenderId: "464109563188"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
          <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
