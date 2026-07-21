import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import ProductCard from "../components/productCard";
import { FiSearch, FiRefreshCw } from "react-icons/fi";

export default function ProductsPage(){
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [query , setQuery] = useState("");
    const [searching , setSearching] = useState(false);

    useEffect(()=>{
        if(loading){
            api.get("/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
        }
    }, [loading]);

    function searchProducts(e){
        e.preventDefault();
        if(!query.trim()) return;
        
        setSearching(true);
        api.get("products/search/"+query).then((response) => {
            setProducts(response.data);
            setSearching(false);
        }).catch((error) => {
            console.error("Error searching products:", error);
            setSearching(false);
        });
    }

    return(
        <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center p-6 md:p-12">
            
            <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Our Products</h1>
                    <p className="text-slate-500 mt-1 text-sm">Find the best computer parts and accessories.</p>
                </div>

                <form onSubmit={searchProducts} className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-[350px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <FiSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="w-full h-[45px] pl-10 pr-4 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm" 
                            value={query} 
                            onChange={(e)=>setQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button type="submit" disabled={searching || !query.trim()} className="flex-1 sm:flex-none h-[45px] px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md transition-all font-medium flex justify-center items-center gap-2">
                            {searching ? "Searching..." : "Search"}
                        </button>
                        <button type="button" onClick={()=>{
                            setQuery("");
                            setLoading(true);
                        }} className="h-[45px] px-4 bg-white text-slate-600 border border-slate-300 rounded-xl hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm transition-all flex justify-center items-center tooltip" title="Reset Search">
                            <FiRefreshCw />
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-full max-w-7xl relative min-h-[400px]">
                { (loading || searching) && (
                    <div className="absolute inset-0 flex justify-center items-start pt-20 z-10 bg-slate-50/80 backdrop-blur-sm">
                        <LoadingScreen/>
                    </div>
                )}
                
                { !loading && products.length === 0 && !searching && (
                    <div className="w-full flex flex-col items-center justify-center py-20 text-slate-500">
                        <p className="text-xl font-medium mb-2">No products found</p>
                        <p className="text-sm">Try adjusting your search query.</p>
                    </div>
                )}

                { !loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {products.map((product)=>{
                            return (
                                <ProductCard key={product.productId} product={product} />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}