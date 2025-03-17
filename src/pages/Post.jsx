import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../components/hooks/fetchData";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import "../style/PostStyle.scss";

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
    return <div className="loading">Loading...</div>;
  }

  if (postError || usersError || categoriesError || commentsError || productsError) {
    return <div className="error">Error loading data!</div>;
  }

  const user = usersData?.find((user) => user.id === postData?.user_id);
  const category = categoriesData?.find((category) => category.id === postData?.category_id);
  const relatedProduct = productsData?.find((product) => product.id === postData?.product_id);

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="header-left">
          <Link to={`/users/${user.id}`} className="profile-link">
            <img src={user.profilePic} alt="user profile" className="user-avatar" />
            <p className="user-name">{user.name}</p>
          </Link>
        </div>
        {category && <p className="category-name">{category.name}</p>}
      </div>

      <div className="post-body">
        <p className="post-content">{postData?.content}</p>
      </div>

      {relatedProduct && (
        <div className="related-product">
          <h2>Related Product</h2>
          <Link to={`/products/${relatedProduct.id}`} className="product-link">
            <img src={relatedProduct.image} alt={relatedProduct.name} className="product-image" />
            <p>{relatedProduct.name}</p>
          </Link>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => {
            const commenter = usersData?.find((user) => user.id === comment.user_id);
            return (
              <div key={comment.id} className="comment-item">
                {commenter && (
                  <Link to={`/users/${commenter.id}`} className="commenter-profile">
                    <img src={commenter.profilePic} alt="commenter profile" className="commenter-avatar" />
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
      </div>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <TextareaAutosize
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          minRows={3}
          maxRows={6}
          className="comment-input"
        />
        <button type="submit" className="submit-btn">Post Comment</button>
      </form>

      <button onClick={() => window.history.back()} className="back-btn">Back to Posts</button>
    </div>
  );
};

export default Post;