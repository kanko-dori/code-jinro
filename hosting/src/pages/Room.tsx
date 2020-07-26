import React from "react";

import {
} from "@material-ui/core";
import NameInput from "../components/NameInput";
import Editor from "../components/Editor";
import Problem from "../components/Problem";
import Users from "../components/Users";

import { firestore, auth } from '../utils/firebase';
import { Room, RoundState } from '../types/types';
import { languages } from "../utils/constants";

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
  user?: firebase.User
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
          <Editor autocomplete={true} onCodeChange={this.onCodeChange.bind(this)} code={this.state.room? this.state.room.currentRound.code: ""}></Editor>
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

  onCodeChange(code: string) {
    console.log(code)
    const docRef = firestore.collection("room").doc(this.state.id)

    if(this.state.room){
      let newRoomState = this.state.room
      newRoomState.currentRound.code = code
      this.setState({room: newRoomState})
      docRef.set(this.state.room)
    }
  }

  async onNameInput(name: string) {
    await this.login().catch(err => {
      alert("ログインできませんでした。もう一度試してください。");
      return
    })

    const docRef = firestore.collection("room").doc(this.state.id)
    docRef.get().then(doc => {
      if(doc.exists){
        let stateData = doc.data() as Room
        const index = stateData.users.findIndex(u => u.userID === this.state.user?.uid)
        console.log(index)

        if(index === -1){
          console.log("new user: ", name)
          stateData.users.push({userName: name, point: 0, userID: this.state.user? this.state.user.uid: ""})
          docRef.set(stateData)
            .then(() => console.log("Document successfully written", stateData))
            .catch(err => console.error("Writing docuemnt failed.: ", err))

        } else {
          if(stateData.users[index].userName === name){
            console.log("duplicate uid. skipping update firestore")
          }else{
            console.log("update to use new name")
            stateData.users[index].userName = name
            docRef.set(stateData)
            .then(() => console.log("Document successfully written", stateData))
            .catch(err => console.error("Writing docuemnt failed.: ", err))
          }
        }

        this.setState({
          room: doc.data() as Room,
        })
      }else{
        const initalData :Room = {
          currentRound: {
            language: languages[0],
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
          this.setState({user})
          resolve(user)
        }else{
          reject(null)
        }
      })
    })
    
  }
};
export default RoomComponent;