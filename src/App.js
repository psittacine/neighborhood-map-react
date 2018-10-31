import React, { Component } from 'react';
import './App.css';
import { slide as Menu } from 'react-burger-menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu>
          <p>Sample Item 1</p>
          <p>Sample Item 2</p>
          <p>Sample Item 3</p>
        </Menu>
      </div>
    );
  }
}

export default App;
