import React from 'react';

import { TextField, Button } from '@material-ui/core';

const BugForm: React.FC = () => (
	<div>
		<h3>バグ報告</h3>
		<TextField label="Message" variant="outlined" />
		<Button
			variant="contained"
			color="primary"
		>
			Send
			</Button>
	</div>
);

export default BugForm;
