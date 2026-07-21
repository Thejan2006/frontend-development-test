import { useState } from "react";
import toast from "react-hot-toast";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage(){
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
        {
            onSuccess : (response)=>{

                console.log(response);

                api.post("/users/google-login",{
                    accessToken : response.access_token
                }).then((res)=>{

                    console.log(res);
                    localStorage.setItem("token" , res.data.token)
                    if(res.data.isAdmin){
                        navigate("/admin")
                    }else{
                        navigate("/")
                    }

                }).catch((err)=>{
                    console.log(err);
                })
            },
            onError : (err)=>{
                console.log(err);
            }
        }
    )

    

    async function handleRegister(){
        
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }

        setLoading(true)

        try{
            await api.post("/users/",{
                email : email,
                password : password,
                firstName : firstName,
                lastName : lastName
            })

            navigate("/signin")

        }catch(err){

            toast.error(  err?.response?.data?.message || "Registration failed" )

        }
        setLoading(false)
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex justify-center items-center p-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col p-8 border border-slate-200">

                <h1 className="w-full text-center text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                <p className="text-center text-gray-500 text-sm mb-8">Join us and start shopping</p>

                <div className="w-full mb-4">
                    <label className="text-slate-900 text-sm font-semibold flex items-center gap-2 mb-2"><MdEmail size={18}/> Email</label>
                    <input 
                        className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                        type="email" 
                        placeholder="you@example.com" 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                    />
                </div>

                <div className="w-full mb-4 flex gap-3">
                    <div className="flex-1">
                        <label className="text-slate-900 text-sm font-semibold mb-2 block">First Name</label>
                        <input 
                            className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                            type="text" 
                            placeholder="John"
                            onChange={(e)=>{setFirstName(e.target.value)}}
                            value={firstName}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-slate-900 text-sm font-semibold mb-2 block">Last Name</label>
                        <input 
                            className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                            type="text" 
                            placeholder="Doe"
                            onChange={(e)=>{setLastName(e.target.value)}}
                            value={lastName}
                        />
                    </div>
                </div>

                <div className="w-full mb-4">
                    <label className="text-slate-900 text-sm font-semibold flex items-center gap-2 mb-2"><BiKey size={18}/> Password</label>
                    <input
                        onChange={(e)=>{setPassword(e.target.value)}}                       
                        type="password"
                        value={password}
                        className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                        placeholder="••••••••••"
                    />
                </div>

                <div className="w-full mb-6">
                    <label className="text-slate-900 text-sm font-semibold flex items-center gap-2 mb-2"><BiKey size={18}/> Confirm Password</label>
                    <input
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}                       
                        type="password"
                        value={confirmPassword}
                        className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                        placeholder="••••••••••"
                    />
                </div>

                <button 
                    disabled={loading} 
                    className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                    onClick={handleRegister}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <button 
                    onClick={googleLogin} 
                    className="w-full h-[48px] bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold flex justify-center items-center gap-2 transition-all"
                >
                    <BsGoogle size={18}/> Sign Up with Google
                </button>

                <p className="w-full text-center text-gray-500 text-sm mt-6">
                    Already have an account? <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-700 transition">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

//181800 secondary
//f4f4f4 primary
//001a84 accent