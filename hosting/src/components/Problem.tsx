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
        <iframe frameBorder="0" src={this.props.url} title="Problem"></iframe>
      </div>
    );
  }
};
export default Problem;