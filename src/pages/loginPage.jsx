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

            toast.error(  err?.response?.data?.message || "Login failed" )

        }
        setLoading(false)
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex justify-center items-center p-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col p-8 border border-slate-200">

                <h1 className="w-full text-center text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-center text-gray-500 text-sm mb-8">Sign in to your account</p>

                <div className="w-full mb-5">
                    <label className="text-slate-900 text-sm font-semibold flex items-center gap-2 mb-2"><MdEmail size={18}/> Email</label>
                    <input 
                        className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                        type="email" 
                        placeholder="you@example.com" 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                    />
                </div>

                <div className="w-full mb-2">
                    <label className="text-slate-900 text-sm font-semibold flex items-center gap-2 mb-2"><BiKey size={18}/> Password</label>
                    <input
                        onChange={(e)=>{setPassword(e.target.value)}}                       
                        type="password"
                        value={password}
                        className="w-full h-[45px] rounded-lg px-4 border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" 
                        placeholder="••••••••••"
                    />
                </div>

                <div className="text-right mb-6">
                    <Link to="/forget-password" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition">Forgot password?</Link>
                </div>

                <button 
                    disabled={loading} 
                    className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                    onClick={handleLogin}
                >
                    {loading ? "Signing in..." : "Sign In"}
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
                    <BsGoogle size={18}/> Continue with Google
                </button>

                <p className="w-full text-center text-gray-500 text-sm mt-6">
                    Don't have an account? <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition">Sign up</Link>
                </p>
            </div>
        </div>
    )
}