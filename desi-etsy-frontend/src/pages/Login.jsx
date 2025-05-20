import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5500/api/auth/login", formData);

      toast.success("Login Successful!");

      // Save token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      const role = res.data.user.role;

      if (role === "customer") {
        navigate("/products"); // Homepage for customer
        toast.success("Welcome to customer dashboard!");
      } else if (role === "artisan") {
        navigate("/Artisan");
        toast.success("Welcome to Artisan dashboard!");
      } else {
        toast.error("Invalid role");
      }

    } catch (err) {
      const msg = err.response?.data?.msg || "Login Failed";
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form className="p-4 border rounded bg-white shadow" style={{ width: "100%", maxWidth: "400px" }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">
          Login to <span style={{ color: "black" }}>Desi</span>
          <span style={{ color: "orange" }}>Etsy</span>
        </h2>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">Login</button>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
