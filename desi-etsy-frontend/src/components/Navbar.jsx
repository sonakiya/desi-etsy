import React from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import "../App.css"; 
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
      <img src="/logo.png" alt="Logo" className="logo" />

        <span className="brand-name">Desi<span style={{color:"#ea580c"}}>Etsy</span> </span>
      </div>

      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search for products" />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        <button className="nav-btn cart-btn">
          <FaShoppingCart />
          <span>Cart</span>
        </button>

       <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
  Login
</button>

<button className="nav-btn signup-btn" onClick={() => navigate("/signup")}>
  Signup
</button>
      </div>
    </nav>
  );
};

export default Navbar;
