import React, { Component } from 'react';
import Loader from './Loader';
import TextInput from './TextInput';
import Class from './components/Class';
import Block from './components/Block';
import './rules.css';

class App extends Component {
  state = { subreddit: 'all' }

  setSubreddit = subreddit => this.setState({subreddit});
  render() {
    return (
      <div>
      <Class value={this.state.subreddit}>
          <TextInput onChange={this.setSubreddit}/>
          </Class>
          <Block>
          <Loader subreddit={this.state.subreddit} />
          </Block>
      </div>
    );
  }
}

export default App;
