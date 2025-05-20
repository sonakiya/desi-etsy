import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5500/api/auth/signup", formData);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <h2 className="text-center mb-4">
              Signup to <span className="fw-bold text-dark">Desi<span style={{ color: "orange" }}>Etsy</span></span>
            </h2>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="artisan">Artisan</option>
                
              </select>
            </div>

            <button type="submit" className="btn btn-warning w-100">
              Signup
            </button>

            <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
