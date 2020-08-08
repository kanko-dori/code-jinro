import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Room } from '../types/types';

type response = {
  room: Room,
  id: string
}

const CreateRoom: React.FC = () => {
  const history = useHistory();

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch(`/api/room/${process.env.NODE_ENV}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((data: response) => {
        console.log(data);
        history.push(`/room/${data.id}`);
      }).catch((err) => {
        console.log('fetch failed: ', err);
      });
  };

  return (
    <Paper>
      <Typography variant="h5">ゲーム開始</Typography>
      <Button variant="contained" onClick={handleClick}>CreateRoom</Button>
    </Paper>
  );
};

export default CreateRoom;
