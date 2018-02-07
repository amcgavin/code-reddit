import React from 'react';

const styles = {
    color: 'dodgerblue'
}

const Constant = ({value, ...props}) => <span {...props} style={styles}>{value}</span>;

 export default function ConstantFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Constant {...props}/>
     }
 }
