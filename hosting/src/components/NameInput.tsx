import React, { ChangeEvent } from 'react';

import {
  Modal,
  TextField,
  Button,
} from '@material-ui/core';

import classes from './NameInput.module.css';

interface Props {
  onNameInput: (name: string) => void
}
interface State {
  open: boolean;
  name: string;
  invalidName: boolean;
}

class NameInput extends React.Component<Props, State> {
  textRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.onNameSubmit = this.onNameSubmit.bind(this);
    this.state = {
      open: true,
      name: '',
      invalidName: false,
    };
    this.textRef = React.createRef();
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const name = event.target.value;
    this.setState({
      name,
      invalidName: (name.length > 20),
    });
  }

  onNameSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (this.state.name.length > 20) return;
    this.props.onNameInput(this.state.name);
    this.setState({
      open: false,
    });
  }

  render(): JSX.Element {
    return (
      <Modal
        open={this.state.open}
        style={{ outline: 'none' }}
      >
        <div className={classes.modalcontainer}>
          <form onSubmit={this.onNameSubmit}>
            <h3>Please input your name.</h3>
            <p>
              <TextField
                label="Nickname"
                required
                value={this.state.name}
                onChange={this.onNameChange}
                ref={this.textRef}
                error={this.state.invalidName}
                helperText={this.state.invalidName && 'Name must be 20 characters or less'}
              />
            </p>
            <p><Button variant="contained" type="submit">Commit!</Button></p>
          </form>
        </div>
      </Modal>
    );
  }
}
export default NameInput;
