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
        <div className="w-full max-w-[450px] flex flex-col items-center">
            <div className="w-full h-[400px] bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center justify-center">
                <img 
                    src={initialImgSrc} 
                    onError={(e) => handleImageError(e, product)}
                    className="w-full h-full object-contain transition-all duration-300"
                    alt="Product Detail"
                />
            </div>
            
            {images.length > 1 && (
                <div className="w-full flex justify-center items-center gap-3 mt-4 overflow-x-auto py-2">
                    {images.map((image , index)=>{
                        return (
                            <img 
                                key={index} 
                                src={image} 
                                onError={(e) => handleImageError(e, product)}
                                className={"w-16 h-16 object-contain rounded-xl bg-white p-2 border-2 cursor-pointer transition-all "+(activeImageIndex===index ? "border-purple-600 shadow-md scale-105" : "border-slate-200 hover:border-purple-300")} 
                                onClick={()=>setActiveImageIndex(index)}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}