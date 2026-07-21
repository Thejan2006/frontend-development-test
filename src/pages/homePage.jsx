import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";
import CheckoutPage from "./checkout";
import MyOrders from "./myOrders";
import Settings from "./settings";
import LandingPage from "./landingComponent";

export default function HomePage() {
	return (
		<div className="w-full min-h-screen bg-slate-50 text-slate-900">
			<Header />
			<div className="min-h-[calc(100vh-80px)] w-full pb-20 lg:pb-0">
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact-us" element={<div className="w-full h-[calc(100vh-80px)] flex items-center justify-center"><h1 className="text-3xl font-bold text-slate-400">Contact Us Coming Soon</h1></div>} />
                    <Route path="/about-us" element={<div className="w-full h-[calc(100vh-80px)] flex items-center justify-center"><h1 className="text-3xl font-bold text-slate-400">About Us Coming Soon</h1></div>} />
                    <Route path="/overview/:productId" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/my-orders" element={<MyOrders/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/*" element={<div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center"><h1 className="text-5xl font-bold text-slate-900 mb-4">404</h1><p className="text-slate-500">Page Not Found</p></div>} />
                </Routes>
			</div>
		</div>
	);
}
