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

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            api.post("/users/google-login", { accessToken: response.access_token })
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    navigate(res.data.isAdmin ? "/admin" : "/")
                })
                .catch((err) => console.log(err))
        },
        onError: (err) => console.log(err)
    })

    async function handleRegister(){
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        setLoading(true)
        try {
            await api.post("/users/", { email, password, firstName, lastName })
            navigate("/signin")
        } catch(err) {
            toast.error(err?.response?.data?.message || "Registration failed")
        }
        setLoading(false)
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6 py-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="ISURI COMPUTERS" className="h-16 mx-auto mb-4 object-contain"/>
                    <h1 className="text-3xl font-extrabold text-white mb-1">Create Account</h1>
                    <p className="text-slate-400 text-sm">Join ISURI COMPUTERS today</p>
                </div>

                <div className="card-glass p-8" style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 60px rgba(139,92,246,0.15)' }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                                <MdEmail className="text-purple-400"/> Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full h-11 px-4 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    className="w-full h-11 px-4 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full h-11 px-4 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                                <BiKey className="text-purple-400"/> Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••••"
                                className="w-full h-11 px-4 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                                <BiKey className="text-purple-400"/> Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••••"
                                className="w-full h-11 px-4 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all outline-none"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={handleRegister}
                        className="btn-primary w-full h-12 flex items-center justify-center text-sm mt-7"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <div className="my-5 flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">OR</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    <button
                        onClick={googleLogin}
                        className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                        <BsGoogle size={16} className="text-red-400"/> Sign Up with Google
                    </button>
                </div>

                <p className="text-center text-slate-500 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}