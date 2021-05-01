import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">Urao Riders</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div className="navbar-nav ">
        <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        <Link className="nav-link" to="/destination">Destination</Link>
        <Link className="nav-link" to="/blog">Blog</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <li className="nav-item">
          <button className="btn btn-danger"onClick={() => setLoggedInUser({})} > Sign out </button>
        </li>
      </div>
    </div>
  </div>
</nav>

    </div>
    
  );
};

export default Header;
