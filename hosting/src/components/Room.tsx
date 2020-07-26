import React from "react";

import {
} from "@material-ui/core";
import NameInput from "./NameInput";
import Editor from "./Editor";
import Problem from "./Problem";
import Users from "./Users";

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
        <section className="name_input">
          <NameInput onNameInput={this.onNameInput.bind(this)}></NameInput>
        </section>
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

  onNameInput(name: string) {
    this.setState({ name });
  }
};
export default Room;