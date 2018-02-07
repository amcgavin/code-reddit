import React from 'react';
import Jargon from './Jargon';

const styles = {
    keyword: {
        color: 'red'
    },
    variable: {
        color: 'orange'
    },
    self: {
        color: 'lightcoral'
    }
}

const Function = ({ value, ...props }) => <span {...props}>
    <Jargon style={styles.variable}>{value}</Jargon>
    <Jargon>()</Jargon>
</span>;

const PythonFunction = ({ value, ...props }) => <span {...props}>
    <Jargon style={styles.keyword}>def </Jargon>
    <Jargon style={styles.variable}>{value}</Jargon>
    <Jargon>(</Jargon><Jargon style={styles.self}>self</Jargon><Jargon>):</Jargon>
</span>;


export default function FunctionFactory({ language, ...props }) {
    switch (language) {
        case 'python':
            return <PythonFunction {...props} />
        default:
            return <Function {...props} />
    }
}
