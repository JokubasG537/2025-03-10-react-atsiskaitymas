import { NavLink } from "react-router-dom";
import logoImg from "../assets/スクリーンショット 2025-03-14 130708.png"
import "../style/Nav.scss"
const Nav = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/" className="img-name-wrapper">
          <img src={logoImg} alt="website logo" />
        </NavLink>
        <div className="nav-items">
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/admin">Admin Panel</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
