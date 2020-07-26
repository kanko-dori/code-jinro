import React from 'react';

import "./Problem.css";

interface Props {
  url: string;
}
interface State {}

class Problem extends React.Component<Props, State> {
  render() {
    return (
      <div className="container">
        <iframe
          frameBorder="0"
          src={this.props.url}
          title="Problem"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onClick={e => e.preventDefault()}
        >
        </iframe>
      </div>
    );
  }
};
export default Problem;