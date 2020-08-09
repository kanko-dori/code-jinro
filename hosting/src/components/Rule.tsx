import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

import classes from './Rule.module.css';

const Rule: React.FC = () => (
  <Card className={classes.container}>
    <CardContent>
      <Typography variant="h4">ルールは簡単！</Typography>
      <Typography paragraph>
        コーダーに選ばれたら出された問題を「癖が出ないよう」にコーディングしよう！回答者に当てられなければ当てられないほど得点。普段使わない言語で惑わせに！？
      </Typography>
      <Typography paragraph>回答者はコーダーの癖を見極め、誰かを当てろ！普段気づかない癖も明らかに？</Typography>
    </CardContent>
  </Card>
);

export default Rule;
