import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const RegistrationForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        setIsOpen(false);
      } else {
        console.error('Registration failed');
        setErrorMessage('User with entered email already exists');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const openRegistrationForm = () => {
    setIsOpen(true);
  };

  const closeRegistrationForm = () => {
    setIsOpen(false);
    setErrorMessage('');
  };

  return (
    <>
      <Button size="large" onClick={openRegistrationForm} style={{ color: 'white' }}>
        Register
      </Button>
      <Dialog open={isOpen} onClose={closeRegistrationForm} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center' }}>REGISTER ON OUR SITE</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
            </div>
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
                REGISTER
              </Button>
              <Button onClick={closeRegistrationForm} style={{ backgroundColor: 'white', color: 'black' }}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationForm;
