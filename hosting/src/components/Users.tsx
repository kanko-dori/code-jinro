import React from 'react';

import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button
} from "@material-ui/core";

import classes from "./Users.module.css";

interface Props {}
interface State {
  users: User[];
  voteUser?: string;
}

class Users extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      users: [ new User("Tom") ],
    }
  }
  render() {
    return (
      <div className={classes.container}>
        <form onSubmit={this.onVoteUser}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vote writing user</FormLabel>
            <RadioGroup value={this.state.voteUser} onChange={this.onRadioChange}>
              {
                this.state.users.map(user =>
                  <FormControlLabel key={user.name} value={user.name} control={<Radio />} label={user.name} />
                )
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

  onRadioChange(event: React.ChangeEvent<HTMLInputElement>, value: string) {
    console.log(event);
  }
  onVoteUser(event: React.FormEvent<HTMLFormElement>) {
    console.log(event);
  }
};
export default Users;

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}