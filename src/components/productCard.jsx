import { Link } from "react-router-dom";
import getFormattedPrice from "../utils/price-formatter";

export default function ProductCard(props){

    const product = props.product;

    return (
        <Link to={"/overview/"+product.productId} className="w-72 h-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-slate-200 overflow-hidden hover:border-blue-600 group">
            <div className="w-full h-[60%] overflow-hidden bg-slate-50">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="w-full h-[40%] p-4 flex flex-col justify-between">
                <h1 className="text-lg font-semibold text-slate-900 line-clamp-2">{product.name}</h1>
                
                <div>
                    {
                        product.price < product.labelledPrice && <p className="text-gray-500 line-through text-sm">{getFormattedPrice(product.labelledPrice)}</p>
                    }
                    <p className="text-blue-600 text-xl font-bold">{getFormattedPrice(product.price)}</p>
                </div>
            </div>
        </Link>
    )
}