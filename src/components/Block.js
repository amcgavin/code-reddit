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

const PythonBlock = ({ children }) => <div className="indent">{children}</div>

export default function BlockFactory({ language, ...props }) {
    switch (language) {
        case 'python':
            return <PythonBlock {...props} />
        default:
            return <Block {...props} />
    }
}
