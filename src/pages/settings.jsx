import { createElement, useEffect, useMemo, useState } from "react";
import { Camera, Check, Eye, EyeOff, FileText, LockKeyhole, Mail, MapPin, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import api from "../utils/api";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";
import LoadingScreen from "../components/loadingScreen";

const tabs = [
    { id: "profile", label: "Personal info", icon: UserRound },
    { id: "address", label: "Address book", icon: MapPin },
    { id: "security", label: "Security", icon: LockKeyhole },
];

const fieldClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

export default function Settings() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileError, setProfileError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setUser(res.data);
                    setFirstName(res.data.firstName || "");
                    setLastName(res.data.lastName || "");
                })
                .catch((err) => {
                    console.log(err);
                    setProfileError("We could not load your account details. Please refresh and try again.");
                    setUser(null);
                });
        } else {
            window.location.href = "/login";
        }
    }, []);

    async function handleUpdateProfile() {
        setLoading(true);
        let imageUrl = user?.image;
        try {
            if (image != null) imageUrl = await uploadMedia(image);
            const token = localStorage.getItem("token");
            await api.put("/users", { firstName, lastName, image: imageUrl }, { headers: { Authorization: `Bearer ${token}` } });
            setLoading(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error("Profile update failed");
            setLoading(false);
        }
    }

    async function handleChangePassword() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await api.post("/users/password", { password }, { headers: { Authorization: `Bearer ${token}` } });
            setLoading(false);
            toast.success("Password changed successfully");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.log(err);
            toast.error("Failed to change password");
            setLoading(false);
        }
    }

    const avatarPreview = useMemo(() => image ? URL.createObjectURL(image) : (user?.image || user?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"), [image, user]);

    if (!user && profileError) {
        return <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 p-6"><div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">{profileError}</div></div>;
    }

    return (
        <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 pb-24 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Your account</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Account Settings</h1><p className="mt-2 max-w-xl text-sm text-slate-500">Manage your profile, saved delivery details, and account security in one place.</p></div>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><img src={avatarPreview} alt="Your profile" className="h-12 w-12 rounded-xl object-cover" /><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{firstName || "Welcome back"} {lastName}</p><p className="truncate text-xs text-slate-500">{user?.email || "Account member"}</p></div><ShieldCheck className="ml-2 shrink-0 text-blue-600" size={20} /></div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
                    <nav className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" aria-label="Settings sections">
                        {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActiveTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>{createElement(Icon, { size: 18 })} {label}</button>)}
                        <div className="mx-3 mt-5 hidden border-t border-slate-100 pt-4 text-xs text-slate-400 sm:block"><p className="flex items-center gap-2"><Check size={14} className="text-emerald-500" /> Secure account</p><p className="mt-2 flex items-center gap-2"><FileText size={14} /> Changes sync instantly</p></div>
                    </nav>

                    <main className="min-w-0">
                        {activeTab === "profile" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-8 flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-950">Personal information</h2><p className="mt-1 text-sm text-slate-500">Keep your contact details up to date.</p></div><UserRound className="text-blue-600" size={22} /></div><div className="mb-8 flex items-center gap-4"><div className="relative"><img src={avatarPreview} alt="Profile preview" className="h-20 w-20 rounded-2xl border border-slate-200 object-cover" /><label className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-blue-600 text-white shadow-md transition hover:bg-blue-700"><Camera size={15} /><input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} /></label></div><div><p className="text-sm font-semibold text-slate-900">Profile picture</p><p className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP. Max 5MB.</p></div></div><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">First name<input type="text" className={`${fieldClass} mt-2`} value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label><label className="text-sm font-semibold text-slate-700">Last name<input type="text" className={`${fieldClass} mt-2`} value={lastName} onChange={(e) => setLastName(e.target.value)} /></label><label className="text-sm font-semibold text-slate-700 sm:col-span-2">Email address<div className="relative mt-2"><Mail className="absolute left-4 top-3.5 text-slate-400" size={17} /><input type="email" readOnly value={user?.email || ""} className={`${fieldClass} bg-slate-50 pl-11 text-slate-500`} /></div></label></div><div className="mt-8 flex justify-end border-t border-slate-100 pt-6"><button onClick={handleUpdateProfile} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><Save size={17} /> Save changes</button></div></section>}

                        {activeTab === "address" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-8 flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-950">Address book</h2><p className="mt-1 text-sm text-slate-500">Your saved shipping details are used at checkout.</p></div><MapPin className="text-blue-600" size={22} /></div><div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-blue-600">Default delivery address</p><p className="mt-1 text-sm font-semibold text-slate-900">Shipping details from your latest checkout</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">Primary</span></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-white bg-white/80 p-4"><p className="text-xs text-slate-500">Recipient</p><p className="mt-1 font-semibold text-slate-900">{firstName || "Add your name"} {lastName}</p></div><div className="rounded-xl border border-white bg-white/80 p-4"><p className="text-xs text-slate-500">Phone number</p><p className="mt-1 flex items-center gap-2 font-semibold text-slate-900"><Phone size={15} className="text-blue-600" /> {user?.phone || "Add during checkout"}</p></div><div className="rounded-xl border border-white bg-white/80 p-4 sm:col-span-2"><p className="text-xs text-slate-500">Address</p><p className="mt-1 font-semibold text-slate-900">{user?.address || user?.addressLine1 || "No saved address yet"}</p><p className="mt-1 text-sm text-slate-500">{user?.city || "City not added"} {user?.postalCode || user?.postal_code || ""}</p></div></div></div><p className="mt-5 text-xs text-slate-400">Address details can be updated during checkout to keep your saved profile fields unchanged.</p></section>}

                        {activeTab === "security" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-8 flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-950">Security & password</h2><p className="mt-1 text-sm text-slate-500">Use a strong password you do not reuse elsewhere.</p></div><LockKeyhole className="text-blue-600" size={22} /></div><div className="max-w-xl space-y-5"><label className="text-sm font-semibold text-slate-700">New password<div className="relative mt-2"><input type={showPassword ? "text" : "password"} className={`${fieldClass} pr-12`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a new password" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-blue-600">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><label className="text-sm font-semibold text-slate-700">Confirm new password<div className="relative mt-2"><input type={showConfirmPassword ? "text" : "password"} className={`${fieldClass} pr-12`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your new password" /><button type="button" aria-label={showConfirmPassword ? "Hide confirmation" : "Show confirmation"} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-blue-600">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label></div><div className="mt-8 flex justify-end border-t border-slate-100 pt-6"><button onClick={handleChangePassword} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><LockKeyhole size={17} /> Update password</button></div></section>}
                    </main>
                </div>
            </div>
            {loading && <LoadingScreen />}
        </div>
    );
}
