import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./MyShop.css";

const MyShop = () => {
    const { userId: vendorId } = useAuth();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: ""
    });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/shops/vendor/${vendorId}`,{
                    withCredentials:true
                });
                setShop(response.data);
            } catch (err) {
                setError("No shop found. Create one.");
            } finally {
                setLoading(false);
            }
        };
        if (vendorId) fetchShop();
    }, [vendorId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateShop = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await axios.post(`http://localhost:8081/api/shops/create/${vendorId}`, formData,{
                withCredentials:true
            });
            setShop(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to create shop");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="shop-container">
            {loading ? (
                <div className="spinner"></div>
            ) : shop ? (
                <div className="shop-card">
                    <h2 className="shop-name">{shop.name}</h2>
                    <p><strong>Address:</strong> {shop.address}</p>
                    <p><strong>Description:</strong> {shop.description}</p>
                </div>
            ) : (
                <>
                    {error && <div className="alert">{error}</div>}
                    <form className="shop-form" onSubmit={handleCreateShop}>
                        <div className="form-group">
                            <label>Shop Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" disabled={creating} className="submit-btn">
                            {creating ? "Creating..." : "Create Shop"}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default MyShop;