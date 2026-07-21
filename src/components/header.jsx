import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { IoCartOutline, IoCubeOutline, IoHomeOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";

export default function Header(){
    return(
        <>
        <header className="w-full h-[80px] bg-white border-b border-slate-200 sticky top-0 z-50 flex justify-center lg:justify-between px-6 items-center shadow-sm">
            <Link to="/" className="flex items-center h-full py-3">
                <img src="/logo.png" className="h-full object-contain" alt="iComputers Logo"/>
            </Link>
            <div className="h-full hidden lg:flex justify-center items-center gap-8">
                <Link to="/" className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors">Home</Link>
                <Link to="/products" className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors">Products</Link>
                <Link to="/contact-us" className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors">Contact Us</Link>
            </div>
            <div className="justify-center items-center gap-6 hidden lg:flex">
                <Link to="/cart" className="text-slate-700 hover:text-blue-600 text-2xl hover:scale-105 transition-all">
                    <BiCart />
                </Link>
                <UserData/>
            </div>
        </header>

        <div className="fixed bottom-0 left-0 w-full h-[70px] bg-white flex lg:hidden justify-evenly items-center z-50 border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Link to="/" className="flex flex-col justify-center items-center text-slate-500 hover:text-blue-600 text-2xl transition-colors">
                <IoHomeOutline />
                <span className="text-[10px] mt-1 font-medium">Home</span>
            </Link>
            <Link to="/products" className="flex flex-col justify-center items-center text-slate-500 hover:text-blue-600 text-2xl transition-colors">
                <IoCubeOutline />
                <span className="text-[10px] mt-1 font-medium">Products</span>
            </Link>
            <Link to="/contact-us" className="flex flex-col justify-center items-center text-slate-500 hover:text-blue-600 text-2xl transition-colors">
                <CiPhone />
                <span className="text-[10px] mt-1 font-medium">Contact</span>
            </Link>
            <UserData/>
        </div>
        </>
    )
}