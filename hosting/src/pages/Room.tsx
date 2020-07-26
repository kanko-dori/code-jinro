import React from "react";

import {
} from "@material-ui/core";
import NameInput from "../components/NameInput";
import Editor from "../components/Editor";
import Problem from "../components/Problem";
import Users from "../components/Users";

import { firestore, auth } from '../utils/firebase';
import { Room, RoundState } from '../types/types';

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
  user?: firebase.User|null
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

  async onNameInput(name: string) {
    await this.login()
    const docRef = firestore.collection("room").doc(this.state.id)
    docRef.get().then(doc => {
      if(doc.exists){
        const stateData = doc.data() as Room
        stateData.users.push({userName: name, point: 0, userID: this.state.user? this.state.user.uid: ""})
        docRef.set(stateData)
        .then(() => console.log("Document successfully written", stateData))
        .catch(err => console.error("Writing docuemnt failed.: ", err))
        this.setState({
          room: doc.data() as Room,
        })
      }else{
        const initalData :Room = {
          currentRound: {
            problemURL: "",
            code:  "",
          },
          users: [{
            userName: name,
            point: 0,
            userID: this.state.user? this.state.user.uid: ""
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
        })
      }

    })
  }

  login(){
    return new Promise((resolve, reject) => {
      auth.signInAnonymously().catch(err => console.error("Signin Anonymously failed: " , err))
      auth.onAuthStateChanged(user => {
        if(user){
          console.log(user)
          this.setState({user:user})
        }
        resolve(user)
      })
    })
    
  }
};
export default RoomComponent;