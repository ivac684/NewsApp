import React from 'react';
import Button from '@mui/material/Button';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('Logout successful');
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button
        size="large"
        style={{ color: "white", fontWeight: "bold", textTransform: "none" }}
        onClick={handleLogout} 
      >
        Logout
      </Button>
  );
};

export default Logout;
