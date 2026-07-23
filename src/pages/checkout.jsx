import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { getCart } from "../utils/cart"; // cart.js තියෙන path එක
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form inputs state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        phone: ""
    });

    useEffect(() => {
        // Cart එකේ තියෙන බඩු load කරගැනීම
        const items = getCart();
        setCartItems(items);
        
        // Log in වෙලා නැත්නම් Login එකට Redirect කිරීම
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Order එකක් දාන්න කලින් කරුණාකර Log in වෙන්න.");
            navigate("/signin");
        }
    }, [navigate]);

    // Total Price එක ගණනය කිරීම
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.qty), 0);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");
        console.log("=== CHECKOUT DEBUG ===");
        console.log("TOKEN FROM LOCALSTORAGE:", token);

        if (cartItems.length === 0) {
            toast.error("ඔයාගේ Cart එක හිස්!");
            setLoading(false);
            return;
        }

        // Backend එක ඉල්ලන Format එකට Items හදාගැනීම
        const formattedItems = cartItems.map(item => ({
            productId: item.product.productId || item.product._id,
            quantity: item.qty
        }));

        const orderPayload = {
            ...formData,
            items: formattedItems
        };

        try {
            const response = await api.post("/orders", orderPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Order එක සාර්ථකව යැවුණා!");
            localStorage.setItem("cart", "[]"); // Clear cart
            navigate("/orders"); // Profile orders page එකට යැවීම
        } catch (error) {
            console.error("Order placing error:", error);
            const errorMsg = error?.response?.data?.message || "Order එක දාන්න බැරි වුණා. කරුණාකර නැවත උත්සාහ කරන්න.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout Page</h1>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Delivery Information Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Delivery Information</h2>
                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-1/2 p-2 border rounded outline-none focus:border-accent"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-1/2 p-2 border rounded outline-none focus:border-accent"
                            />
                        </div>

                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            required
                            value={formData.addressLine1}
                            onChange={handleChange}
                            className="w-full p-2 border rounded outline-none focus:border-accent"
                        />

                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2 (Optional)"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            className="w-full p-2 border rounded outline-none focus:border-accent"
                        />

                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="w-1/2 p-2 border rounded outline-none focus:border-accent"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-1/2 p-2 border rounded outline-none focus:border-accent"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || cartItems.length === 0}
                            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:bg-gray-400 mt-4"
                        >
                            {loading ? "Placing Order..." : "Place Order Now"}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-2">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                        <p className="font-semibold text-gray-700">
                                            Rs. {(item.product.price * item.qty).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4 mt-6">
                        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                            <span>Total Amount:</span>
                            <span>Rs. {calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}