import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div className="w-full min-h-[calc(100vh-80px)] relative flex flex-col">
            <video src="720p.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0"/>
            <div className="absolute inset-0 bg-slate-900/40"></div>
            <div className="relative z-10 w-full flex-grow flex flex-col justify-center items-center text-center px-4 py-20">
                <div className="max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-10 md:p-14 rounded-3xl shadow-2xl">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">Welcome to <span className="text-blue-400">iComputers</span></h1>
                    <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-medium">Your one-stop shop for all your computer needs. Premium quality. Unbeatable prices.</p>
                    <Link to="/products" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-1">
                        Start Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
