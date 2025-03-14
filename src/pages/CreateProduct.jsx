import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/products', product)
      .then(() => {
        navigate('/admin/products'); // Redirect to the products list after creating a product
      })
      .catch((error) => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="price"
          value={product.price}
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
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Create Product
        </Button>
      </form>
    </Box>
  );
}

export default CreateProduct;
