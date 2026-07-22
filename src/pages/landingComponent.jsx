import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiPhone, FiRefreshCw } from "react-icons/fi";
import api from "../utils/api";
import ProductCard from "../components/productCard";

export default function LandingPage(){
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(res => setFeaturedProducts((res.data || []).slice(0, 4)))
            .catch(() => {});
    }, []);

    const promoCards = [
        {
            title: "All Your Favorite PC Parts",
            sub: "CPUs, GPUs, RAM & More",
            cta: "Explore",
            img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=120&auto=format&fit=crop&q=80",
        },
        {
            title: "Laptops for Every Need",
            sub: "Gaming, Office & Ultrabooks",
            cta: "Explore",
            img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=120&auto=format&fit=crop&q=80",
        },
        {
            title: "Accessories & Peripherals",
            sub: "Keyboards, Mice, Headsets",
            cta: "Explore",
            img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=120&auto=format&fit=crop&q=80",
        },
    ];

    return(
        <div className="w-full bg-white min-h-screen pb-16 lg:pb-0">

            {/* ======= HERO BANNER ======= */}
            <section className="w-full bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center min-h-85 gap-6 py-8 md:py-0">

                        {/* Left Text */}
                        <div className="w-full md:w-5/12 flex flex-col justify-center">
                            <p className="text-blue-700 text-sm font-bold uppercase tracking-widest mb-3">
                                Sri Lanka's Trusted Tech Store
                            </p>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                Premium PC Parts &<br/>
                                <span className="text-blue-700">Electronics Online</span>
                            </h1>
                            <p className="text-gray-500 text-base mb-8 max-w-md">
                                Shop authentic laptops, processors, GPUs, and accessories. Genuine agent warranty on all products. Fast islandwide delivery.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <Link to="/products" className="btn-primary px-7 py-3 text-base flex items-center gap-2">
                                    Shop Now <FiArrowRight />
                                </Link>
                                <Link to="/contact-us" className="btn-secondary px-7 py-3 text-base">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="w-full md:w-7/12 flex items-center justify-end">
                            <img
                                src="/clean-hero.png"
                                alt="ISURI COMPUTERS Tech Products"
                                className="w-full max-h-85 object-contain rounded-2xl"
                                onError={(e) => { e.target.src = "/hero-banner.png"; e.target.onerror = null; }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= PROMO CATEGORY CARDS (SimplyTek style) ======= */}
            <section className="w-full bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {promoCards.map((card, i) => (
                            <Link key={i} to="/products"
                                className="card flex items-center gap-4 p-5 hover:border-blue-300 group">
                                <img src={card.img} alt={card.title}
                                    className="w-16 h-16 object-contain flex-shrink-0 rounded-lg bg-gray-50 p-1"/>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-sm leading-snug mb-0.5 group-hover:text-blue-700 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs">{card.sub}</p>
                                    <span className="text-blue-700 text-xs font-bold mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {card.cta} <FiArrowRight size={11}/>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= TRUST BADGES ======= */}
            <section className="w-full bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                            <FiShield className="text-blue-700 text-xl flex-shrink-0"/>
                            <div>
                                <span className="font-bold text-gray-800 block">6–36 Month Agent Warranty</span>
                                <span className="text-gray-400 text-xs">On all products sold</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiTruck className="text-blue-700 text-xl flex-shrink-0"/>
                            <div>
                                <span className="font-bold text-gray-800 block">Islandwide Delivery</span>
                                <span className="text-gray-400 text-xs">Fast, reliable shipping to your door</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiPhone className="text-blue-700 text-xl flex-shrink-0"/>
                            <div>
                                <span className="font-bold text-gray-800 block">Dedicated Customer Support</span>
                                <span className="text-gray-400 text-xs">Call +94 77 123 4567 for help</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= FEATURED COLLECTIONS ======= */}
            <section className="w-full py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-7">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900">Featured Collections</h2>
                            <p className="text-gray-400 text-sm mt-1">
                                We think you will love these! Shop your favourite products now.
                            </p>
                        </div>
                        <Link to="/products"
                            className="hidden sm:inline-flex items-center gap-1 text-blue-700 font-bold text-sm hover:underline">
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    {featuredProducts.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
                            {featuredProducts.map(p => (
                                <ProductCard key={p.productId} product={p}/>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link to="/products" className="btn-primary px-8 py-3">
                            Browse All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ======= REVIEW CTA BANNER ======= */}
            <section className="w-full bg-blue-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
                    <div>
                        <h2 className="text-2xl font-extrabold mb-2">⭐ 4.9/5 from 10,000+ Customers</h2>
                        <p className="text-blue-100 text-sm">Trusted by gamers, professionals, and tech enthusiasts across Sri Lanka.</p>
                    </div>
                    <Link to="/reviews"
                        className="flex-shrink-0 bg-white text-blue-700 font-extrabold px-7 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm flex items-center gap-2">
                        Read Customer Reviews <FiArrowRight />
                    </Link>
                </div>
            </section>

        </div>
    )
}
