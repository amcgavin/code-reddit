import React from 'react';
import Jargon from './Jargon';

const Statement = ({children}) => <p><span>{children}</span><Jargon>;</Jargon></p>;

 export default function StatementFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Statement {...props}/>
     }
 }
