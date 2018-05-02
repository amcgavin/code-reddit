import React from 'react';
import _ from 'lodash';
import UnwrappedBlock from './components/Block';
import UnwrappedDeclaration from './components/Declaration';
import UnwrappedBlockComment from './components/BlockComment';
import UnwrappedQuoteString from './components/QuoteString';
import UnwrappedStatement from './components/Statement';
import UnwrappedFunction from './components/Function';
import UnwrappedFunctionCall from './components/FunctionCall';
import UnwrappedIfThen from './components/IfThen';
import UnwrappedConstant from './components/Constant';

const LanguageHOC = language => Component => props => <Component language={language} {...props} />;

// todo: use redux for global state here
const Langify = LanguageHOC('python');
const Block = Langify(UnwrappedBlock);
const BlockComment = Langify(UnwrappedBlockComment);
const Constant = Langify(UnwrappedConstant);
const Declaration = Langify(UnwrappedDeclaration);
const Function = Langify(UnwrappedFunction);
const FunctionCall = Langify(UnwrappedFunctionCall);
const IfThen = Langify(UnwrappedIfThen);
const QuoteString = Langify(UnwrappedQuoteString);
const Statement = Langify(UnwrappedStatement);


const FormattedText = ({ children }) => <div className="formatted">{_.unescape(children)}</div>

const renderComments = (comments) => comments.map(comment => (<Comment key={comment.data.id} {...comment.data} />));

const Clickable = ({ children }) => <span className="clickable">{children}</span>;

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
            <Clickable>
                <IfThen onClick={this.onToggle}>
                    <FunctionCall value={this.state.hidden ? 'showNextComment' : 'hideNextComment'} />
                </IfThen>
            </Clickable>
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
