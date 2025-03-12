import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink  to="/"
        className="img-name-wrapper">
          <img src="#" alt="website logo" />
          <span>PromoSphere</span>
        </NavLink>
        <div className="nav-items">
        <NavLink to="/users">Users</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/products">Products</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Nav