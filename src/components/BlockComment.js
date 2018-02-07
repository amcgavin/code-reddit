import React from 'react';
import Jargon from './Jargon';

const styles = {color: 'grey'};

const BlockComment = ({children}) => <div style={styles}>
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

export default function BlockCommentFactory({language, ...props}) {
    switch(language) {
        default:
            return <BlockComment {...props}/>
    }
}
