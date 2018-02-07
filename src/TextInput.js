import React from 'react';

export default class TextInput extends React.PureComponent {
    state = {value: 'all'};

    onTextChange = e => {
        this.setState({value: e.target.value});
    };

    onBlur = () => {
        if(this.state.value === '') return;
        this.props.onChange(this.state.value);
    };

    render() {
        return <div>
            <p className="declaration">
                <span className="variable" data-name="subreddit" />
                <span className="string">
            <input type="text" onChange={this.onTextChange} value={this.state.value} onBlur={this.onBlur}/>
            </span>
            </p>
        </div>;
    }
}