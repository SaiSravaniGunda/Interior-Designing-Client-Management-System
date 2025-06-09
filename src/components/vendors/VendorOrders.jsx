import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import "./VendorOrders.css";

const API_BASE_URL = "http://localhost:8081/api/vendor/order-items";

const VendorOrders = () => {
    const { userId: vendorId } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!vendorId) {
            console.error("Vendor ID is missing. Cannot fetch orders.");
            return;
        }

        const fetchOrders = async () => {
            try {
                console.log(`Fetching orders for vendor: ${vendorId}`);
                const res = await fetch(`${API_BASE_URL}/${vendorId}`, { credentials: "include" });

                if (!res.ok) {
                    throw new Error(`Failed to fetch orders: ${res.status}`);
                }

                const data = await res.json();
                console.log("Orders fetched:", data);
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                toast.error("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [vendorId]);

    const handleUpdateStatus = async (orderItemId, newStatus) => {
        try {
            if (!vendorId) {
                toast.error("Vendor ID is missing. Unable to update status.");
                return;
            }
    
            const res = await fetch(`${API_BASE_URL}/${orderItemId}/update-status?status=${newStatus}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!res.ok) {
                throw new Error(`Failed to update order status: ${res.status}`);
            }
    
            // Update state to reflect new status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderItemId ? { ...order, deliveryStatus: newStatus } : order
                )
            );
    
            toast.success("Order status updated!");
        } catch (err) {
            console.error("Status update error:", err);
            toast.error("Failed to update status.");
        }
    };
    

    if (!vendorId) {
        return <p className="vendor-error">Error: Vendor ID is missing. Please log in again.</p>;
    }

    return (
        <div className="vendor-orders-wrapper">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <h2 className="vendor-orders-title">Vendor Orders</h2>

            {loading ? (
                <p className="vendor-loading">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="vendor-no-orders">No orders available.</p>
            ) : (
                <table className="vendor-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Shipping Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td className="vendor-product-info">
                                    <img src={order.productImage} alt={order.productName} className="vendor-product-img" />
                                    {order.productName}
                                </td>
                                <td>{order.quantity}</td>
                                <td>₹{order.price}</td>
                                <td>{order.shippingAddress}</td>
                                <td>{order.deliveryStatus}</td>
                                <td>
                                    <select
                                        className="vendor-status-select"
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        value={order.deliveryStatus}
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VendorOrders;
