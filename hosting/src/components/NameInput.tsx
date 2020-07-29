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
    };
    this.textRef = React.createRef();
  }

  render() {
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
              />
            </p>
            <p><Button variant="contained" type="submit">Commit!</Button></p>
          </form>
        </div>
      </Modal>
    );
  }

  componentDidMount() {
    setTimeout(() => this.textRef.current?.focus(), 100);
  }

  onNameChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  }

  onNameSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log(event);
    this.props.onNameInput(this.state.name);
    this.setState({
      open: false,
    });
  }
}
export default NameInput;
