import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useRef } from 'react';

export default function AcceptReject() {
  return (
    <Stack direction="row" spacing={2} justifyContent="right" style={{height: '30px' }}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Accept
      </Button>
    </Stack>
  );
}