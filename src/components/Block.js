import React from 'react';
import Jargon from './Jargon';

const Block = ({ children }) => [<Jargon key={0}>{"  {"}</Jargon>, <div key={1}>
    <div className="indent">
        {children}
    </div>
    <div>
        <Jargon>{"}"}</Jargon>
    </div>
    <p></p>
</div>];

export default function BlockFactory({ language, ...props }) {
    switch (language) {
        default:
            return <Block {...props} />
    }
}
