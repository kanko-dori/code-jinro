import React from 'react';

interface Props {
  match: {
    isExact: boolean;
    params: { [key: string]: string; }
    path: string;
    url: string;
  };
}
interface State {}

class Room extends React.Component<Props, State> {
  render() {
    return (
      <div>
        Room {this.props.match.params.id}
      </div>
    );
  }
};
export default Room;