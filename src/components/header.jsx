import { BiCart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";
import { IoCartOutline, IoCubeOutline, IoHomeOutline, IoStarOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";

export default function Header(){
    const location = useLocation();
    const navItems = [
        { label: "Home",       path: "/" },
        { label: "Products",   path: "/products" },
        { label: "Reviews",    path: "/reviews" },
        { label: "Contact Us", path: "/contact-us" },
    ];

    return(
        <>
        {/* Announcement Bar — SimplyTek style */}
        <div className="w-full bg-blue-700 text-white text-xs py-2 text-center font-medium tracking-wide">
            🚚 Islandwide Delivery &nbsp;|&nbsp; 📞 Hotline: <strong>+94 77 123 4567</strong> &nbsp;|&nbsp; ✅ Genuine Agent Warranty on All Products
        </div>

        {/* Main Header */}
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-6">

                {/* Logo */}
                <Link to="/" className="shrink-0 flex items-center h-full py-2">
                    <img src="/logo.png" className="h-full max-h-12.5 object-contain" alt="ISURI COMPUTERS"/>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navItems.map(item => {
                        const active = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path}
                                className={`text-sm font-semibold transition-colors pb-0.5 ${active
                                    ? "text-blue-700 border-b-2 border-blue-700"
                                    : "text-gray-600 hover:text-blue-700"
                                }`}>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="text-gray-500 hover:text-blue-700 text-2xl transition-colors">
                        <BiCart />
                    </Link>
                    <UserData/>
                </div>
            </div>
        </header>

        {/* Mobile Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full h-15 bg-white border-t border-gray-200 flex lg:hidden justify-evenly items-center z-50 shadow-sm">
            <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-blue-700 text-xl transition-colors">
                <IoHomeOutline />
                <span className="text-[10px] mt-0.5 font-semibold">Home</span>
            </Link>
            <Link to="/products" className="flex flex-col items-center text-gray-500 hover:text-blue-700 text-xl transition-colors">
                <IoCubeOutline />
                <span className="text-[10px] mt-0.5 font-semibold">Products</span>
            </Link>
            <Link to="/reviews" className="flex flex-col items-center text-gray-500 hover:text-blue-700 text-xl transition-colors">
                <IoStarOutline />
                <span className="text-[10px] mt-0.5 font-semibold">Reviews</span>
            </Link>
            <Link to="/contact-us" className="flex flex-col items-center text-gray-500 hover:text-blue-700 text-xl transition-colors">
                <CiPhone />
                <span className="text-[10px] mt-0.5 font-semibold">Contact</span>
            </Link>
            <UserData/>
        </div>
        </>
    )
}