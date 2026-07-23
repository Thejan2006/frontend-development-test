import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CiLogin } from "react-icons/ci";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("me");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            api.get("/auth/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                // FIX 1: Backend eken ena data hierarchy eka hariyatama ganna
                setUser(res.data.data.user);
            }).catch((err) => {
                console.log(err);
                setUser(null);
            });
        }
    }, []);

    return (
        <>
            {user == null ? (
                <div className="lg:flex gap-4 items-center">
                    {/* Desktop View Links */}
                    <Link to="/signin" className="hidden lg:block text-text-main font-medium hover:text-accent transition-colors">Login</Link>
                    <span className="hidden lg:block text-text-muted"> | </span>
                    <Link to="/signup" className="hidden lg:block text-text-main font-medium hover:text-accent transition-colors">Register</Link>

                    {/* Mobile View Icon */}
                    <Link to="/signin" className="h-full lg:hidden flex flex-col justify-center items-center text-text-muted hover:text-accent text-2xl transition-colors">
                        <CiLogin />
                        <span className="text-[11px] mt-0.5">Login</span>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-4">
                    
                    {/* FIX 2: profileImage ganna saha default avatar ekak danna */}
                    <img 
                        src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border-2 border-accent object-cover bg-white" 
                    />
                    
                    <select
                        className="bg-transparent text-sm font-medium text-text-main border-0 focus:ring-0 cursor-pointer hover:text-accent transition-colors outline-none"
                        value={selectedOption}
                        onChange={(e) => {
                            setSelectedOption(e.target.value);
                            if (e.target.value === "settings") {
                                navigate("/settings");
                            }
                            if (e.target.value === "my-orders") {
                                navigate("/my-orders");
                            }
                            if (e.target.value === "logout") {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user"); // User data ekath clear karanna
                                setUser(null);
                                navigate("/");
                            }
                            setSelectedOption("me");
                        }}
                    >
                        {/* FIX 3: user.firstName wenuwata user.name use karanna */}
                        <option value="me" className="bg-white text-text-main">{user.name}</option>
                        <option value="settings" className="bg-white text-text-main">Settings</option>
                        <option value="my-orders" className="bg-white text-text-main">My Orders</option>
                        <option value="logout" className="bg-white text-red-600 font-semibold">Logout</option>
                    </select>
                </div>
            )}
        </>
    )
}