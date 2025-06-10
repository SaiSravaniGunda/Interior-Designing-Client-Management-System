import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VendorList.css";

const VendorList = ({ onSelectShop }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/shops", { withCredentials: true })
      .then((res) => {
        setShops(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load vendors.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="vendor-list">
      <h2>Available Vendors</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : shops.length === 0 ? (
        <p>No vendors available.</p>
      ) : (
        <div className="vendor-grid">
          {shops.map((shop) => (
            <div key={shop.id} className="vendor-card" onClick={() => onSelectShop(shop.id)}>
              <h3 className="shop-name">{shop.name}</h3>
              {shop.description}
              <p><strong>Address:</strong> {shop.address}</p>
             
              {shop.vendor && (
                <>
                  <p><strong>Vendor Name:</strong> {shop.vendor.name}</p>
                  <p><strong>Vendor Email:</strong> {shop.vendor.email}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
