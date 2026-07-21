export default function LandingPage(){
    return(
        <div className="w-full min-h-[calc(100vh-100px)] relative flex flex-col">
            <video src="720p.mp4" autoPlay muted loop className="w-full h-full object-cover absolute inset-0"/>
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Welcome to iComputers</h1>
                    <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md">Your one-stop shop for all your computer needs. Premium quality. Unbeatable prices.</p>
                    <a href="/products" className="btn-primary inline-block bg-gradient-to-r from-accent to-accent-dark text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                        Start Shopping
                    </a>
                </div>
            </div>
        </div>
    )
}
