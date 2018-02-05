import React from 'react';
import Post from './Post';

export default class Loader extends React.PureComponent {

    state = {posts: [], loading: false};

    componentDidMount() {
        this.setState({loading: true});
        fetch(`https://www.reddit.com/r/${this.props.subreddit}.json`).then(res => res.json())
        .then(json => {
            const posts = json.data.children.map(child => child.data);
            this.setState({posts});
        })
    }


    render() {
            return this.state.posts.map(post => (
                <Post key={post.id} {...post} />
            ))
    }
}