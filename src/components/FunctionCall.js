import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'dodgerblue'
}

const FunctionCall = ({value, ...props}) => <span {...props}><Jargon style={styles}>{value}</Jargon><Jargon>()</Jargon></span>;

 export default function FunctionCallFactory({language, ...props}) {
     switch(language) {
         default: 
            return <FunctionCall {...props}/>
     }
 }
