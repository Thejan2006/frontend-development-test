import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingCart, Star } from "lucide-react";
import getFormattedPrice from "../utils/price-formatter";
import { getProductFallbackImage, handleImageError } from "../utils/product-image-fallback";

export default function ProductCard({ product }) {
    const initialImgSrc = product.images?.[0] || product.image || getProductFallbackImage(product);
    const discount = product.price < product.labelledPrice
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;
    const stock = Number(product.stock ?? 0);
    const hasStock = product.isAvailable !== false && (product.stock == null || stock > 0);

    return (
        <Link to={`/overview/${product.productId || product._id}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3">
                {discount > 0 ? <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-black tracking-wide text-white shadow-sm">SAVE {discount}%</span> : <span />}
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${hasStock ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{hasStock ? "In stock" : "Out of stock"}</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/60 p-6 sm:p-8">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition duration-500 group-hover:scale-150" />
                <img src={initialImgSrc} onError={(e) => handleImageError(e, product)} alt={product.name} className="relative h-full w-full object-contain transition duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2" />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-xl bg-white text-blue-600 opacity-0 shadow-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={18} /></span>
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-1.5"><div className="flex text-amber-400"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} className="text-slate-200" fill="currentColor" /></div><span className="text-[11px] font-semibold text-slate-400">4.8 · Reviews</span></div>
                <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-700">{product.name}</h3>
                <div className="mt-auto flex items-end justify-between gap-2 border-t border-slate-100 pt-4"><div>{discount > 0 && <p className="text-xs text-slate-400 line-through">{getFormattedPrice(product.labelledPrice)}</p>}<p className="text-base font-black text-blue-700">{getFormattedPrice(product.price)}</p></div><span className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1.5 text-[11px] font-bold text-blue-700"><ShoppingCart size={13} /> View</span></div>
            </div>
        </Link>
    );
}
