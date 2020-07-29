import React from 'react';

import classes from './Problem.module.css';

interface Props {
  url: string;
}

const Problem: React.FC<Props> = ({ url }: Props) => (
  <div className={classes.container}>
    <iframe
      frameBorder="0"
      src={url}
      title="Problem"
      sandbox="allow-scripts allow-same-origin"
      referrerPolicy="no-referrer"
    />
  </div>
);
export default Problem;
