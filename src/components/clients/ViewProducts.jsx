import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api"; // API base URL

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId] = useState(1); // Replace with actual user ID from authentication

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (productId) => {
    axios
      .post(
        `${API_BASE_URL}/cart/add?userId=${userId}&productId=${productId}&quantity=1`, // Send as query params
        {}, // Empty body since we're using query parameters
        { withCredentials: true }
      )
      .then(() => {
        alert("Product added to cart successfully!");
      })
      .catch(() => {
        alert("Failed to add product to cart.");
      });
  };

  return (
    <div className="view-products">
      <h2>All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Stock:</strong> {product.quantity}
              </p>
              <button onClick={() => handleAddToCart(product.id)} className="add-to-cart">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
