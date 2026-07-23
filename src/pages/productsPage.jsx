import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
import { FiSearch } from "react-icons/fi";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (loading) {
            api.get("/products")
                .then((response) => {
                    // FIX 1: Array eka hariyatama ganna .data.data damma
                    setProducts(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
        }
    }, [loading]);

    function searchProducts() {
        setSearching(true);
        api.get("products/search/" + query).then((response) => {
            // FIX 2: Methanath .data.data damma
            setProducts(response.data.data);
            setSearching(false);
        }).catch((error) => {
            console.error("Error searching products:", error);
            setSearching(false);
        });
    }

    return (
        <div className="w-full min-h-full bg-primary flex flex-col items-center p-6 md:p-10">
            {loading && <LoadingScreen />}
            {searching && <LoadingScreen />}

            <div className="w-full max-w-2xl flex items-center gap-3 mb-10">
                <div className="flex-1 relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full h-[44px] rounded-lg pl-10 pr-3 bg-secondary border border-white/10 text-text-main placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchProducts()}
                    />
                </div>
                <button
                    onClick={searchProducts}
                    disabled={searching}
                    className="h-[44px] px-5 bg-isuri-gradient text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    {searching ? "Searching..." : "Search"}
                </button>
                <button
                    onClick={() => {
                        setQuery("");
                        setLoading(true);
                    }}
                    className="h-[44px] px-5 bg-white/5 border border-white/10 text-text-muted text-sm font-semibold rounded-lg hover:border-accent/40 hover:text-accent transition-colors"
                >
                    All
                </button>
            </div>

            <div className="w-full max-w-7xl">
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                )}
                {!loading && products.length === 0 && (
                    <div className="w-full flex justify-center items-center">
                        <p className="text-text-muted text-sm py-10">No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}