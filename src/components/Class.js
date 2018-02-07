import React from 'react';
import Jargon from './Jargon';
const styles = {
    keyword: {
        color: 'red'
    },
    variable: {
        color: 'dodgerblue'
    }
}

const Class = ({value, children, ...props}) => <span>
    <Jargon style={styles.keyword}>class </Jargon>{children}<Jargon style={styles.keyword}> extends </Jargon><Jargon style={styles.variable}>Subreddit</Jargon>
</span>;

 export default function ClassFactory({language, ...props}) {
     switch(language) {
         default: 
            return <Class {...props}/>
     }
 }
