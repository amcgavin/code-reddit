import React, { Component } from 'react';
import Loader from './Loader';
import './javascript.css';
import './theme.css';
class App extends Component {
  render() {
    return (
      <Loader subreddit="all" />
    );
  }
}

export default App;
