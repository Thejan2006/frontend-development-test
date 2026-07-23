import { useState } from "react";
import toast from "react-hot-toast";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log(response);
            api.post("/users/google-login", {
                accessToken: response.access_token,
            }).then((res) => {
                console.log(res);
                localStorage.setItem("token", res.data.token);
                if (res.data.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    async function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            await api.post("/auth/register", {
                email: email,
                password: password,
                name: `${firstName} ${lastName}`
                
            });
            navigate("/signin");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed");
        }
        setLoading(false);
    }

    return (
        <div className="w-full h-full min-h-screen relative flex justify-center items-center overflow-hidden py-10 backdrop-blur-2xl bg-[url(https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <img src="/auth-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-slate-950/50" />

            <div className="relative w-[400px] max-w-[90vw] backdrop-blur-xl bg-white/15 border border-white/25 rounded-2xl shadow-2xl flex flex-col p-8">
                <img src="/logo-white.png" alt="Isuri Computers" className="h-10 w-auto mx-auto mb-6" />
                <h1 className="w-full text-center text-2xl font-bold text-white mb-6">Create your account</h1>

                <div className="w-full">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5">
                        <MdEmail /> Email
                    </label>
                    <input
                        className="w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors"
                        type="email"
                        placeholder="kasun@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="w-full mt-4 flex flex-row gap-3">
                    <div className="w-1/2">
                        <label className="text-white/80 text-sm font-medium mb-1.5 block">First Name</label>
                        <input
                            className="w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors"
                            type="text"
                            placeholder="Kasun"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="text-white/80 text-sm font-medium mb-1.5 block">Last Name</label>
                        <input
                            className="w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors"
                            type="text"
                            placeholder="Perera"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>
                </div>

                <div className="w-full mt-4">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5">
                        <BiKey /> Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        className="w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors"
                        placeholder="••••••••••••"
                    />
                </div>

                <div className="w-full mt-4">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5">
                        <BiKey /> Confirm Password
                    </label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        value={confirmPassword}
                        className="w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors"
                        placeholder="••••••••••••"
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full h-[46px] bg-isuri-gradient mt-6 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg"
                    onClick={handleRegister}
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>

                <p className="w-full text-center text-xs mt-4 text-white/70">
                    Already have an account? <Link to="/signin" className="font-semibold text-sky-200 hover:underline">Sign in</Link>
                </p>

                <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-[11px] text-white/60">OR</span>
                    <div className="h-px flex-1 bg-white/20" />
                </div>

                <button
                    onClick={googleLogin}
                    className="w-full h-[46px] bg-white/90 text-slate-800 rounded-lg flex justify-center items-center gap-2 hover:bg-white transition-colors font-medium"
                >
                    <BsGoogle /> Sign In with Google
                </button>
            </div>
        </div>
    );
}
