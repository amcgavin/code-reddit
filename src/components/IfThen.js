import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'darkorchid'
}

const IfThen = (Left, Right) => ({ left, right, children, ...props }) => <div>
    <span {...props}>
        <Jargon style={styles}>if</Jargon>
        <Jargon>(</Jargon>
        <Left value={left} />
        <Jargon> === </Jargon>
        <Right value={right} />
        <Jargon>)</Jargon>
        </span>
    {children}
</div>;

export default (Left, Right) => IfThen(Left, Right);
