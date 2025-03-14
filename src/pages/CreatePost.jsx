import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/posts', post)
      .then(() => {
        navigate('/admin/posts'); 
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="imageUrl"
          value={post.imageUrl}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create Post
        </Button>
      </form>
    </Box>
  );
}

export default CreatePost;
