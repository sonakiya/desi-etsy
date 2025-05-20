import React from "react";
import "../App.css"; // or your specific css file

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover Unique <span style={{color:"orange"}}>Handmade</span> Crafts</h1>
        <p>
          Explore a world of artisan creativity with authentic, one-of-a-kind
          products made just for you.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => window.location.href = "/signup"}>
            Get Started
          </button>
          <button className="btn-secondary" onClick={() => window.location.href = "/login"}>
            Browse Products
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="/ghar.png"
          alt="Handmade crafts"
          
        />
      </div>
    </section>
  );
};

export default Hero;
