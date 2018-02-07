import React from 'react';

export default ({children, ...props}) => <span {...props} className="text" data-text={children}/>;
