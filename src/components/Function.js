import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'orange'
}

const Function = ({value, ...props}) => <span {...props}><Jargon style={styles}>function </Jargon><Jargon>{value}</Jargon><Jargon>()</Jargon></span>;

 export default function FunctionFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Function {...props}/>
     }
 }
