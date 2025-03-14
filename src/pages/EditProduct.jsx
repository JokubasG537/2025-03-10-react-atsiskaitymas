import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((response) => {

          setProduct({
            name: response.data.name || '',
            description: response.data.description || '',
            image: response.data.image || '',
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
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
      ? `http://localhost:3000/products/${id}`
      : 'http://localhost:3000/products';

    axios[method](url, product)
      .then(() => navigate('/admin/products'))
      .catch((error) => console.error('Error saving product:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (loading) return <Typography>Loading product data...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Product' : 'Create New Product'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={product.name || ''}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product.description || ''}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={product.image || ''}
            onChange={handleChange}
            margin="normal"
            required
          />

          {product.image && (
            <Box mt={2}>
              <Typography>Preview:</Typography>
              <img src={product.image} alt="Product" width="150" />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            {id ? 'Update' : 'Create'} Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditProduct;
