import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-formatter";
import { getProductFallbackImage, handleImageError } from "../utils/product-image-fallback";
import { FaStar } from "react-icons/fa";

export default function ProductCard(props){
    const product = props.product;

    const initialImgSrc = (product.images && product.images.length > 0 && product.images[0])
        ? product.images[0]
        : getProductFallbackImage(product);

    const discount = product.price < product.labelledPrice
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <Link to={"/overview/" + product.productId}
            className="card flex flex-col overflow-hidden group h-full relative">

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                    -{discount}%
                </div>
            )}

            {/* Image */}
            <div className="w-full aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden border-b border-gray-100">
                <img
                    src={initialImgSrc}
                    onError={(e) => handleImageError(e, product)}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-4 bg-white">
                {/* Stars */}
                <div className="flex text-amber-400 text-xs gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < 4 ? "text-amber-400" : "text-gray-200"}/>
                    ))}
                    <span className="text-gray-400 text-[11px] ml-1 font-medium">(4.8)</span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-3 group-hover:text-blue-700 transition-colors flex-grow">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="pt-3 border-t border-gray-50 mt-auto">
                    {product.price < product.labelledPrice ? (
                        <div>
                            <span className="text-red-500 text-base font-extrabold">
                                {getFormattedPrice(product.price)}
                            </span>
                            <span className="text-gray-400 line-through text-xs ml-2">
                                {getFormattedPrice(product.labelledPrice)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray-900 text-base font-extrabold">
                            {getFormattedPrice(product.price)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}