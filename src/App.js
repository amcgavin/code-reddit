import React, { Component } from 'react';
import Loader from './Loader';

class App extends Component {
  render() {
    return (
      <Loader subreddit="all" />
    );
  }
}

export default App;
