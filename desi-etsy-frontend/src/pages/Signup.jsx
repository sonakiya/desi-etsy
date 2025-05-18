import React, { useState } from "react";

const Signup = () => {
  const [role, setRole] = useState("customer");

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2 className="form-title">
          Signup to <span className="desi-span">DesiEtsy</span>
        </h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="artisan">Artisan</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="form-btn">
          Signup
        </button>

        <p className="form-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
