import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    useEffect(()=>{
        if(loading){
            api.get("/products")
                .then(res => { setProducts(res.data); setLoading(false); })
                .catch(err => { console.error(err); setLoading(false); });
        }
    }, [loading]);

    function searchProducts(e){
        e.preventDefault();
        if(!query.trim()) return;
        setSearching(true);
        api.get("products/search/"+query)
            .then(res => { setProducts(res.data); setSearching(false); })
            .catch(err => { console.error(err); setSearching(false); });
    }

    return(
        <div className="w-full min-h-screen bg-gray-50 pb-20">

            {/* Page Header */}
            <div className="w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">
                            Shop All Products
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {!loading && `${products.length} products available`}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={searchProducts} className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiSearch size={16}/>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full h-10 pl-10 pr-4 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={searching || !query.trim()}
                            className="btn-primary h-10 px-5 py-0 flex items-center gap-2 text-sm">
                            {searching ? "Searching..." : "Search"}
                        </button>
                        <button type="button" onClick={() => { setQuery(""); setLoading(true); }}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:text-blue-700 hover:border-blue-300 transition-colors"
                            title="Reset">
                            <FiRefreshCw size={16}/>
                        </button>
                    </form>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative min-h-[400px]">
                {(loading || searching) && (
                    <div className="absolute inset-0 flex justify-center items-start pt-20 z-10 bg-gray-50/80 backdrop-blur-sm">
                        <LoadingScreen/>
                    </div>
                )}

                {!loading && products.length === 0 && !searching && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200">
                        <div className="text-4xl mb-3 text-gray-300"><FiSearch /></div>
                        <p className="text-base font-bold text-gray-700 mb-1">No products found</p>
                        <p className="text-sm">Try adjusting your search query.</p>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.productId} product={product}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}