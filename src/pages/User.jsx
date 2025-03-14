import { useParams, Link } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";
import '../style/User.scss'

const User = () => {
  const { id } = useParams();
  const { data: userData, loading: userLoading, error: userError } = useFetchData(`http://localhost:3000/users/${id}`);
  const { data: postsData, loading: postsLoading, error: postsError } = useFetchData('http://localhost:3000/posts');

  if (userLoading || postsLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user data: {userError}</div>;
  if (postsError) return <div>Error loading posts: {postsError}</div>;

  const userPosts = Array.isArray(postsData)
    ? postsData.filter((post) => String(post.user_id) === String(id))
    : [];

  return (
    <div className="user-profile">
      <div className="background-image" style={{ backgroundImage: `url(${userData?.BackgroundPic})` }}></div>
      <div className="profile-content">
        <img src={userData?.profilePic} alt={userData?.name} className="profile-picture" />
        <h1 className="user-name">{userData?.name}</h1>
        <p className="user-description">{userData?.description}</p>

        <div className="details-posts-wrapper">
        <div className="user-details">
          <h2>User's Info:</h2>
          <div className="detail-item">
            <span>Email:</span>
            <a href={`mailto:${userData?.email}`}>{userData?.email}</a>
          </div>
          <div className="detail-item">
            <span>Address:</span>
            <span>{userData?.address}</span>
          </div>
        </div>
        <div className="user-posts">
          <h2>User Related Posts:</h2>
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
      </div>
    </div>
  );
};

export default User;