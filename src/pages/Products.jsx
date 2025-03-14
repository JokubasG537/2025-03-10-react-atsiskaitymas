import { Link } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";

const Products = () => {
  const { data: products, loading, error } = useFetchData("http://localhost:3000/products");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
