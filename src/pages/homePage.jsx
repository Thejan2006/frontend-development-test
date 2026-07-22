import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cartPage";
import CheckoutPage from "./checkout";
import MyOrders from "./myOrders";
import Settings from "./settings";
import LandingPage from "./landingComponent";
import ContactUsPage from "./contactUsPage";
import ReviewsPage from "./reviewsPage";

export default function HomePage() {
	return (
		<div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans antialiased justify-center items-center flex flex-col">
			<Header />
			<div className="min-h-[calc(100vh-72px)] w-full pb-20 lg:pb-0">
                <Routes>
                    <Route path="/"                  element={<LandingPage/>} />
                    <Route path="/products"           element={<ProductsPage />} />
                    <Route path="/contact-us"         element={<ContactUsPage />} />
                    <Route path="/reviews"            element={<ReviewsPage />} />
                    <Route path="/about-us"           element={<ContactUsPage />} />
                    <Route path="/overview/:productId" element={<ProductOverview />} />
                    <Route path="/cart"               element={<CartPage />} />
                    <Route path="/checkout"           element={<CheckoutPage />} />
                    <Route path="/my-orders"          element={<MyOrders/>} />
                    <Route path="/settings"           element={<Settings/>} />
                    <Route path="/*" element={
                        <div className="w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center">
                            <h1 className="text-7xl font-black text-slate-900 mb-3">404</h1>
                            <p className="text-slate-500 font-semibold tracking-widest uppercase mb-6">Page Not Found</p>
                            <a href="/" className="btn-primary px-6 py-3 text-sm">Back to Home</a>
                        </div>
                    }/>
                </Routes>
			</div>
		</div>
	);
}
