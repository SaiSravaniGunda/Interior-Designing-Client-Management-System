import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProducts.css"; // CSS file for styling
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = "http://localhost:8081/api";

const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "Above ₹2000", min: 2000, max: Infinity },
];

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);
  const { userId } = useAuth();
  const [enlargedImage, setEnlargedImage] = useState(null); // For image preview

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredData = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= selectedRange.min && product.price <= selectedRange.max;
      return matchesSearch && matchesPrice;
    });
    setFiltered(filteredData);
  }, [searchTerm, selectedRange, products]);

  const handleAddToCart = (productId) => {
    axios
      .post(
        `${API_BASE_URL}/cart/add?userId=${userId}&productId=${productId}&quantity=1`,
        {},
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

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          onChange={(e) =>
            setSelectedRange(priceRanges[e.target.selectedIndex])
          }
        >
          {priceRanges.map((range, index) => (
            <option key={index}>{range.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filtered.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                onClick={() => setEnlargedImage(product.imageUrl)}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Stock:</strong> {product.quantity}
              </p>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="add-to-cart"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div className="image-modal" onClick={() => setEnlargedImage(null)}>
          <span
            className="close-button"
            onClick={() => setEnlargedImage(null)}
          >
            &times;
          </span>
          <img src={enlargedImage} alt="Enlarged View" />
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
