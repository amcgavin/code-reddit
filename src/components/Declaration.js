import React from 'react';
import Jargon from './Jargon';
import Variable from './Variable';

const styles = {
    color: 'red'
}

const Declaration = ({language, value, children, ...props}) => <span {...props}>
<Jargon style={styles}>const </Jargon>
<Variable language={language} value={value} />
<Jargon> = </Jargon><span>{children}</span></span>;

 export default function DeclarationFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Declaration language={language} {...props}/>
     }
 }
