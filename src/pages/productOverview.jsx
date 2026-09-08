import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import LoadingScreen from "../components/loadingScreen"
import ProductImageSlideShow from "../components/productImageSlideShow"
import getFormattedPrice from "../utils/price-formatter"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"
import ReviewsPanel from "../components/ReviewsPanel" 
import { extractProduct, getApiErrorMessage } from "../utils/api-response"
import { ArrowLeft, BadgeCheck, Heart, ShieldCheck, ShoppingCart, Truck, Zap } from "lucide-react"

export default function ProductOverview(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(()=>{
        if(parameters.productId==null){
            navigate("/products")
            return
        }

        let cancelled = false

        async function fetchProduct(){
            setLoading(true)
            setError("")

            try{
                const response = await api.get("/products/"+parameters.productId)
                const fetchedProduct = extractProduct(response.data)
                if (!fetchedProduct) {
                    throw new Error("Product data was not returned by the API.")
                }
                if(!cancelled){
                    setProduct(fetchedProduct)
                }
            }catch(error){
                console.error("Error fetching product details:", error)
                if(!cancelled){
                    setProduct(null)
                    setError(getApiErrorMessage(error, "Unable to load this product right now."))
                }
            }finally{
                if(!cancelled){
                    setLoading(false)
                }
            }
        }

        fetchProduct()

        return () => {
            cancelled = true
        }

    }, [parameters.productId, navigate, reloadKey])


    return (
        <div className="min-h-[calc(100vh-72px)] w-full overflow-y-auto bg-slate-50 pb-20">
            {
                loading && <LoadingScreen/>
            }
            {
                !loading && error && (
                    <div className="w-full max-w-2xl mx-auto mt-20 rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-white">
                        <h1 className="text-2xl font-semibold">Product unavailable</h1>
                        <p className="mt-3 text-sm text-white/80">{error}</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                Back to Products
                            </button>
                            <button
                                type="button"
                                onClick={() => setReloadKey((value) => value + 1)}
                                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )
            }
            {
                !loading && !error && product != null && (
                <div className="w-full max-w-7xl mx-auto flex flex-col">
                    <div className="w-full flex flex-col lg:flex-row justify-center">
                        <div className="w-full p-4 sm:p-8 lg:w-1/2 lg:p-10">
                            {/* 🛠️ FIX 2: images array එකක් නැත්නම් image එක විතරක් ගන්නවා */}
                            <ProductImageSlideShow product={product} images={product.images || (product.image ? [product.image] : [])}/>
                        </div>
                        <div className="flex w-full flex-col p-5 text-slate-900 sm:p-8 lg:w-1/2 lg:p-10">
                            <div className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-400"><button onClick={() => navigate("/products")} className="flex items-center gap-1 text-blue-600 transition hover:text-blue-800"><ArrowLeft size={14} /> Products</button><span>/</span><span>{product.category || "Hardware"}</span></div>
                            <div className="mb-4 flex flex-wrap items-center gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">{product.brand || "Isuru Computers"}</span>{product.isAvailable !== false && <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700"><BadgeCheck size={13} /> Verified stock</span>}</div>
                            
                            {/* 🛠️ FIX 3: brand/model නැත්නම් error එන්නේ නැති වෙන්න හැදුවා */}
                            {(product.brand || product.model) && (
                                <p className="mb-3 text-sm font-medium text-slate-500">
                                    {(product.brand || "") + " " + (product.model || "")}
                                </p>
                            )}
                            
                            <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{product.name}
                                {/* 🛠️ FIX 4: altNames තියෙනවා නම් විතරක් map කරනවා */}
                                {
                                    product.altNames && product.altNames.length > 0 && product.altNames.map(
                                        (altName, index) => {
                                            return (
                                                <span key={index} className="text-slate-400"> | {altName}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            {
                                product.price < product.labelledPrice && <p className="mb-1 text-lg text-slate-400 line-through">{getFormattedPrice(product.labelledPrice)}</p>
                            }
                            <p className="text-3xl font-black text-blue-700">{getFormattedPrice(product.price)}</p>
                            <div className="mt-3 flex items-center gap-2 text-sm text-amber-500"><span>★★★★★</span><span className="font-semibold text-slate-500">4.8 · Customer rated</span></div>
                            <p className="mt-6 leading-relaxed text-slate-500">{product.description || "Built for dependable performance, smooth everyday use, and the next stage of your setup."}</p>
                            <div className="mt-7 grid grid-cols-1 gap-3 border-y border-slate-200 py-5 sm:grid-cols-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><Truck size={17} className="text-blue-600" /> Islandwide delivery</div><div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><ShieldCheck size={17} className="text-blue-600" /> Genuine warranty</div><div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><Zap size={17} className="text-blue-600" /> Ready to ship</div></div>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <button className="flex min-w-[200px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 p-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:flex-none"
                                onClick={
                                    ()=>{
                                        addToCart(product , 1)
                                        toast.success("Product added to cart")
                                    }
                                }><ShoppingCart size={18} /> Add to Cart</button>
                                <Link className="flex min-w-[160px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 text-center text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:flex-none"
                                    to="/checkout"
                                   state={
                                    [
                                        {
                                            product : {
                                                productId : product.productId,
                                                name : product.name,
                                                image : product.image || (product.images ? product.images[0] : ""),
                                                price : product.price,
                                                labelledPrice : product.labelledPrice
                                            },
                                            qty : 1
                                        }
                                    ]
                                   }
                                >Buy Now</Link><button aria-label="Save product" className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"><Heart size={19} /></button>
                            </div>
                        </div>
                    </div>
                    
                    {/* REVIEWS PANEL EKA */}
                    <div className="w-full px-4 sm:px-8 lg:px-10">
                        <ReviewsPanel productId={product.productId} />
                    </div>
                </div>
                )
            }
        </div>
    )
}
