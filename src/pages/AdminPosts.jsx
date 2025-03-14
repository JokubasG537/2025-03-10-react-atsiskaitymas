import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/admin/posts/new">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <Link to={`/admin/posts/${post.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPosts;
