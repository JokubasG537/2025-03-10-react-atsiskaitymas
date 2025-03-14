import { useParams, Link } from "react-router-dom";
import useFetchData from "../components/hooks/fetchData";
import '../style/Users.scss'

const Users = () => {
  const { data: usersData, loading, error } = useFetchData('http://localhost:3000/users');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }

  return (
    <div className="users">
      <h2>Our Users</h2>
      <div className="users-wrapper">
        {usersData.map((user) => (
          <div key={user.id} className="user-item">
            <Link to={`/users/${user.id}`}>
              <img src={user.profilePic} alt={`${user.name}'s profile`} className="user-pic" />
              {user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
