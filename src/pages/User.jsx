import { useParams, Link } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";

const User = () => {
  const { id } = useParams();
  const { data: userData, loading: userLoading, error: userError } = useFetchData(`http://localhost:3000/users/${id}`);
  const { data: postsData, loading: postsLoading, error: postsError } = useFetchData(`http://localhost:3000/posts`);

  if (userLoading || postsLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user data: {userError}</div>;
  if (postsError) return <div>Error loading posts: {postsError}</div>;

 
  const userPosts = Array.isArray(postsData)
    ? postsData.filter((post) => String(post.user_id) === String(id))
    : [];

  return (
    <div>
      <h1>{userData?.name}</h1>
      <img src={userData?.profilePic} alt={userData?.name} />
      <p>{userData?.description}</p>

      <div className="more-info-user">
        <h2>User's info:</h2>
        <span>
          <a href={`mailto:${userData?.email}`}>{userData?.email}</a>
        </span>
        <span>{userData?.address}</span>
      </div>

      <div className="users-posts">
        <h2>User related posts:</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="post-link">
              <h3>{post.title}</h3>
            </Link>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default User;
