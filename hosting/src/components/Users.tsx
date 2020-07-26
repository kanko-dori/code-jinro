import React from 'react';

import "./Users.tsx";

interface Props {}
interface State {
  users: User[];
}

class Users extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      users: [ new User("Tom") ]
    }
  }
  render() {
    return (
      <div className="container">
        <ul>
          {
            this.state.users.map(user =>
              <li key={user.name}>{user.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
};
export default Users;

class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}