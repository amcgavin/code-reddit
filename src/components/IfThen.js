import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'darkorchid'
}

const IfThen = ({ children, ...props }) => <span {...props}>
    <Jargon style={styles}>if</Jargon>
    <Jargon>(</Jargon>
    {children}
    <Jargon>)</Jargon>
</span>;

const PythonIfThen = ({ children, ...props }) => <span {...props}>
    <Jargon style={styles}>if </Jargon>
    {children}
    <Jargon>:</Jargon>
</span>;

export default function IfThenFactory({ language, ...props }) {
    switch (language) {
        case 'python':
        return <PythonIfThen {...props} />
        default:
            return <IfThen {...props} />
    }
}
