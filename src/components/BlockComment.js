import React from 'react';
import Jargon from './Jargon';

const styles = { color: 'grey' };

const BlockComment = ({ children }) => <div style={styles}>
    <p>
        <Jargon>{"/*"}</Jargon>
    </p>
    <div>
        {children}
    </div>
    <p>
        <Jargon>{"*/"}</Jargon>
    </p>
</div>;

const PythonBlockComment = ({ children }) => <div style={styles}>
    <p>"""</p>
    <div>{children}</div>
    <p>"""</p>
</div>;

export default function BlockCommentFactory({ language, ...props }) {
    switch (language) {
        case 'python':
        return <PythonBlockComment {...props} />
        default:
            return <BlockComment {...props} />
    }
}
