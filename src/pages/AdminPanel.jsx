
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/posts">Manage Posts</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminPanel;
