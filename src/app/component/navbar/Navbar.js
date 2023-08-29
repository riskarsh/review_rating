import React from 'react';
import circleStar from "../../assets/circleStar.jpeg";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }
 
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={circleStar} alt="Circle Star" width="40" height="40" className="d-inline-block align-top" />   Review & <strong>RATE</strong>
          </a>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button type='button' class="btn btn-link" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
