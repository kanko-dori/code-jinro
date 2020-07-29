import React from 'react';

import {
} from '@material-ui/core';
import NameInput from '../components/NameInput';
import Editor from '../components/Editor';
import Problem from '../components/Problem';
import Users from '../components/Users';

import { realtimeDB, auth } from '../utils/firebase';
import { Room, RoundState } from '../types/types';
import { languages } from '../utils/constants';

import classes from './Room.module.css';

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
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };

    this.onCodeChange = this.onCodeChange.bind(this);
    this.onNameInput = this.onNameInput.bind(this);

    const docRef = realtimeDB.ref(`room/${this.state.id}`);
    docRef.on('value', (doc) => {
      const data = doc.val() as Room;
      console.log('value: ', data);
      this.setState({ room: data });
    });
  }

  onCodeChange(code: string):void {
    console.log(code);
    if (this.state.room) {
      const newRoomState = this.state.room;
      newRoomState.currentRound.code = code;
      this.setState({ room: newRoomState });
      realtimeDB.ref(`room/${this.state.id}/currentRound`).update({ code });
    }
  }

  async onNameInput(name: string):Promise<void> {
    await this.login().catch(() => {
      alert('ログインできませんでした。もう一度試してください。');
    });

    const docRef = realtimeDB.ref(`room/${this.state.id}`);
    console.log(docRef);
    docRef.once('value').then((doc) => {
      console.log(doc);
      if (doc.exists()) {
        const stateData = doc.val() as Room;
        const index = stateData.users.findIndex((u) => u.userID === this.state.user?.uid);
        console.log(index);

        if (index === -1) {
          console.log('new user: ', name);
          stateData.users.push({ userName: name, point: 0, userID: this.state.user ? this.state.user.uid : '' });
          docRef.set(stateData)
            .then(() => console.log('Document successfully written', stateData))
            .catch((err) => console.error('Writing docuemnt failed.: ', err));
        } else if (stateData.users[index].userName === name) {
          console.log('duplicate uid. skipping update firestore');
        } else {
          console.log('update to use new name');
          stateData.users[index].userName = name;
          docRef.set(stateData)
            .then(() => console.log('Document successfully written', stateData))
            .catch((err) => console.error('Writing docuemnt failed.: ', err));
        }

        this.setState({
          room: doc.val() as Room,
        });
      } else {
        const initalData :Room = {
          currentRound: {
            language: languages[0],
            problemURL: '',
            code: '',
          },
          users: [{
            userName: name,
            point: 0,
            userID: this.state.user ? this.state.user.uid : '',
          }],
          currentState: RoundState.問題提示,
          history: [],
        };
        console.log(initalData);
        docRef.set(initalData)
          .then(() => console.log('Document successfully written', initalData))
          .catch((err) => console.error('Writing docuemnt failed.: ', err));
        this.setState({
          room: initalData,
        });
      }
    });
  }

  login():Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      auth.signInAnonymously().catch((err) => console.error('Signin Anonymously failed: ', err));
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          this.setState({ user });
          resolve(user);
        } else {
          reject(new Error('unexpected error'));
        }
      });
    });
  }

  render():JSX.Element {
    return (
      <div className={classes.container}>
        <section className={classes.name_input}>
          <NameInput onNameInput={this.onNameInput} />
        </section>
        <section className={classes.editor}>
          <Editor autocomplete onCodeChange={this.onCodeChange} code={this.state.room ? this.state.room.currentRound.code : ''} />
        </section>
        <section className={classes.problem}>
          <Problem url="https://atcoder.jp/contests/abc047/tasks/abc047_a" />
        </section>
        <section className={classes.users}>
          <Users />
        </section>
      </div>
    );
  }
}
export default RoomComponent;
