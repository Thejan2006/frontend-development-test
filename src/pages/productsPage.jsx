import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
import { FiSearch } from "react-icons/fi";
import { LayoutGrid, List, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { extractProductList, getApiErrorMessage } from "../utils/api-response";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [viewMode, setViewMode] = useState("grid");

    const categories = useMemo(() => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
    const visibleProducts = useMemo(() => {
        const filtered = products.filter((product) => categoryFilter === "All" || product.category === categoryFilter);
        return [...filtered].sort((a, b) => {
            if (sortBy === "price-low") return Number(a.price || 0) - Number(b.price || 0);
            if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
            if (sortBy === "name") return String(a.name || "").localeCompare(String(b.name || ""));
            return 0;
        });
    }, [products, categoryFilter, sortBy]);

    async function fetchProducts() {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/products");
            setProducts(extractProductList(response.data));
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
            setError(getApiErrorMessage(error, "Unable to load products right now."));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function searchProducts() {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            fetchProducts();
            return;
        }

        setSearching(true);
        setError("");

        try {
            const response = await api.get(`/products/search/${encodeURIComponent(trimmedQuery)}`);
            setProducts(extractProductList(response.data));
        } catch (error) {
            console.error("Error searching products:", error);
            setProducts([]);
            setError(getApiErrorMessage(error, "Unable to search products right now."));
        } finally {
            setSearching(false);
        }
    }

    return (
        <div className="w-full min-h-full bg-slate-50 px-4 py-6 sm:px-6 md:px-10 md:py-10">
            {(loading || searching) && <LoadingScreen />}

            <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-blue-600"><Sparkles size={14} /> Curated hardware</p><h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Build your next setup.</h1><p className="mt-2 max-w-xl text-sm text-slate-500">Performance-first components, carefully selected for gamers, creators, and serious builders.</p></div><div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-right"><p className="text-2xl font-black text-blue-700">{products.length}</p><p className="text-xs font-semibold text-blue-600">products available</p></div></div>
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchProducts()}
                    />
                </div>
                <button
                    onClick={searchProducts}
                    disabled={searching}
                    className="h-12 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60"
                >
                    {searching ? "Searching..." : "Search"}
                </button>
                <button
                    onClick={() => {
                        setQuery("");
                        fetchProducts();
                    }}
                    className="h-12 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                    All
                </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3"><span className="mr-1 flex items-center gap-1 text-xs font-bold text-slate-400"><SlidersHorizontal size={14} /> Filter</span>{categories.map((category) => <button key={category} onClick={() => setCategoryFilter(category)} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${categoryFilter === category ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-700"}`}>{category}</button>)}<select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20"><option value="featured">Sort: Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="name">Name</option></select><div className="hidden items-center gap-1 rounded-lg border border-slate-200 p-1 sm:flex"><button aria-label="Grid view" onClick={() => setViewMode("grid")} className={`rounded-md p-1.5 ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}><LayoutGrid size={15} /></button><button aria-label="List view" onClick={() => setViewMode("list")} className={`rounded-md p-1.5 ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400"}`}><List size={15} /></button></div></div>
            </div>

            <div className="w-full">
                {error && !loading && !searching && (
                    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-red-100">
                        <p className="font-semibold">Products could not be loaded.</p>
                        <p className="mt-1 text-sm text-red-100/80">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !searching && !error && visibleProducts.length > 0 && (
                    <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5" : "grid gap-4 lg:grid-cols-2"}>
                        {visibleProducts.map((product, index) => (
                            <div key={product.productId || product._id} className="animate-[fade-in-up_500ms_ease_both]" style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}>
                            <ProductCard key={product.productId || product._id} product={product} />
                            </div>
                        ))}
                    </div>
                )}
                {!loading && !searching && !error && visibleProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"><div className="mb-4 rounded-2xl bg-blue-50 p-4 text-blue-600"><X size={28} /></div><p className="text-lg font-bold text-slate-900">No products match your filters.</p><p className="mt-2 text-sm text-slate-500">Try another category or clear your search.</p><button onClick={() => { setCategoryFilter("All"); setSortBy("featured"); setQuery(""); fetchProducts(); }} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">Clear filters</button>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}
