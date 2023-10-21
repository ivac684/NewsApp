import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log('Login successful');
        window.location.reload();
        setIsOpen(false);
      } else {
        console.error('Login failed');
        setErrorMessage('Incorrect email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  const openLoginForm = () => {
    setIsOpen(true);
  };

  const closeLoginForm = () => {
    setIsOpen(false);
    setErrorMessage('');
  };

  return (
    <>
      <Button
        size="large"
        style={{ color: 'white' }}
        onClick={openLoginForm}
      >
        LOGIN
      </Button>
      <Dialog open={isOpen} onClose={closeLoginForm} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center' }}>LOGIN TO OUR SITE</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </div>
            {errorMessage && (
              <Typography variant="body2" color="error" align="center" gutterBottom>
                {errorMessage}
              </Typography>
            )}
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: 'firebrick', color: 'white' }}
              >
                Login
              </Button>
              <Button
                onClick={closeLoginForm}
                style={{ backgroundColor: 'white', color: 'black' }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
