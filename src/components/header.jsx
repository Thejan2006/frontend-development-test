import { Link } from "react-router-dom";
import UserData from "./userData";
import { IoCartOutline, IoCubeOutline, IoHomeOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { BiCart } from "react-icons/bi";

export default function Header() {
    return (
        <>
            <header className="w-full h-[100px] bg-secondary border-b border-white/5 flex justify-center lg:justify-between items-center px-6">
                <Link to="/" className="flex items-center h-full">
                    <img src="/logo.png" className="h-10" alt="Isuri Computers" />
                </Link>

                <div className="h-full hidden lg:flex justify-center items-center gap-8 text-sm font-medium">
                    <Link to="/" className="h-full flex items-center text-text-muted hover:text-accent transition-colors">Home</Link>
                    <Link to="/products" className="h-full flex items-center text-text-muted hover:text-accent transition-colors">Products</Link>
                    <Link to="/contact-us" className="h-full flex items-center text-text-muted hover:text-accent transition-colors">Contact Us</Link>
                </div>

                <div className="justify-center items-center gap-5 hidden lg:flex">
                    <Link to="/cart" className="flex items-center text-text-muted hover:text-accent transition-colors">
                        <BiCart size={22} />
                    </Link>
                    <UserData />
                </div>
            </header>

            {/* mobile bottom tab bar */}
            <div className="fixed bottom-0 left-0 w-full h-[80px] bg-secondary border-t border-white/5 shadow-2xl flex lg:hidden justify-evenly items-center z-50">
                <Link to="/" className="h-full flex flex-col justify-center items-center text-text-muted text-2xl hover:text-accent transition-colors">
                    <IoHomeOutline />
                    <span className="text-[11px] mt-0.5">Home</span>
                </Link>
                <Link to="/products" className="h-full flex flex-col justify-center items-center text-text-muted text-2xl hover:text-accent transition-colors">
                    <IoCubeOutline />
                    <span className="text-[11px] mt-0.5">Products</span>
                </Link>
                <Link to="/cart" className="h-full flex flex-col justify-center items-center text-text-muted text-2xl hover:text-accent transition-colors">
                    <IoCartOutline />
                    <span className="text-[11px] mt-0.5">Cart</span>
                </Link>
                <Link to="/contact-us" className="h-full flex flex-col justify-center items-center text-text-muted text-2xl hover:text-accent transition-colors">
                    <CiPhone />
                    <span className="text-[11px] mt-0.5">Contact</span>
                </Link>
                <UserData />
            </div>
        </>
    );
}
