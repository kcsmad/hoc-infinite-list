import React, { Component } from 'react';

import { InfiniteScroll } from './infinite-scroll';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InfiniteScroll />
      </div>
    );
  }
}

export default App;
