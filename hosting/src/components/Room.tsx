import React from "react";

import {
} from "@material-ui/core";
import NameInput from "./NameInput";
import Editor from "./Editor";
import Problem from "./Problem";
import Users from "./Users";

import classes from "./Room.module.css";

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
      <div className={classes.container}>
        <section className={classes.name_input}>
          <NameInput onNameInput={this.onNameInput.bind(this)}></NameInput>
        </section>
        <section className={classes.editor}>
          <Editor autocomplete={true}></Editor>
        </section>
        <section className={classes.problem}>
          <Problem url={"https://atcoder.jp/contests/abc047/tasks/abc047_a"}></Problem>
        </section>
        <section className={classes.users}>
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