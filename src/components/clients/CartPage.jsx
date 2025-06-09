import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartPage.css";

const API_BASE_URL = "http://localhost:8081/api";

const CartPage = () => {
    const { userId } = useAuth();
    console.log(userId);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/cart/${userId}`, { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch cart items");

                const text = await res.text();
                const data = text ? JSON.parse(text) : {};
                setCart(data.cartItems || []);
            } catch (err) {
                toast.error("Failed to load cart.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId]);

    const handleRemoveItem = async (productId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/cart/remove?userId=${userId}&productId=${productId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to remove item from cart");

            setCart(cart.filter((item) => item.productId !== productId));
            toast.success("Item removed from cart!");
        } catch (err) {
            toast.error("Failed to remove item.");
        }
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            toast.warning("Your cart is empty!");
            return;
        }
    
        if (!address.trim()) {
            toast.warning("Please enter your delivery address!");
            return;
        }
    
        const totalAmount = Math.round(
            cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
        );
    
        console.log(totalAmount);
        try {
            const res = await fetch(`${API_BASE_URL}/payments/create?amount=${totalAmount}`, {
                method: "POST",
                credentials: "include"
            });
    
            if (!res.ok) throw new Error("Failed to create payment order");
    
            const order = await res.json();
    
            const options = {
                key: "rzp_test_Qi1InUYyVMLZdY",
                amount: totalAmount,  // Must be in paise
                currency: "INR",
                name: "Interior Store",
                description: "Order Payment",
                order_id: order.id,
                handler: async function (response) {
                    toast.success("Payment successful!");
    
                    // ✅ Post Order Data
                    const orderRes = await fetch(`${API_BASE_URL}/orders/place`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({
                            userId: Number(userId),
                            order: {
                                address,
                                paymentStatus: "PAID",
                                deliveryStatus: "PENDING",
                                orderItems: cart.map((item) => ({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    price: item.price,
                                })),
                            },
                        }),
                    });
    
                    if (!orderRes.ok) throw new Error("Order placement failed");
    
                    // ✅ Clear the Cart after successful order placement
                    await fetch(`${API_BASE_URL}/cart/clear/${userId}`, {
                        method: "DELETE",
                        withCredentials:true
                    });
    
                    // ✅ Reset the cart and address
                    setCart([]);
                    setAddress("");
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#F37254" },
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.log(err);
            toast.error("Failed to process payment.");
        }
    };
    
    

    return (
        <div className="cart-container">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            
            <h2>Shopping Cart</h2>
            
            {loading ? (
                <p>Loading your cart...</p>
            ) : cart.length > 0 ? (
                <>
                    {cart.map((item) => (
                        <div key={item.productId} className="cart-item">
                            <img src={item.image_url} alt={item.productName} className="cart-item-image" />
                            <div className="cart-details">
                                <h3>{item.productName}</h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.productId)} className="remove-btn">
                                Remove
                            </button>
                        </div>
                    ))}

                    <input 
                        type="text" 
                        placeholder="Enter your delivery address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className="address-input" 
                    />

                    <button 
                        onClick={handlePlaceOrder} 
                        className="place-order-btn"
                        disabled={placingOrder}
                    >
                        {placingOrder ? "Placing Order..." : "Place Order"}
                    </button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;