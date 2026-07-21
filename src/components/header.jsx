import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { IoCartOutline, IoCubeOutline, IoHomeOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";

export default function Header(){
    return(
        <>
        <header className="w-full h-[100px] bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg flex justify-center lg:justify-between p-6">
            <Link to="/" className="flex items-center">
                <img src="/logo-white.png" className="h-full " alt="iComputers Logo"/>
            </Link>
            <div className=" h-full hidden lg:flex justify-center items-center gap-8">
                <Link to="/" className="nav-item text-base font-medium">Home</Link>
                <Link to="/products" className="nav-item text-base font-medium">Products</Link>
                <Link to="/contact-us" className="nav-item text-base font-medium">Contact Us</Link>
            </div>
            <div className="justify-center items-center gap-6 hidden lg:flex">
                <Link to="/cart" className="nav-item text-2xl hover:scale-110 transition-transform">
                    <BiCart />
                </Link>
                <UserData/>
            </div>
        </header>

        <div className="fixed bottom-0 left-0 w-full h-[80px] bg-white shadow-2xl flex lg:hidden justify-evenly items-center z-50 border-t border-slate-200">
            <Link to="/" className="h-full flex flex-col justify-center items-center text-blue-600 hover:text-blue-700 text-3xl transition-colors">
                <IoHomeOutline />
                <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/products" className="h-full flex flex-col justify-center items-center text-blue-600 hover:text-blue-700 text-3xl transition-colors">
                <IoCubeOutline />
                <span className="text-xs mt-1">Products</span>
            </Link>
            <Link to="/contact-us" className="h-full flex flex-col justify-center items-center text-blue-600 hover:text-blue-700 text-3xl transition-colors">
                <CiPhone />
                <span className="text-xs mt-1">Contact</span>
            </Link>
            <UserData/>
        </div>

        </>
    )
}