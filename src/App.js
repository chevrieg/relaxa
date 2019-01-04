import React, { Component } from 'react';
import logo from './yin_yang.png';
import ReactPlayer from 'react-player';
import './App.css';

class App extends Component {
  state = {
    url: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    pip: false,
    playing: true,
    volume: 0.5,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  ref = player => {
    this.player = player
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
            Welcome to relaxa. It change over the time !
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
        </header>
      </div>
    );
  }
}

export default App;
