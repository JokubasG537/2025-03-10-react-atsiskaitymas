import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Users</h1>
      <Link to="/admin/users/new">Create New User</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <Link to={`/admin/users/${user.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
