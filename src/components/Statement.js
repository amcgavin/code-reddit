import React from 'react';
import Jargon from './Jargon';

const Statement = ({children}) => <div><span>{children}</span><Jargon>;</Jargon></div>;

 export default function StatementFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Statement {...props}/>
     }
 }
