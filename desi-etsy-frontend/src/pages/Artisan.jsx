import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "/api/products";

const ArtisanDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching artisan's products", error);
      toast.error("❌ Failed to load products");
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE}/update/${editId}`, data, config);
        toast.success("✅ Product updated successfully!");
      } else {
        await axios.post(`${API_BASE}/create`, data, config);
        toast.success("✅ Product created successfully!");
      }

      fetchMyProducts();
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      setPreviewUrl("");
      setEditId(null);
    } catch (err) {
      console.error("Error uploading product", err);
      toast.error("❌ Upload or update failed");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: "", // Reset image file input
    });
    setPreviewUrl(product.image);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Product deleted successfully!");
      fetchMyProducts();
    } catch (err) {
      console.error("Error deleting product", err);
      toast.error("❌ Failed to delete product");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-4">🎨 Artisan Dashboard</h2>

      {/* Upload/Edit Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4>{editId ? "Update Product" : "Upload New Product"}</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            rows="2"
            className="form-control mb-2"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            className="form-control mb-2"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="form-select mb-2"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Paintings">Paintings</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="file"
            name="image"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData((prev) => ({ ...prev, image: file }));
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
            required={!editId}
          />

          {previewUrl && (
            <div className="mb-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxHeight: "150px" }}
              />
            </div>
          )}

          <button className="btn btn-warning w-100">
            {editId ? "Update Product" : "Upload Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <h4 className="mb-3">🛍️ My Products</h4>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="d-flex align-items-center justify-content-between border p-2 mb-3 rounded shadow-sm bg-light"
          >
            <div className="d-flex align-items-center">
              <img
                src={product.image}
                alt={product.title}
                width="80"
                height="80"
                className="me-3 rounded"
              />
              <div>
                <h5 className="mb-1">{product.title}</h5>
                <small>
                  {product.category} | ₹{product.price}
                </small>
              </div>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArtisanDashboard;
