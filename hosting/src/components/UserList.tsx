import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import { Users, UserID } from '../types/types';

import classes from './UserList.module.css';

interface Props {
  selfId?: UserID;
  users?: Users;
  onVote: (voteUserId: string) => void;
}
interface State {
  voteUserId: string;
}

class UserList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onRadioChange = this.onRadioChange.bind(this);
    this.onVoteUser = this.onVoteUser.bind(this);
    this.state = {
      voteUserId: '',
    };
  }

  onRadioChange(event: React.ChangeEvent<HTMLInputElement>, voteUserId: string):void {
    if (voteUserId === this.props.selfId) return;
    this.setState({ voteUserId });
  }

  onVoteUser(event: React.FormEvent<HTMLFormElement>):void {
    event.preventDefault();
    const votedUser = this.props.users && this.props.users[this.state.voteUserId];
    this.props.onVote(this.state.voteUserId);
    console.log({ votedUser });
  }

  render(): JSX.Element {
    return (
      <div className={classes.container}>
        <form onSubmit={this.onVoteUser}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vote writing user</FormLabel>
            <RadioGroup value={this.state.voteUserId} onChange={this.onRadioChange}>
              {
                Object.entries(this.props.users ?? {})
                  .sort(([userId]) => (userId === this.props.selfId ? -1 : 0))
                  .map(([userId, user]) => (
                    <FormControlLabel
                      key={user.name + userId}
                      value={userId}
                      control={<Radio />}
                      label={user.name}
                    />
                  ))
              }
            </RadioGroup>
          </FormControl>
          <p>
            <Button type="submit" variant="contained">Vote</Button>
          </p>
        </form>
      </div>
    );
  }
}
export default UserList;
