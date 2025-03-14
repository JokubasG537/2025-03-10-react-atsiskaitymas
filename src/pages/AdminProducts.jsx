import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to="/admin/products/new">Create New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;
