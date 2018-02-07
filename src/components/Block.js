import React from 'react';
import Jargon from './Jargon';

const Block = ({ children }) => <div>
    <p>
        <Jargon>{"{"}</Jargon>
    </p>
    <div className="indent">
        {children}
    </div>
    <p>
        <Jargon>{"}"}</Jargon>
    </p>
</div>;

export default function BlockFactory({ language, ...props }) {
    switch (language) {
        default:
            return <Block {...props} />
    }
}
