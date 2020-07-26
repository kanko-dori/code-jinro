import React from 'react';
import Editor from './Editor';
import Problem from './Problem';
import Users from './Users';

import "./Room.css";

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
      <div className="container">
        <section className="editor">
          <Editor autocomplete={true}></Editor>
        </section>
        <section className="problem">
          <Problem url={"https://atcoder.jp/contests/abc047/tasks/abc047_a"}></Problem>
        </section>
        <section className="users">
          <Users></Users>
        </section>
      </div>
    );
  }
};
export default Room;