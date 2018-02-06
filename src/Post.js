import React from 'react';
import _ from 'lodash';

const FormattedText = ({children}) => <p>{_.unescape(children)}</p>

class Comment extends React.PureComponent {
    state = { hidden: false };

    onToggle = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    renderBody = () => {
        return <div>
            <div className="chain-link-node">
                <div className="comment">
                    <FormattedText>{this.props.body}</FormattedText>
                </div>
            </div>
            <div>
                {this.props.replies ? this.props.replies.data.children.map(c => (
                    <Comment key={c.data.id} {...c.data} />
                )) : null}
            </div>
        </div>
    };

    render() {
        return <div className="chain-link">
        <span onClick={this.onToggle} className="chain-link-control" />
            {this.state.hidden ? null : this.renderBody()}
        </div>;
    }
}

export default class Post extends React.PureComponent {
    state = {
        comments: [],
        loading: false,
        commentsLoaded: false,
        collapsedComments: true,
        collapsedSelf: false
    };

    getShortTitle() {
        return _.camelCase(this.props.title);
    }

    onTitleClicked = () => {
        this.setState({ collapsedSelf: !this.state.collapsedSelf });
    };

    commentsLoaded = result => {
        this.setState({ comments: result[1].data.children, commentsLoaded: true, collapsedComments: false });
    }

    loadComments = () => {
        if (this.state.loading) return;
        if (this.state.commentsLoaded) {
            this.setState({ collapsedComments: !this.state.collapsedComments });
            return;
        };
        this.setState({ loading: true }, () => {
            fetch(`https://www.reddit.com/comments/${this.props.id}.json`)
                .then(res => res.json())
                .then(this.commentsLoaded)
                .catch(() => { }).then(() => {
                    this.setState({ loading: false });
                });
        });
    }

    renderComments = () => this.state.comments.map(comment => (
        <Comment key={comment.data.id} {...comment.data} />
    ));

    getDataState = () => {
        if (this.state.loading) return 'loadingComments';
        if (!this.state.commentsLoaded) return 'getComments';
        if (this.state.collapsedComments) return 'showComments';
        return 'hideComments';
    }

    renderMainBlock = () => (
        <div>
            <p className="declaration">
                <span className="variable" data-name="fullTitle" />
                <span className="string">{this.props.title}</span>
            </p>
            <div className="comment">
                <FormattedText>{this.props.selftext}</FormattedText>
            </div>
            <div className="chain">
                <span onClick={this.loadComments} className="chain-link-start" data-state={this.getDataState()}></span>
                {this.state.collapsedComments ? null : this.renderComments()}
            </div>
        </div>
    );

    render() {
        return <div className="post">
            <a onClick={this.onTitleClicked} className="function">{this.getShortTitle()}</a>
            <div className="block">
                {this.state.collapsedSelf ? <p>...</p> : this.renderMainBlock()}
            </div>
        </div>
    }
}
