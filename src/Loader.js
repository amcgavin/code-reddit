import React from 'react';
import Post from './Post';

export default class Loader extends React.PureComponent {

    state = {posts: [], loading: false};

    componentWillReceiveProps(nextProps) {
        this.setState({loading: true});
        fetch(`https://www.reddit.com/r/${nextProps.subreddit}.json`).then(res => res.json())
        .then(json => {
            const posts = json.data.children.map(child => child.data);
            this.setState({posts});
        })
        .catch(() => {})
        .then(() => this.setState({loading: false}))
    }


    render() {
            return <div>
            {this.state.posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
            </div>
    }
}