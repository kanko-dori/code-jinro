import React from "react";

import {
} from "@material-ui/core";
import NameInput from "./NameInput";
import Editor from "./Editor";
import Problem from "./Problem";
import Users from "./Users";

import { firestore } from '../utils/firebase';
import { Room, RoundState } from '../types/types'

import classes from "./Room.module.css";

interface Props {
  match: {
    isExact: boolean;
    params: { [key: string]: string; }
    path: string;
    url: string;
  };
}
interface State {
  room?: Room
  id: string
}

class RoomComponent extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      id: props.match.params.id,
    }
  }

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
    const docRef = firestore.collection("room").doc(this.state.id)
    docRef.get().then(doc => {
      if(doc.exists){
        const stateData = doc.data() as Room
        stateData.users.push({userName: name, point: 0})
        docRef.set(stateData)
        .then(() => console.log("Document successfully written", stateData))
        .catch(err => console.error("Writing docuemnt failed.: ", err))
        this.setState({
          room: doc.data() as Room,
          id: this.state.id
        })
      }else{
        const initalData :Room = {
          currentRound: {
            problemURL: "",
            code:  "",
          },
          users: [{
            userName: name,
            point: 0
          }],
          currentState: RoundState.問題提示,
          history: []
        }
        console.log(initalData)
        docRef.set(initalData)
        .then(() => console.log("Document successfully written", initalData))
        .catch(err => console.error("Writing docuemnt failed.: ", err))
        this.setState({
          room: initalData,
          id: this.state.id
        })
      }

    })
  }
};
export default RoomComponent;