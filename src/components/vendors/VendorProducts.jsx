import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa"; // Import pencil icon
import EditProduct from "./EditProduct"; // Import the edit component
import "./VendorProducts.css";

const VendorProducts = () => {
  const { userId } = useAuth();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null); // Track editing state

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8081/api/shops/vendor/${userId}`, { withCredentials: true })
      .then((res) => {
        setShop(res.data);
        return axios.get(`http://localhost:8081/api/products/shop/${res.data.id}`, { withCredentials: true });
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products. Please try again.");
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="vendor-products-container">
      <h2>My Shop Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found. Add some products!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.quantity}</p>
              <button className="edit-button" onClick={() => setEditingProduct(product)}>
                <FaEdit />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render EditProduct component if a product is being edited */}
      {editingProduct && <EditProduct product={editingProduct} onClose={() => setEditingProduct(null)} />}
    </div>
  );
};

export default VendorProducts;
