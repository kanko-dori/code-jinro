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

import classes from './Users.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}
interface State {
  users: { name: string }[];
  voteUser?: string;
}

class Users extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onRadioChange(event: React.ChangeEvent<HTMLInputElement>, value: string):void {
    // TODO
    console.log(event, value);
  }

  // eslint-disable-next-line class-methods-use-this
  onVoteUser(event: React.FormEvent<HTMLFormElement>):void {
    // TODO
    console.log(event);
  }

  render(): JSX.Element {
    return (
      <div className={classes.container}>
        <form onSubmit={this.onVoteUser}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vote writing user</FormLabel>
            <RadioGroup value={this.state.voteUser} onChange={this.onRadioChange}>
              {
                this.state.users.map((user) => (
                  <FormControlLabel
                    key={user.name}
                    value={user.name}
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
export default Users;
