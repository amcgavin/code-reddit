import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'orange'
}

const Variable = ({value, ...props}) => <span {...props}><Jargon style={styles}>{value}</Jargon></span>;

 export default function VariableFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Variable {...props}/>
     }
 }
