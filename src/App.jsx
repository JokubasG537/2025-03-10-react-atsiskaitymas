import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import User from "./pages/User.jsx"
import Posts from "./pages/Posts.jsx";
import Post from "./pages/Post.jsx";
import Tasks from "./pages/Tasks.jsx";
import Products from "./pages/Products.jsx";
import Nav from "./components/Nav.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
