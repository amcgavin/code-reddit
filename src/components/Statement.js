import React from 'react';
import Jargon from './Jargon';

const Statement = ({children}) => <div>{children}<Jargon>;</Jargon></div>;

const PythonStatement = ({children}) => <div>{children}</div>;


 export default function StatementFactory({language, ...props}) {
     switch(language) {
         case 'python':
            return <PythonStatement {...props} />
         default: 
            return <Statement {...props}/>
     }
 }
