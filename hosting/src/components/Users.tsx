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
import { User } from '../types/types';

import classes from './Users.module.css';

interface Props {
  users?: User[];
}
interface State {
  voteUserId: string;
}

class Users extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onRadioChange = this.onRadioChange.bind(this);
    this.onVoteUser = this.onVoteUser.bind(this);
    this.state = {
      voteUserId: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onRadioChange(event: React.ChangeEvent<HTMLInputElement>, value: string):void {
    this.setState({ voteUserId: value });
  }

  // eslint-disable-next-line class-methods-use-this
  onVoteUser(event: React.FormEvent<HTMLFormElement>):void {
    event.preventDefault();
    console.log('Vote:', this.props.users?.find((user) => user.userID === this.state.voteUserId)?.userName);
  }

  render(): JSX.Element {
    return (
      <div className={classes.container}>
        <form onSubmit={this.onVoteUser}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vote writing user</FormLabel>
            <RadioGroup value={this.state.voteUserId} onChange={this.onRadioChange}>
              {
                (this.props.users ?? []).map((user) => (
                  <FormControlLabel
                    key={user.userName + user.userID}
                    value={user.userID}
                    control={<Radio />}
                    label={user.userName}
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
export default Users;
