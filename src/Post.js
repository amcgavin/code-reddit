import React from 'react';
import _ from 'lodash';
import './javascript.css';

const createComment = comment => <p></p>;

export default class Post extends React.PureComponent {
    state = { comments: [] };

    getShortTitle() {
        return _.camelCase(this.props.title);
    }

    render() {
        return <div className="post-block">
            <p className="short-title">{this.getShortTitle()}</p>
            <div className="post-content">
            <span className="code-declaration"></span>
                <span className="title">{this.props.title}</span>
                <div className="code-comment">
                <p className="selftext">{this.props.selftext}</p>
                </div>
                <div className="comments">
                    {this.state.comments.map(createComment)}
                </div>
            </div>
        </div>
    }
}
