import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function sendOTP() {
        setLoading(true);
        api.post("/users/otp", { email: email }).then((res) => {
            console.log(res);
            setLoading(false);
            toast.success("OTP sent to your email");
            setOtpSent(true);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "Login failed");
            setLoading(false);
        });
    }

    function verifyOTP() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        api.post("/users/verify-otp", { email: email, otp: otp, password: newPassword }).then(() => {
            toast.success("Password changed successfully");
            navigate("/signin");
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message || "OTP verification failed");
            setLoading(false);
        });
    }

    const inputClass =
        "w-full h-[44px] rounded-lg px-3 bg-white/10 border border-white/25 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-300 backdrop-blur-sm transition-colors disabled:opacity-50";

    return (
        <div className="w-full h-full min-h-screen relative flex justify-center items-center overflow-hidden">
            <img src="/auth-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-slate-950/50" />
            {loading && <LoadingScreen />}

            <div className="relative w-[400px] max-w-[90vw] backdrop-blur-xl bg-white/15 border border-white/25 rounded-2xl shadow-2xl flex flex-col p-8">
                <img src="/logo.png" alt="Isuri Computers" className="h-10 w-auto mx-auto mb-6" />

                {otpSent ? (
                    <>
                        <h1 className="w-full text-center text-2xl font-bold text-white mb-6">Reset Password</h1>
                        <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5"><MdEmail /> Email</label>
                        <input value={email} disabled type="email" className={inputClass + " mb-4"} />
                        <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5"><BiKey /> OTP Code</label>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP" className={inputClass + " mb-4"} />
                        <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5"><BiKey /> New Password</label>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="••••••••••••" className={inputClass + " mb-4"} />
                        <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5"><BiKey /> Confirm New Password</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••••••" className={inputClass} />
                        <button disabled={loading} onClick={verifyOTP} className="w-full h-[46px] bg-isuri-gradient mt-6 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60">
                            Reset Password
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="w-full text-center text-2xl font-bold text-white mb-6">Forgot Password</h1>
                        <label className="text-white/80 text-sm font-medium flex items-center gap-2 mb-1.5"><MdEmail /> Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="kasun@gmail.com" className={inputClass} />
                        <button disabled={loading} onClick={sendOTP} className="w-full h-[46px] bg-isuri-gradient mt-6 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60">
                            Send OTP
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
