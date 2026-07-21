import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CiLogin } from "react-icons/ci";

export default function UserData() {

    const [user, setUser] = useState(null);

    const [selectedOption, setSelectedOption] = useState("me");

    const navigate = useNavigate();

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");

            if(token != null){

                api.get("/users/me" , {
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                }).then((res)=>{
                    setUser(res.data);
                }).catch((err)=>{
                    console.log(err);
                    setUser(null);
                });

            }
        }
        ,[]
    )

    return(
        <>
        {
            user == null?<div className="lg:flex gap-4">
                <Link to="/signin" className="text-white hidden lg:block hover:text-gray-200 transition-colors">Login</Link>
                <span className="text-white hidden lg:block text-gray-300"> | </span>
                <Link to="/signup" className="text-white hidden lg:block hover:text-gray-200 transition-colors">Register</Link>               
                <Link to="/signin" className="h-full lg:hidden flex flex-col justify-center items-center text-accent hover:text-accent-dark text-3xl transition-colors">
                    <CiLogin />
                    <span className="text-xs mt-1">Login</span>
                </Link>
            </div>:
            <div className="text-white flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-4">
                {user.image && <img src={user.image} className="w-8 h-8 rounded-full border-2 border-white"/>}
                <select 
                    className="bg-transparent text-sm text-accent lg:text-white text-center border-0 focus:ring-0 cursor-pointer hover:text-gray-200 transition-colors" 
                    value={selectedOption} 
                    onChange={(e)=>{
                        setSelectedOption(e.target.value);
                        if(e.target.value === "settings"){
                            navigate("/settings");
                        }
                        if(e.target.value === "my-orders"){
                            navigate("/my-orders");
                        }
                        if(e.target.value === "logout"){
                            localStorage.removeItem("token");
                            setUser(null);
                            navigate("/");
                        }
                        setSelectedOption("me");
                    }}
                >
                    <option value="me" className="bg-primary text-white">{user.firstName}</option>
                    <option className="bg-accent text-white" value="settings">Settings</option>
                    <option className="bg-accent text-white" value="my-orders">My Orders</option>
                    <option className="bg-accent text-white" value="logout">Logout</option>
                </select>
            </div>
        }
        </>
    )
}