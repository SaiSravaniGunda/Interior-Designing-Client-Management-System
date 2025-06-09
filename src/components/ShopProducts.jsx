import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShopProducts.css";

const ShopProducts = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!shopId) return;

    axios
      .get(`http://localhost:8081/api/products/shop/${shopId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [shopId]);

  return (
    <div className="shop-products">
      <h2>Shop Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                onClick={() => setSelectedImage(product.imageUrl)}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Stock:</strong> {product.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="image-modal">
          <div className="image-container">
            <span className="close-button" onClick={() => setSelectedImage(null)}>
              &times;
            </span>
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
