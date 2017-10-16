import React, { Component } from 'react';
import Stage from './Stage'
import StageControls from './StageControls'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bounce!</h1>
          <p>Simple experiment with using Redux actions as a tick for a physics engine</p>
          <p>Click and drag mouse in box to fire a ball</p>
        <Stage />
        <StageControls />
      </div>
    );
  }
}

export default App
