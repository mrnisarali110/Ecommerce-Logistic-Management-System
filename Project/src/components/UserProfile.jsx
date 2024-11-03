import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('authToken');
            
            // Check if the token is available
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Make the GET request to fetch the user profile
            const response = await axios.get('http://localhost:3001/auth/get-user-profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });

            // Set the user profile data in state
            setUserProfile(response.data);
        } catch (err) {
            // Handle errors based on the response received
            if (err.response) {
                // Server responded with a status code outside the range of 2xx
                setError(`Error fetching user profile: ${err.response.data.message || 'Forbidden'}`);
                console.error('Server responded with:', err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response received from the server');
                console.error('Request made but no response:', err.request);
            } else {
                // Something happened while setting up the request
                setError(`Error: ${err.message}`);
                console.error('Error in request setup:', err.message);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userProfile ? (
                <div>
                    <h1>User Profile</h1>
                    <p>Name: {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    {/* Display other user profile data as needed */}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
