import React from 'react';
import Jargon from './Jargon';

const styles = {
    variable: {
    color: 'dodgerblue'
    },
    self: {
        color: 'lightcoral'
    }
}

const FunctionCall = ({value, ...props}) => <span {...props}><Jargon style={styles.variable}>{value}</Jargon><Jargon>()</Jargon></span>;

const PythonFunctionCall = ({value, ...props}) => <span {...props}>
<Jargon style={styles.self}>self</Jargon><Jargon>.</Jargon>
<Jargon style={styles.variable}>{value}</Jargon><Jargon>()</Jargon>
</span>;


 export default function FunctionCallFactory({language, ...props}) {
     switch(language) {
         case 'python':
         return <PythonFunctionCall {...props} />
         default: 
            return <FunctionCall {...props}/>
     }
 }
