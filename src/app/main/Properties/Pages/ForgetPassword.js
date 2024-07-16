import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../../sign-in/Config';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (err) {
      setMessage('');
      setError('Failed to send password reset email. Make sure the email is correct.');
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box mt={5} p={3} boxShadow={3}sx={{borderRadius:"10px"}}>
        <Typography variant="h6" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handlePasswordReset}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Reset Password
          </Button>
        </form>
        {message && <Typography color="primary">{message}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
