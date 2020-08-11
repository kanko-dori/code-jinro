/* eslint-disable max-classes-per-file */
import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import { Users, User } from '../types/types';

import classes from './Users.module.css';

interface Props {
  users?: Users;
}
interface State {
  voteUserId: string;
}

class UsersComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onRadioChange = this.onRadioChange.bind(this);
    this.onVoteUser = this.onVoteUser.bind(this);
    this.state = {
      voteUserId: '',
    };
  }

  onRadioChange(event: React.ChangeEvent<HTMLInputElement>, value: string):void {
    this.setState({ voteUserId: value });
  }

  onVoteUser(event: React.FormEvent<HTMLFormElement>):void {
    event.preventDefault();
    const votedUser = this.props.users && this.props.users[this.state.voteUserId];
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
                Object.entries(this.props.users ?? {}).map(([userId, user]) => (
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
export default UsersComponent;
