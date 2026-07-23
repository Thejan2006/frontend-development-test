import { useState } from "react";
import toast from "react-hot-toast";
import { BiKey } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
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

    // 'e' kiyana event parameter eka aniwaryen danna
async function handleLogin(e) {
    // 1. Page eka reload wena eka nawaththanna meka aniwaryai
    if (e) e.preventDefault(); 
    
    setLoading(true);
    try {
        const res = await api.post("/auth/login", {
            email: email,
            password: password,
        });

        // Backend response eke data athule thiyena user saha token ganna
        const token = res.data.data.token;
        const user = res.data.data.user;

        // 2. Token ekai user data ekai hariyatama save karanna
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // 3. Admin da kiyala hariyatama check karanna (oyage db eke thiyena widiyata)
        if (user.role === "admin" || user.isAdmin === "true" || user.isAdmin === true) {
            navigate("/admin");
        } else {
            navigate("/");
        }

    } catch (err) {
        toast.error(err?.response?.data?.message || "Login failed");
    } finally {
        setLoading(false);
    }
  }

    return (
        <div className="w-full h-full min-h-screen relative flex justify-center items-center overflow-hidden bg-[url(https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
            <img src="/auth-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-slate-950/50 " />

            <div className="relative w-100 max-w-[90vw] backdrop-blur-xl bg-white/15 border border-white/25 rounded-2xl shadow-2xl flex flex-col p-8">
                <img src="/logo-white.png" alt="Isuri Computers" className="h-10 w-auto mx-auto mb-6" />
                <h1 className="w-full text-center text-2xl font-bold text-white mb-6">Welcome back</h1>

                <div className="w-full">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5 back ">
                        <MdEmail /> Email
                    </label>
                    <input
                        className="w-full h-11 rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300  transition-colors backdrop-blur-3xl"
                        type="email"
                        placeholder="kasun@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
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

                <p className="w-full text-right text-xs mt-2">
                    <Link to="/forget-password" className="text-sky-200 hover:underline">Forgot your password?</Link>
                </p>

                <button
                    disabled={loading}
                    className="w-full h-[46px] bg-isuri-gradient mt-6 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg"
                    onClick={handleLogin}
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                <p className="w-full text-center text-xs mt-4 text-white/70">
                    Don't have an account? <Link to="/signup" className="font-semibold text-sky-200 hover:underline">Sign up</Link>
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
