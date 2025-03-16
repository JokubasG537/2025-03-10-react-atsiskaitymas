import { useParams } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";
import "../style/Product.scss";

const Product = () => {
  const { id } = useParams();
  const { data: product, loading: productLoading, error: productError } = useFetchData(`http://localhost:3000/products/${id}`);
  const { data: posts, loading: postsLoading, error: postsError } = useFetchData("http://localhost:3000/posts");

  if (productLoading || postsLoading) return <div>Loading...</div>;
  if (productError || postsError) return <div>Error loading data.</div>;

  const relatedPosts = posts.filter(post => post.product_id === Number(id));

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-description">{product.description}</p>

      <div className="related-posts">
        <h2>Related Blog Posts</h2>
        {relatedPosts.length > 0 ? (
          relatedPosts.map(post => (
            <div key={post.id} className="post-item">
              <a href={`/posts/${post.id}`}>{post.title}</a>
          
            </div>
          ))
        ) : (
          <p>No related posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
