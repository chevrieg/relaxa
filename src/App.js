import React, { Component } from 'react';
import logo from './yin_yang.png';
import ReactPlayer from 'react-player';
import './App.css';
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyARWBPFqoqI5mtu1fh_QSJMCRLM5564ioA",
  authDomain: "relaxa-93e3b.firebaseapp.com",
  databaseURL: "https://relaxa-93e3b.firebaseio.com",
  projectId: "relaxa-93e3b",
  storageBucket: "relaxa-93e3b.appspot.com",
  messagingSenderId: "587203721788"
};

class App extends Component {
  constructor ()
  {
    super()
    this.state = {
      url: "https://firebasestorage.googleapis.com/v0/b/relaxa-93e3b.appspot.com/o/compo9.mp3?alt=media&token=15dd4de6-a601-41ff-b8cc-82db97fc0493",
      pip: false,
      playing: true,
      volume: 0.5,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      content: null
    }
    this.ref = player => {
      this.player = player
    }
    firebase.initializeApp(config);
  }

  componentWillMount() {
    console.log("component will mount");
    const refe = firebase.database().ref('musics')
    console.log(refe);
    refe.on('value', snapshot => {
      console.log('on value...')
      console.log(snapshot.val);
      this.setState({content: snapshot.val()});
    })
  }

  volume_up() {
    this.setState({ volume: this.state.volume + 0.1 })
  }

  volume_down() {
    this.setState({ volume: this.state.volume - 0.1 })
  }

  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  render() {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to relaxa. Let's play zen music !
          </p>
          <ReactPlayer ref={this.ref} 
                        url={url} 
                        volume={volume} 
                        onDuration={this.onDuration}
                        onProgress={this.onProgress}
                        playing={playing} />
          <p>loaded: {loaded}, played: {played}, volume: {volume}</p>
          <p>playing: {playing}, duration: {duration}</p>
          <button onClick={() => this.playPause()}>Play/Pause</button>
          <button onClick={() => this.volume_up()}>+</button>
          <button onClick={() => this.volume_down()}>-</button>
          <p> database content: {this.content}</p>
        </header>
      </div>
    );
  }
}

export default App;
