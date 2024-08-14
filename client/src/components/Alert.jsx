import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Function for Success Alert
export function SuccessAlert({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{message}</Alert>
    </Stack>
  );
}

// Function for Info Alert
export function InfoAlert({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">{message}</Alert>
    </Stack>
  );
}

// Function for Warning Alert
export function WarningAlert({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">{message}</Alert>
    </Stack>
  );
}

// Function for Error Alert
export function ErrorAlert({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
}
