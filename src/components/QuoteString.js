import React from 'react';
import Jargon from './Jargon';

const styles = {
    color: 'darkseagreen'
}

const QuoteString = ({value, ...props}) => <span style={styles} {...props}><Jargon>'</Jargon><span>{value}</span><Jargon>'</Jargon></span>;

 export default function QuoteStringFactory({language, ...props}) {
     switch(language) {
         default: 
            return <QuoteString {...props}/>
     }
 }
