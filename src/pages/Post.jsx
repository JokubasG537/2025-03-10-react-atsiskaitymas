import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../components/hooks/fetchData";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState("");

  const { data: postData, loading: postLoading, error: postError } = useFetchData(`http://localhost:3000/posts/${id}`);
  const { data: comments, loading: commentsLoading, error: commentsError } = useFetchData(`http://localhost:3000/comments?post_id=${id}`);
  const { data: usersData, loading: usersLoading, error: usersError } = useFetchData('http://localhost:3000/users');
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetchData('http://localhost:3000/categories');
  const { data: productsData, loading: productsLoading, error: productsError } = useFetchData('http://localhost:3000/products');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      const newComment = {
        post_id: id,
        user_id: 1,
        content: commentContent,
      };

      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      .then((res) => res.json())
      .then(() => {
        setCommentContent("");
        window.location.reload();
      })
      .catch((error) => console.error("Error posting comment:", error));
    }
  };

  if (postLoading || usersLoading || categoriesLoading || commentsLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (postError || usersError || categoriesError || commentsError || productsError) {
    return <div>Error loading data!</div>;
  }

  const user = usersData?.find((user) => user.id === postData?.user_id);
  const category = categoriesData?.find((category) => category.id === postData?.category_id);
  const relatedProduct = productsData?.find((product) => product.id === postData?.product_id);

  return (
    <div>
      <Link to={`/users/${user.id}`} className="profile-wrapper">
        <img src={user.profilePic} alt="user profile picture" />
        {user && <p>{user.name}</p>}
      </Link>

      {category && <p>Category: {category.name}</p>}
      <p>{postData?.content}</p>

      {relatedProduct && (
        <div>
          <h2>Related Product</h2>
          <Link to={`/products/${relatedProduct.id}`} className="product-link">
            <img src={relatedProduct.image} alt={relatedProduct.name} style={{ width: "150px" }} />
            <p>{relatedProduct.name}</p>
          </Link>
        </div>
      )}

      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => {
          const commenter = usersData?.find((user) => user.id === comment.user_id);
          return (
            <div key={comment.id} className="comment-wrapper">
              {commenter && (
                <Link to={`/users/${commenter.id}`} className="commenter-profile">
                  <img src={commenter.profilePic} alt="commenter profile" className="commenter-pic" />
                  <strong>{commenter.name}</strong>
                </Link>
              )}
              <p>{comment.content}</p>
            </div>
          );
        })
      ) : (
        <p>No comments yet.</p>
      )}

      <form onSubmit={handleCommentSubmit}>
        <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Write a comment..." />
        <button type="submit">Post Comment</button>
      </form>

      <button onClick={() => window.history.back()}>Back to Posts</button>
    </div>
  );
};

export default Post;
