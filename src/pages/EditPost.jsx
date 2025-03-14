import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/posts/${id}`)
        .then((response) => {
          setPost(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `http://localhost:3000/posts/${id}` : 'http://localhost:3000/posts';

    axios[method](url, post)
      .then(() => navigate('/admin/posts'))
      .catch((error) => console.error('Error saving post:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  if (loading) return <Typography>Loading post data...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Post' : 'Create New Post'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
          />

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            {id ? 'Update' : 'Create'} Post
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditPost;
