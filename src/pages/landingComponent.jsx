import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiPhone, FiCpu, FiMonitor, FiHardDrive } from "react-icons/fi";
import api from "../utils/api";
import ProductCard from "../components/productCard";

export default function LandingPage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(res => {
                console.log("API Response:", res.data);
                const productsData = Array.isArray(res.data) ? res.data : (res.data.products || res.data.data || []);
                setFeaturedProducts(productsData.slice(0, 4));
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setFeaturedProducts([]);
            });
    }, []);

    // Category cards – uses more relevant icons and follows brief's categories
    const categoryCards = [
        {
            title: "Laptops",
            sub: "Gaming, Office & Ultrabooks",
            cta: "Shop Now",
            icon: <FiMonitor size={28} />,
            color: "neon",
        },
        {
            title: "Gaming Gear",
            sub: "Keyboards, Mice, Headsets",
            cta: "Shop Now",
            icon: <FiCpu size={28} />,
            color: "orange",
        },
        {
            title: "Components",
            sub: "CPU, GPU, RAM, Storage",
            cta: "Shop Now",
            icon: <FiHardDrive size={28} />,
            color: "neon",
        },
        {
            title: "Accessories",
            sub: "Peripherals & More",
            cta: "Shop Now",
            icon: <FiCpu size={28} />,
            color: "orange",
        },
    ];

    return (
        <div className="w-full bg-white min-h-screen">

            {/* ======= HERO BANNER (aligned to brief) ======= */}
            <section
                className="relative w-full overflow-hidden"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                }}
            >
                {/* Dark charcoal overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#101f35]/90 to-[#132d4a]/85" />
                {/* Subtle circuit board pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04] bg-repeat"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        {/* Left content */}
                        <div className="lg:col-span-7 text-center lg:text-left">
                            {/* Trust badge inline */}
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 border border-white/20">
                                <FiShield className="mr-2 text-neon-green" size={14} />
                                Genuine · Warranty · Fast — 4.8/5
                            </div>

                            {/* Headline exactly as per brief */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                                Premium PC Parts &amp;<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-green-300 to-white">
                                    Electronics
                                </span> Online
                            </h1>

                            {/* Subheadline from brief */}
                            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mt-6 leading-relaxed">
                                Authentic laptops, processors, GPUs and accessories with genuine warranty and islandwide delivery.
                            </p>

                            {/* CTA buttons – neon green primary, outline secondary */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8">
                                <Link
                                    to="/products"
                                    className="bg-neon-green text-black font-semibold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2.5 shadow-xl shadow-neon-green/30 hover:shadow-neon-green/50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green"
                                    style={{ backgroundColor: '#39ff14' }}
                                >
                                    Shop Now <FiArrowRight />
                                </Link>
                                <Link
                                    to="/contact-us"
                                    className="border-2 border-white/40 text-white font-medium px-8 py-3.5 rounded-xl text-sm flex items-center gap-2.5 backdrop-blur-sm hover:bg-white/10 hover:border-white/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                >
                                    <FiPhone className="text-orange-400" />
                                    Contact Us
                                </Link>
                            </div>

                            {/* Trust badges row (warranty, genuine, delivery, rating) */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12 pt-8 border-t border-white/15">
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">6–36</div>
                                    <div className="text-white/60 text-xs uppercase tracking-wide">Month Warranty</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">100%</div>
                                    <div className="text-white/60 text-xs uppercase tracking-wide">Genuine Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">🚚</div>
                                    <div className="text-white/60 text-xs uppercase tracking-wide">Islandwide Delivery</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg">
                                        <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                                    </div>
                                    <div className="text-white/60 text-xs uppercase tracking-wide">4.8/5 Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right decorative */}
                        <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
                            <div className="relative w-full max-w-sm">
                                <div className="aspect-square rounded-3xl bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center p-8 shadow-2xl">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4 filter drop-shadow-lg">🖥️</div>
                                        <div className="text-white/80 text-sm font-medium">Genuine · Warranty · Fast</div>
                                        <div className="flex items-center justify-center gap-1 mt-3 text-yellow-400 text-sm">
                                            <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                                            <span className="text-white/50 text-xs ml-2">4.8/5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 border border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl">
                                        <FiShield />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-800">Trusted</div>
                                        <div className="text-[10px] text-slate-500">by 10,000+ customers</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ======= SERVICE CARDS ======= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FiCpu className="text-2xl" />,
                            color: "neon",
                            title: "Agent Warranty",
                            desc: "6–36 months on all products",
                            badge: "Genuine",
                        },
                        {
                            icon: <FiTruck className="text-2xl" />,
                            color: "orange",
                            title: "Islandwide Delivery",
                            desc: "1–3 days to your doorstep",
                            badge: "Fast",
                        },
                        {
                            icon: <FiPhone className="text-2xl" />,
                            color: "neon",
                            title: "Dedicated Support",
                            desc: "Call +94 77 123 4567",
                            link: "/contact-us",
                        },
                        {
                            icon: <FiShield className="text-2xl" />,
                            color: "orange",
                            title: "Secure Shopping",
                            desc: "SSL encrypted checkout",
                            badge: "Safe",
                        },
                    ].map((feature, idx) => {
                        const colorMap = {
                            neon: "bg-green-50 text-green-600",
                            orange: "bg-orange-50 text-orange-600",
                        };
                        const badgeColorMap = {
                            neon: "text-green-700 bg-green-50",
                            orange: "text-orange-700 bg-orange-50",
                        };
                        const linkColorMap = {
                            neon: "text-green-600",
                            orange: "text-orange-600",
                        };
                        return (
                            <div
                                key={idx}
                                className="relative bg-white rounded-2xl p-8 text-center border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-200 transition-all duration-300 group"
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl ${colorMap[feature.color]} flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 text-base mb-1">{feature.title}</h3>
                                <p className="text-slate-500 text-sm">{feature.desc}</p>
                                {feature.badge && (
                                    <div
                                        className={`inline-block mt-3 text-xs font-semibold ${badgeColorMap[feature.color]} px-3 py-1 rounded-full`}
                                    >
                                        <span className="mr-1">✓</span> {feature.badge}
                                    </div>
                                )}
                                {feature.link && (
                                    <Link
                                        to={feature.link}
                                        className={`inline-flex items-center gap-1.5 ${linkColorMap[feature.color]} font-medium text-sm mt-4 hover:gap-3 transition-all duration-300`}
                                    >
                                        Contact <FiArrowRight size={12} />
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ======= SHOP BY CATEGORY ======= */}
            <section className="bg-slate-50/50 py-20 md:py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
                        <div>
                            <span className="bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                                Categories
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Shop by Category</h2>
                            <p className="text-slate-500 text-sm mt-1 max-w-md">
                                Find exactly what you need – from laptops to components.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="border-2 border-slate-200 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 mt-4 sm:mt-0 hover:border-green-500 hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            View All <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryCards.map((card, idx) => (
                            <Link
                                key={idx}
                                to={`/products?category=${encodeURIComponent(card.title)}`}
                                className="bg-white rounded-2xl p-6 border border-slate-100 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden group flex items-center gap-5"
                            >
                                <div className={`w-14 h-14 flex-shrink-0 rounded-xl ${card.color === 'neon' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-green-700 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs">{card.sub}</p>
                                    <span className="text-green-600 text-xs font-bold mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {card.cta} <FiArrowRight size={11} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= POPULAR PRODUCTS ======= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
                    <div>
                        <span className="bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                            Best Sellers
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Popular Products</h2>
                        <p className="text-slate-500 text-sm mt-1">Handpicked best sellers with genuine ratings</p>
                    </div>
                    <Link
                        to="/products"
                        className="border-2 border-slate-200 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 mt-4 sm:mt-0 hover:border-green-500 hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        View All <FiArrowRight size={14} />
                    </Link>
                </div>

                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.productId || product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm font-medium">Loading products or no products found...</p>
                    </div>
                )}
                <div className="text-center mt-12">
                    <Link to="/products" className="bg-neon-green text-black font-semibold px-10 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-xl shadow-neon-green/30 hover:shadow-neon-green/50 hover:-translate-y-0.5 transition-all duration-300"
                        style={{ backgroundColor: '#39ff14' }}
                    >
                        Browse All Products <FiArrowRight />
                    </Link>
                </div>
            </section>

            {/* ======= REVIEW CTA BANNER ======= */}
            <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">⭐ 4.9/5 from 10,000+ Customers</h2>
                        <p className="text-slate-300 text-sm">
                            Trusted by gamers, professionals, and tech enthusiasts across Sri Lanka.
                        </p>
                    </div>
                    <Link
                        to="/reviews"
                        className="flex-shrink-0 bg-neon-green text-black font-extrabold px-8 py-3.5 rounded-xl hover:bg-green-400 transition-colors text-sm flex items-center gap-2 shadow-xl hover:-translate-y-0.5 transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green"
                        style={{ backgroundColor: '#39ff14' }}
                    >
                        Read Customer Reviews <FiArrowRight />
                    </Link>
                </div>
            </section>

        </div>
    );
}