import React from 'react';

import { Snackbar } from '@material-ui/core';
import NameInput from '../components/NameInput';
import Editor from '../components/Editor';
import Problem from '../components/Problem';
import Users from '../components/Users';
import Stats from '../components/Stats';
import Notification from '../components/Notification';

import { realtimeDB, auth } from '../utils/firebase';
import { Room, RoundState, Language } from '../types/types';
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
  loginAlert: boolean
  watchingMode: boolean
}

const ROOMS_PATH = `${process.env.REACT_APP_STAGE}/room`;

class RoomComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loginAlert: false,
      watchingMode: false,
    };

    this.onLangChange = this.onLangChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onNameInput = this.onNameInput.bind(this);

    const docRef = realtimeDB.ref(`${ROOMS_PATH}/${this.state.id}`);
    docRef.on('value', (doc) => {
      const data = doc.val() as Room;
      console.log('value: ', data);
      this.setState({ room: data });
    });
  }

  onLangChange(language: Language):void {
    console.log({ language });
    this.setState((prevState) => {
      if (!prevState.room) return null;
      realtimeDB.ref(`${ROOMS_PATH}/${prevState.id}/currentRound`).update({ language });
      const { room } = prevState;
      room.currentRound.language = language;
      return { room };
    });
  }

  onCodeChange(code: string):void {
    console.log({ code });
    this.setState((prevState) => {
      if (!prevState.room) return null;
      realtimeDB.ref(`${ROOMS_PATH}/${prevState.id}/currentRound`).update({ code });
      const { room } = prevState;
      room.currentRound.code = code;
      return { room };
    });
  }

  async onNameInput(name: string):Promise<void> {
    await this.login().catch(() => {
      this.setState({ loginAlert: true });
    });

    const docRef = realtimeDB.ref(`${ROOMS_PATH}/${this.state.id}`);
    console.log(docRef);
    docRef.once('value').then((doc) => {
      console.log({ doc });
      if (doc.exists()) { // exist room
        const room = doc.val() as Room;
        const selfUserIndex = room.users.findIndex((user) => user.id === this.state.user?.uid);
        console.log({ selfUserIndex });

        if (selfUserIndex === -1) {
          console.log('new user: ', name);
          room.users.push({ name, point: 0, id: this.state.user?.uid ?? '' });
          docRef.set(room)
            .then(() => console.log('Document successfully written', room))
            .catch((err) => console.error('Writing docuemnt failed.: ', err));
        } else if (room.users[selfUserIndex].name === name) {
          console.log('duplicate uid. skipping update firestore');
        } else {
          console.log('update to use new name');
          room.users[selfUserIndex].name = name;
          docRef.set(room)
            .then(() => console.log('Document successfully written', room))
            .catch((err) => console.error('Writing docuemnt failed.: ', err));
        }

        this.setState({ room });
      } else { // not exist room
        this.setState((prevState) => {
          const room :Room = {
            currentRound: {
              language: languages[0],
              problemURL: '',
              code: '',
            },
            users: [{
              name,
              point: 0,
              id: prevState.user?.uid ?? '',
            }],
            currentState: RoundState.問題提示,
            history: [],
          };
          console.log({ room });
          docRef.set(room)
            .then(() => console.log('Document successfully written', room))
            .catch((err) => console.error('Writing docuemnt failed.: ', err));
          return { room };
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
          <Editor
            autocomplete
            onCodeChange={this.onCodeChange}
            onLangChange={this.onLangChange}
            code={this.state.room ? this.state.room.currentRound.code : ''}
            language={this.state.room ? this.state.room.currentRound.language : languages[0]}
          />
        </section>
        <section className={classes.problem}>
          <Problem url="https://atcoder.jp/contests/abc047/tasks/abc047_a" />
        </section>
        <section className={classes.users}>
          <Users users={this.state.room?.users} />
        </section>
        <section className={classes.stats}>
          <Stats onReady={() => { console.log('Ready'); }} />
        </section>
        <Notification
          open={this.state.loginAlert}
          onClose={() => this.setState({ loginAlert: false, watchingMode: true })}
          severnity="error"
          variant="filled"
          autoHideDuration={3000}
        >
          ログインできませんでした。もう一度試してください。
        </Notification>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.watchingMode}
          message="観戦モードで参加しています"
        />
      </div>
    );
  }
}
export default RoomComponent;
