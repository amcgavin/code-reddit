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
import Constant from './components/Constant';

const Empty = () => null;
const FormattedText = ({ children }) => <div className="formatted">{_.unescape(children)}</div>

const IfThenFunctionString = IfThen(FunctionCall, Empty, Empty);

const renderComments = (comments) => comments.map(comment => (<Comment key={comment.data.id} {...comment.data} />));

const Clickable = ({children}) => <span className="clickable">{children}</span>;

class Comment extends React.PureComponent {
    state = { hidden: false };

    onToggle = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    renderBody = () => {
        return <div>
            <Statement>
                <Declaration value="author"><QuoteString value={this.props.author} /></Declaration>
            </Statement>
            <Statement>
                <Declaration value="score"><Constant value={this.props.score} /></Declaration>
            </Statement>
            <BlockComment>
                <FormattedText>{this.props.body}</FormattedText>
            </BlockComment>
            <div>
                {this.props.replies ? renderComments(this.props.replies.data.children) : null}
            </div>
        </div>

    };

    render() {
        return <div className="chain-link">
            <Clickable><IfThenFunctionString onClick={this.onToggle} left={`!${this.state.hidden ? 'showNextComment' : 'hideNextComment'}`} /></Clickable>
            <Block>
                {this.state.hidden ? null : this.renderBody()}
            </Block>
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
                <Declaration value="subreddit"><QuoteString value={this.props.subreddit} /></Declaration>
            </Statement>
            <Statement>
                <Declaration value="fullTitle">
                    <QuoteString value={this.props.title} />
                </Declaration>
            </Statement>
            <Statement>
                <Declaration value="score"><Constant value={this.props.score} /></Declaration>
            </Statement>
            <Statement>
                <Declaration value="url"><QuoteString value={this.props.url} /></Declaration>
            </Statement>
            <Statement>
                <Declaration value="author"><QuoteString value={this.props.author} /></Declaration>
            </Statement>
            <p></p>
            {this.props.selftext ?
                <BlockComment>
                    <FormattedText>{this.props.selftext}</FormattedText>
                </BlockComment>
                : null}
            <Statement><Clickable><FunctionCall onClick={this.loadComments} value={this.getDataState()} /></Clickable></Statement>
            <p></p>
            {this.state.collapsedComments ? null : renderComments(this.state.comments)}

        </div>
    );

    render() {
        return <div>
            <Clickable><Function onClick={this.onTitleClicked} value={this.getShortTitle()} /></Clickable>
            <Block>
                {this.state.collapsedSelf ? <p>...</p> : this.renderMainBlock()}
            </Block>
        </div>
    }
}
