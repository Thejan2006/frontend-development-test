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
        <div className="w-full min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex justify-center items-center p-4">

            <div className="w-full max-w-md bg-surface shadow-2xl rounded-2xl flex flex-col p-8 border border-border">

                <h1 className="w-full text-center text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                <p className="text-center text-muted text-sm mb-8">Sign in to your account</p>

                <div className="w-full mb-5">
                    <label className="text-primary text-sm font-semibold flex items-center gap-2 mb-2"><MdEmail size={18}/> Email</label>
                    <input 
                        className="w-full h-[45px] rounded-lg px-4 border border-border bg-bg text-primary focus:ring-2 focus:ring-accent focus:border-transparent transition" 
                        type="email" 
                        placeholder="you@example.com" 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                    />
                </div>

                <div className="w-full mb-2">
                    <label className="text-primary text-sm font-semibold flex items-center gap-2 mb-2"><BiKey size={18}/> Password</label>
                    <input
                        onChange={(e)=>{setPassword(e.target.value)}}                       
                        type="password"
                        value={password}
                        className="w-full h-[45px] rounded-lg px-4 border border-border bg-bg text-primary focus:ring-2 focus:ring-accent focus:border-transparent transition" 
                        placeholder="••••••••••"
                    />
                </div>

                <div className="text-right mb-6">
                    <Link to="/forget-password" className="text-accent hover:text-accent-dark text-sm font-medium transition">Forgot password?</Link>
                </div>

                <button 
                    disabled={loading} 
                    className="w-full h-[48px] bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                    onClick={handleLogin}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="my-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-muted text-sm">or</span>
                    <div className="flex-1 h-px bg-border"></div>
                </div>

                <button 
                    onClick={googleLogin} 
                    className="w-full h-[48px] bg-secondary hover:bg-primary text-white rounded-lg font-semibold flex justify-center items-center gap-2 transition-all"
                >
                    <BsGoogle size={18}/> Continue with Google
                </button>

                <p className="w-full text-center text-muted text-sm mt-6">
                    Don't have an account? <Link to="/signup" className="font-semibold text-accent hover:text-accent-dark transition">Sign up</Link>
                </p>
            </div>
        </div>
    )
}