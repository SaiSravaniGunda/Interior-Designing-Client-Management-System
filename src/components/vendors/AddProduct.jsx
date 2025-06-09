import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./AddProduct.css";

const AddProduct = () => {
  const { userId } = useAuth();
  const vendorId = userId ? Number(userId) : null; // Ensure vendorId is a number
  const [shop, setShop] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!vendorId) return;

    axios
      .get(`http://localhost:8081/api/shops/vendor/${vendorId}`, {
        withCredentials: true,
      })
      .then((res) => setShop(res.data))
      .catch(() => setShop(null));
  }, [vendorId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shop) {
      setMessage({ type: "error", text: "You need to create a shop before adding products." });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8081/api/products/add/${shop.id}`, // Correctly appending shopId
        product,
        { withCredentials: true }
      );
      setMessage({ type: "success", text: "Product added successfully!" });
      setProduct({ name: "", imageUrl: "", price: "", description: "", quantity: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to add product. Try again." });
    }
  };

  return (
    <div className="add-product-container">
      {shop ? (
        <form className="product-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
          <input type="text" name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
          <button type="submit">Add Product</button>
        </form>
      ) : (
        <div className="no-shop-message">
          <p>You don't have a shop yet.</p>
          <a href="/my-shop" className="create-shop-button">Go to My Shop</a>
        </div>
      )}
      {message.text && <p className={message.type === "error" ? "error-message" : "success-message"}>{message.text}</p>}
    </div>
  );
};

export default AddProduct;
