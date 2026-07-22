import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../utils/api"
import LoadingScreen from "../components/loadingScreen"
import ProductImageSlideShow from "../components/productImageSlideShow"
import getFormattedPrice from "../utils/price-formatter"
import { addToCart } from "../utils/cart"
import toast from "react-hot-toast"
import { FaShieldAlt, FaTruck, FaCheckCircle, FaStar } from "react-icons/fa"

export default function ProductOverview(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState(null)

    useEffect(()=>{
        if(parameters.productId==null){
            navigate("/products")
        }
        api.get("/products/"+parameters.productId).then((response)=>{
            setProduct(response.data)
        }).catch((error)=>{
            console.error("Error fetching product details:", error)
            navigate("/products")
        })

    }, [navigate, parameters.productId])

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            {
                product == null && <LoadingScreen/>
            }
            {
                product != null && (
                    <div className="max-w-6xl w-full bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-10">
                        {/* Left: Image Slideshow */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <ProductImageSlideShow images={product.images} product={product}/>
                        </div>

                        {/* Right: Product Meta & Buying Actions */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.brand || "ISURI Tech"}
                                    </span>
                                    <span className="text-slate-400 text-xs font-semibold">SKU: {product.productId}</span>
                                </div>

                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-snug">
                                    {product.name}
                                    {product.altNames && product.altNames.length > 0 && (
                                        <span className="text-slate-400 font-normal text-lg block md:inline md:ml-2">
                                            ({product.altNames.join(" / ")})
                                        </span>
                                    )}
                                </h1>

                                <div className="flex items-center gap-2 text-amber-400 text-sm mb-6">
                                    <div className="flex"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                                    <span className="text-slate-500 font-semibold text-xs">(4.9 from 48 reviews)</span>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                                    {product.price < product.labelledPrice && (
                                        <p className="text-slate-400 text-sm line-through font-semibold mb-1">
                                            Original Price: {getFormattedPrice(product.labelledPrice)}
                                        </p>
                                    )}
                                    <p className="text-3xl font-black text-purple-600">
                                        {getFormattedPrice(product.price)}
                                    </p>
                                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                                        <FaCheckCircle /> In Stock - Islandwide Express Delivery Available
                                    </span>
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {product.description || "High performance genuine computer hardware with official brand warranty. Tested for top stability and speed."}
                                </p>
                            </div>

                            {/* Trust Perks */}
                            <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-600">
                                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                                    <FaShieldAlt className="text-purple-600 text-base" /> 2-3 Years Agent Warranty
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                                    <FaTruck className="text-blue-600 text-base" /> 24-48 Hours Delivery
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                                <button 
                                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-center" 
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Product added to cart!");
                                    }}
                                >
                                    Add to Cart
                                </button>

                                <Link 
                                    to="/checkout"
                                    state={[{
                                        product: {
                                            productId: product.productId,
                                            name: product.name,
                                            image: product.images ? product.images[0] : null,
                                            price: product.price,
                                            labelledPrice: product.labelledPrice
                                        },
                                        qty: 1
                                    }]}
                                    className="flex-1 py-3.5 px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-center"
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}