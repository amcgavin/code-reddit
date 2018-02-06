import React, { Component } from 'react';
import Loader from './Loader';
import TextInput from './TextInput';
import './javascript.css';
import './theme.css';

class App extends Component {
  state = { subreddit: '' }

  setSubreddit = subreddit => this.setState({subreddit});
  render() {
    return (
      <div className="outer" data-name={this.state.subreddit}>
        <div className="block">
          <TextInput onChange={this.setSubreddit}/>
          <Loader subreddit={this.state.subreddit} />
        </div>
      </div>
    );
  }
}

export default App;
