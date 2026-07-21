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
		<div className="w-full min-h-screen bg-bg text-primary">
			<Header />
			<div className="min-h-[calc(100vh-100px)] w-full pb-20 lg:pb-0">
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact-us" element={<div className="w-full h-screen flex items-center justify-center"><h1 className="text-3xl font-bold text-muted">Contact Us Coming Soon</h1></div>} />
                    <Route path="/about-us" element={<div className="w-full h-screen flex items-center justify-center"><h1 className="text-3xl font-bold text-muted">About Us Coming Soon</h1></div>} />
                    <Route path="/overview/:productId" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/my-orders" element={<MyOrders/>} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/*" element={<div className="w-full h-screen flex items-center justify-center"><h1 className="text-4xl font-bold text-primary">404 - Page Not Found</h1></div>} />
                </Routes>
			</div>
		</div>
	);
}
