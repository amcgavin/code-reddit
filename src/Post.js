import React from 'react';
import _ from 'lodash';
import Block from './components/Block';
import Declaration from './components/Declaration';
import BlockComment from './components/BlockComment';
import QuoteString from './components/QuoteString';
import Statement from './components/Statement';
import Function from './components/Function';
import FunctionCall from './components/FunctionCall';
import IfThen from './components/IfThen';

const FormattedText = ({ children }) => <p className="formatted">{_.unescape(children)}</p>

const IfThenFunctionString = IfThen(FunctionCall, QuoteString);

const renderComments = (comments) => comments.map(comment => (<Comment key={comment.data.id} {...comment.data} />));


class Comment extends React.PureComponent {
    state = { hidden: false };

    onToggle = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    renderBody = () => {
        return <IfThenFunctionString left="getNextAuthor" right={this.props.author}>
            <Block>
                <BlockComment>
                    <FormattedText>{this.props.body}</FormattedText>
                </BlockComment>
                <div>
                    {this.props.replies ? renderComments(this.props.replies.data.children) : null}
                </div>
            </Block>
        </IfThenFunctionString>
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



    getDataState = () => {
        if (this.state.loading) return 'loadingComments';
        if (!this.state.commentsLoaded) return 'getComments';
        if (this.state.collapsedComments) return 'showComments';
        return 'hideComments';
    }

    renderMainBlock = () => (
        <div>
            <Statement>
                <Declaration value="fullTitle">
                    <QuoteString value={this.props.title} />
                </Declaration>
            </Statement>
            <BlockComment>
                <FormattedText>{this.props.selftext}</FormattedText>
            </BlockComment>

            <Statement><FunctionCall onClick={this.loadComments} value={this.getDataState()} /></Statement>
            {this.state.collapsedComments ? null : renderComments(this.state.comments)}

        </div>
    );

    render() {
        return <div>
            <Function onClick={this.onTitleClicked} value={this.getShortTitle()} />
            <Block>
                {this.state.collapsedSelf ? <p>...</p> : this.renderMainBlock()}
            </Block>
        </div>
    }
}
