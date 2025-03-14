import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

function CreateUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    profilePic: '',
    backgroundPic: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/users', user)
      .then(() => {
        navigate('/admin/users'); // Redirect to the users list after creating a user
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          name="address"
          value={user.address}
          onChange={handleChange}
        />
        <TextField
          label="Profile Picture URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="profilePic"
          value={user.profilePic}
          onChange={handleChange}
        />
        <TextField
          label="Background Picture URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="backgroundPic"
          value={user.backgroundPic}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="description"
          value={user.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create User
        </Button>
      </form>
    </Box>
  );
}

export default CreateUser;
