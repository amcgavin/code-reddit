import React from 'react';
import Jargon from './Jargon';
import Variable from './Variable';

const styles = {
    color: 'red'
}

const Declaration = ({ language, value, children, ...props }) => <span {...props}>
    <Jargon style={styles}>const </Jargon>
    <Variable language={language} value={value} />
    <Jargon> = </Jargon><span>{children}</span></span>;

const PythonDeclaration = ({ language, value, children, ...props }) => <span {...props}>
    <Variable language={language} value={value} />
    <Jargon> = </Jargon><span>{children}</span></span>;

export default function DeclarationFactory({ language, ...props }) {
    switch (language) {
        case 'python':
            return <PythonDeclaration language={language} {...props} />
        default:
            return <Declaration language={language} {...props} />
    }
}
