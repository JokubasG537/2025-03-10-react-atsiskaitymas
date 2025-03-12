import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import User from "./pages/User.jsx";
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Products from "./pages/Products.jsx";
import Product from './pages/Product.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import EditUser from './pages/EditUser.jsx';
import AdminPosts from './pages/AdminPosts.jsx';
import EditPost from './pages/EditPost.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import EditProduct from './pages/EditProduct.jsx'; 
import Nav from "./components/Nav.jsx";
import Footer from './components/Footer.jsx';

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />


        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/:id/edit" element={<EditUser />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/posts/:id/edit" element={<EditPost />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/:id/edit" element={<EditProduct />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
