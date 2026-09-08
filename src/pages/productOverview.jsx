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
        <div className="w-full h-auto lg:h-full pt-10 lg:pt-0 bg-primary flex flex-col items-center overflow-y-scroll pb-10">
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
                        <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-6">
                            {/* 🛠️ FIX 2: images array එකක් නැත්නම් image එක විතරක් ගන්නවා */}
                            <ProductImageSlideShow images={product.images || (product.image ? [product.image] : [])}/>
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col p-6 h-full text-text-main">
                            <span className="text-text-muted text-sm italic mb-3">{product.productId}</span>
                            
                            {/* 🛠️ FIX 3: brand/model නැත්නම් error එන්නේ නැති වෙන්න හැදුවා */}
                            {(product.brand || product.model) && (
                                <p className="text-text-muted text-sm italic mb-3">
                                    {(product.brand || "") + " " + (product.model || "")}
                                </p>
                            )}
                            
                            <h1 className="text-3xl font-semibold mb-4">{product.name}
                                {/* 🛠️ FIX 4: altNames තියෙනවා නම් විතරක් map කරනවා */}
                                {
                                    product.altNames && product.altNames.length > 0 && product.altNames.map(
                                        (altName, index) => {
                                            return (
                                                <span key={index} className="text-text-muted"> | {altName}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            {
                                product.price < product.labelledPrice && <p className="text-text-muted text-lg line-through mb-1">{getFormattedPrice(product.labelledPrice)}</p>
                            }
                            <p className="text-2xl text-accent font-bold">{getFormattedPrice(product.price)}</p>
                            <p className="text-text-muted mt-5 leading-relaxed">{product.description}</p>
                            <div className="flex gap-4 flex-wrap">
                                <button className="w-[220px] p-2.5 text-white bg-isuri-gradient rounded-lg hover:opacity-90 transition-opacity mt-6 font-semibold"
                                onClick={
                                    ()=>{
                                        addToCart(product , 1)
                                        toast.success("Product added to cart")
                                    }
                                }>Add to Cart</button>
                                <Link className="w-[220px] p-2.5 text-text-main bg-white/5 border border-slate-300 rounded-lg hover:border-accent/40 mt-6 text-center transition-colors font-semibold"
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
                                >Buy Now</Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* REVIEWS PANEL EKA */}
                    <div className="w-full px-6 lg:px-10 mt-10">
                        <ReviewsPanel productId={product.productId} />
                    </div>
                </div>
                )
            }
        </div>
    )
}
