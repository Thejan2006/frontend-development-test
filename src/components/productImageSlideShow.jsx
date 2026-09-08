import { useState } from "react";
import { getProductFallbackImage, handleImageError } from "../utils/product-image-fallback";

export default function ProductImageSlideShow(props){
    const images = props.images || [];
    const product = props.product || {};
    const [activeImageIndex , setActiveImageIndex] = useState(0);

    const initialImgSrc = (images.length > 0 && images[activeImageIndex]) 
      ? images[activeImageIndex] 
      : getProductFallbackImage(product);

    return(
        <div className="w-full max-w-[520px] animate-[fade-in-up_600ms_ease_both]">
            <div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-8 shadow-xl shadow-slate-900/5 sm:p-12">
                <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition duration-700 group-hover:scale-150" />
                <img 
                    src={initialImgSrc} 
                    onError={(e) => handleImageError(e, product)}
                    className="relative h-full w-full object-contain transition duration-500 ease-out group-hover:scale-105"
                    alt="Product Detail"
                />
            </div>
            
            {images.length > 1 && (
                <div className="flex w-full items-center justify-center gap-3 overflow-x-auto py-4">
                    {images.map((image , index)=>{
                        return (
                            <img 
                                key={index} 
                                src={image} 
                                onError={(e) => handleImageError(e, product)}
                                className={"h-16 w-16 cursor-pointer rounded-xl border-2 bg-white p-2 object-contain transition-all "+(activeImageIndex===index ? "scale-105 border-blue-600 shadow-md shadow-blue-600/20" : "border-slate-200 hover:border-blue-300")}
                                onClick={()=>setActiveImageIndex(index)}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
