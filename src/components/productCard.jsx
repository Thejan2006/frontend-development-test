import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-formatter";

export default function ProductCard(props){

    const product = props.product;

    return (
        <Link to={"/overview/"+product.productId} className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden hover:border-blue-300 hover:-translate-y-1 group h-full">
            <div className="w-full aspect-square overflow-hidden bg-white p-4 flex items-center justify-center border-b border-slate-100 relative">
                {product.price < product.labelledPrice && (
                    <div className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full z-10">
                        Sale
                    </div>
                )}
                <img src={product.images[0]} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="w-full p-5 flex flex-col flex-grow justify-between bg-white">
                <h1 className="text-[16px] font-semibold text-slate-800 line-clamp-2 leading-tight mb-4 group-hover:text-blue-600 transition-colors">{product.name}</h1>
                
                <div className="flex flex-col">
                    {
                        product.price < product.labelledPrice ? (
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-slate-400 line-through text-sm">{getFormattedPrice(product.labelledPrice)}</span>
                                <span className="text-blue-600 text-xl font-bold">{getFormattedPrice(product.price)}</span>
                            </div>
                        ) : (
                            <div className="text-slate-900 text-xl font-bold mb-1">{getFormattedPrice(product.price)}</div>
                        )
                    }
                </div>
            </div>
        </Link>
    )
}