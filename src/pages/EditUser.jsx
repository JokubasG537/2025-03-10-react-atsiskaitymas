import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    profilePic: '',
    BackgroundPic: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/users/${id}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id
      ? `http://localhost:3000/users/${id}`
      : 'http://localhost:3000/users';

    axios[method](url, user)
      .then(() => navigate('/admin/users'))
      .catch((error) => console.error('Error saving user:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (loading) return <Typography>Loading user data...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit User' : 'Create New User'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Profile Picture URL"
            name="profilePic"
            value={user.profilePic}
            onChange={handleChange}
            margin="normal"
          />
          {user.profilePic && (
            <Box mt={1} textAlign="center">
              <img src={user.profilePic} alt="Profile" width="100"/>
            </Box>
          )}

          <TextField
            fullWidth
            label="Background Picture URL"
            name="BackgroundPic"
            value={user.BackgroundPic}
            onChange={handleChange}
            margin="normal"
          />
          {user.BackgroundPic && (
            <Box mt={1} textAlign="center">
              <img src={user.BackgroundPic} alt="Background" width="100%" height="100px" style={{ objectFit: 'cover' }} />
            </Box>
          )}

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={user.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            {id ? 'Update' : 'Create'} User
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditUser;
