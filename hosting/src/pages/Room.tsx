import React from 'react';

import { Snackbar } from '@material-ui/core';
import NameInput from '../components/NameInput';
import Editor from '../components/Editor';
import Problem from '../components/Problem';
import UserList from '../components/UserList';
import Stats from '../components/Stats';
import Notification from '../components/Notification';

import { realtimeDB, auth, functions } from '../utils/firebase';
import { Room, Language, UserID } from '../types/types';
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
  roomId: string
  user?: firebase.User
  loginAlert: boolean
  watchingMode: boolean
}

const ROOMS_PATH = `${process.env.REACT_APP_STAGE}/rooms`;

class RoomComponent extends React.Component<Props, State> {
  static login():Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      auth.signInAnonymously().catch((err) => console.error('Signin Anonymously failed: ', err));
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('unexpected error'));
        }
      });
    });
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      roomId: props.match.params.id,
      loginAlert: false,
      watchingMode: false,
    };

    this.onLangChange = this.onLangChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onVoteUser = this.onVoteUser.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onNameInput = this.onNameInput.bind(this);

    const docRef = realtimeDB.ref(`${ROOMS_PATH}/${this.state.roomId}`);
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
      realtimeDB.ref(`${ROOMS_PATH}/${prevState.roomId}/currentRound`).update({ language });
      const { room } = prevState;
      room.currentRound.language = language;
      return { room };
    });
  }

  onCodeChange(code: string):void {
    console.log({ code });
    this.setState((prevState) => {
      if (!prevState.room) return null;
      realtimeDB.ref(`${ROOMS_PATH}/${prevState.roomId}/currentRound`).update({ code });
      const { room } = prevState;
      room.currentRound.code = code;
      return { room };
    });
  }

  onVoteUser(voteUserId: UserID): void {
    const vote = functions.httpsCallable('answer');
    vote({
      stage: process.env.REACT_APP_STAGE,
      roomId: this.state.roomId,
      answer: voteUserId,
    })
      .then((res: firebase.functions.HttpsCallableResult) => {
        if (res.data.correct) {
          console.log('Correct!');
        } else {
          console.log('Incorrect');
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  onReady(): void {
    const ready = functions.httpsCallable('ready');
    ready({
      stage: process.env.REACT_APP_STAGE,
      roomId: this.state.roomId,
    })
      .then((res: firebase.functions.HttpsCallableResult) => {
        console.log('ready', res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onNameInput(name: string):Promise<void> {
    return new Promise((resolve, reject) => {
      RoomComponent.login().then((user) => {
        this.setState({ user });
        const enter = functions.httpsCallable('enter');
        return enter({
          stage: process.env.REACT_APP_STAGE,
          roomId: this.state.roomId,
          name,
        });
      })
        .then(() => realtimeDB.ref(`${ROOMS_PATH}/${this.state.roomId}`).once('value'))
        .then((doc) => {
          if (!doc.exists()) throw new Error('Room not found');
          const room = doc.val() as Room;
          console.log({ room });
          this.setState({ room });
          resolve();
        })
        .catch((err) => {
          this.setState({ loginAlert: true });
          reject(err);
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
          <UserList
            users={this.state.room?.users}
            selfId={this.state.user?.uid}
            onVote={this.onVoteUser}
          />
        </section>
        <section className={classes.stats}>
          <Stats onReady={this.onReady} />
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
