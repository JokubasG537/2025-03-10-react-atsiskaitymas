import { useParams } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";

const Product = () => {
  const { id } = useParams();
  const { data: product, loading: productLoading, error: productError } = useFetchData(`http://localhost:3000/products/${id}`);
  const { data: posts, loading: postsLoading, error: postsError } = useFetchData("http://localhost:3000/posts");

  if (productLoading || postsLoading) return <div>Loading...</div>;
  if (productError || postsError) return <div>Error loading data.</div>;

  const relatedPosts = posts.filter(post => post.product_id === Number(id));

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>

      <h2>Related Blog Posts</h2>
      {relatedPosts.length > 0 ? (
        <div>
          {relatedPosts.map(post => (
            <div key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No related posts found.</p>
      )}
    </div>
  );
};

export default Product;
