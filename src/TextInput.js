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

    getStyle = () => {
        return {width: `${this.state.value.length + 1}ch`}
    }

    render() {
        return <input style={this.getStyle()} type="text" onChange={this.onTextChange} value={this.state.value} onBlur={this.onBlur}/>;

    }
}