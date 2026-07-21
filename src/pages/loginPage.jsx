import { useState } from "react";
import toast from "react-hot-toast";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
        {
            onSuccess : (response)=>{
                api.post("/users/google-login",{
                    accessToken : response.access_token
                }).then((res)=>{
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

    async function handleLogin(){
        setLoading(true)
        try{
            const res = await api.post("/users/login",{
                email : email,
                password : password
            })
            localStorage.setItem("token" , res.data.token)
            if(res.data.isAdmin){
                navigate("/admin")
            }else{
                navigate("/")
            }
        }catch(err){
            toast.error(err?.response?.data?.message || "Login failed")
        }
        setLoading(false)
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 flex justify-center items-center p-6">
            <div className="w-full max-w-md bg-white shadow-sm rounded-2xl border border-slate-200 p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500 text-sm">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-slate-700 text-sm font-semibold flex items-center gap-2 mb-2"><MdEmail size={18} className="text-slate-400"/> Email</label>
                        <input 
                            className="w-full h-11 px-4" 
                            type="email" 
                            placeholder="you@example.com" 
                            onChange={(e)=>{setEmail(e.target.value)}} 
                            value={email}
                        />
                    </div>

                    <div>
                        <label className="text-slate-700 text-sm font-semibold flex items-center gap-2 mb-2"><BiKey size={18} className="text-slate-400"/> Password</label>
                        <input
                            onChange={(e)=>{setPassword(e.target.value)}}                       
                            type="password"
                            value={password}
                            className="w-full h-11 px-4" 
                            placeholder="••••••••••"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-2 mb-6">
                    <Link to="/forget-password" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">Forgot password?</Link>
                </div>

                <button 
                    disabled={loading} 
                    className="btn-primary w-full h-12 flex items-center justify-center" 
                    onClick={handleLogin}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-slate-200"></div>
                    <span className="text-slate-400 text-sm font-medium">OR</span>
                    <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <button 
                    onClick={googleLogin} 
                    className="w-full h-12 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
                >
                    <BsGoogle size={18} className="text-red-500"/> Continue with Google
                </button>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Sign up</Link>
                </p>
            </div>
        </div>
    )
}