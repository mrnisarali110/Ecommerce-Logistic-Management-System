import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress, Grid, Button } from '@mui/material';

const UserDetails = ({ userId }) => {
  console.log(userId);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) ;
  // Fetch user details from the API
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log(user)
      try {
        const response = await fetch(`http://localhost:3001/get-user-profile/${user?._id}`, { // Replace with your actual API URL
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.log(error," <----!!!");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Optionally, handle success (e.g., redirect or show a success message)
      alert('User deleted successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">User ID: {userDetails._id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Name: {userDetails.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email: {userDetails.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Role: {userDetails.role}</Typography>
        </Grid>
        {/* Add more user details as needed */}
      </Grid>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete User
      </Button>
    </Paper>
  );
};

export default UserDetails;
