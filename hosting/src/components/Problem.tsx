import React from 'react';

interface Props {
  url: string;
}
interface State {}

class Problem extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <iframe frameBorder="0" src={this.props.url} title="Problem"></iframe>
      </div>
    );
  }
};
export default Problem;