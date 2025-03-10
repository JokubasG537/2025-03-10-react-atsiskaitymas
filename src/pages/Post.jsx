import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchData from "../components/hooks/fetchData";
import { Link } from "react-router-dom";
const Post = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const { data: postData, loading: postLoading, error: postError } = useFetchData(`http://localhost:3000/posts/${id}`);
  const { data: usersData, loading: usersLoading, error: usersError } = useFetchData('http://localhost:3000/users');
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetchData('http://localhost:3000/categories');

  useEffect(() => {

    if (postData) {
      fetch(`http://localhost:3000/comments?post_id=${id}`)
        .then((res) => res.json())
        .then((commentData) => setComments(commentData))
        .catch((error) => {
          console.error("Error fetching comments data:", error);
        });
    }
  }, [id, postData]);


  if (postLoading || usersLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }


  if (postError || usersError || categoriesError) {
    return <div>Error loading data!</div>;
  }


  const user = usersData?.find((user) => user.id === postData?.user_id);
  const category = categoriesData?.find((category) => category.id === postData?.category_id);

  return (
    <div>
      <Link to={`/users/${user.id}`} className="profile-wrapper">
          <img src={user.profilePic} alt="user profile picture" />
          {user && <p>{user.name}</p>}
      </Link>

      {category && <p>Category: {category.name}</p>}
      <p>{postData?.content}</p>

      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}


      <button onClick={() => window.history.back()}>Back to Posts</button>
    </div>
  );
};

export default Post;
