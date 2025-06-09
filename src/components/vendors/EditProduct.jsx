import React, { useState } from "react";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = ({ product, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/products/update/${product.id}`, updatedProduct, { withCredentials: true });
      setMessage("Product updated successfully!");
      setTimeout(onClose, 2000); // Close after 2 sec
    } catch {
      setMessage("Failed to update product.");
    }
  };

  return (
    <div className="edit-product-modal">
      <div className="edit-product-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} required />
          <input type="text" name="imageUrl" value={updatedProduct.imageUrl} onChange={handleChange} required />
          <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} required />
          <input type="number" name="quantity" value={updatedProduct.quantity} onChange={handleChange} required />
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} required />
          <div className="button-group">
          <button type="submit">Save Changes</button>
          <button className="close-button1" onClick={onClose}>Cancel</button>
          </div>
         
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default EditProduct;
