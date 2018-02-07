import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'darkorchid'
}

const IfThen = (Left, Equality, Right) => ({ left, equality, right, ...props }) => <span {...props}>
        <Jargon style={styles}>if</Jargon>
        <Jargon>(</Jargon>
        <Left value={left} />
        <Equality value={equality} />
        <Right value={right} />
        <Jargon>)</Jargon>
        </span>;

export default (Left, Equality, Right) => IfThen(Left, Equality, Right);
