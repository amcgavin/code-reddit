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

const Class = ({ value, children, ...props }) => <span>
    <Jargon style={styles.keyword}>class </Jargon>{children}<Jargon style={styles.keyword}> extends </Jargon><Jargon style={styles.variable}>Subreddit</Jargon>
</span>;

const PythonClass = ({ value, children, ...props }) => <span>
    <Jargon style={styles.keyword}>class </Jargon>{children}<Jargon>(</Jargon><Jargon style={styles.variable}>Subreddit</Jargon><Jargon>):</Jargon>
</span>;


export default function ClassFactory({ language, ...props }) {
    switch (language) {
        case 'python':
            return <PythonClass {...props} />
        default:
            return <Class {...props} />
    }
}
