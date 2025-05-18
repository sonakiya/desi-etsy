import React from "react";


const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2 className="form-title">Login to <span className="desi-span">DesiEtsy</span></h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="form-btn">Login</button>

        <p className="form-footer">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
