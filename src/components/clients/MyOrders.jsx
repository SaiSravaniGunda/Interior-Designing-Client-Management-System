import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./MyOrders.css"; // Custom styles

const MyOrders = () => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/orders/user/${userId}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data.sort((a, b) => b.orderId - a.orderId)); // Sorting in descending order
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">
        <FaBox className="orders-icon" /> My Orders
      </h2>

      {loading && <p className="loading-text">Loading orders...</p>}
      {error && <p className="error-text">{error}</p>}

      {orders.length === 0 && !loading ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <h3 className="order-id">Order ID: {order.orderId}</h3>
              <p className="order-address"><strong>Address:</strong> {order.address}</p>
              <p className="order-status"><strong>Order Status:</strong> {order.paymentStatus}</p>
              
         
              <ul className="order-items">
                {order.orderItems.map((item) => (
                  <li key={item.itemId} className="order-item">
                    <img src={item.productImage} alt={item.productName} className="product-image" />
                    <div className="item-details">
                      <span className="item-name">{item.productName}</span>
                      <span className="item-quantity">{item.quantity} x ₹{item.price.toFixed(2)}</span>
                      <span className="item-delivery-status"><strong>Delivery Status:</strong> {item.deliveryStatus}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;