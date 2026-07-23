import { useState } from "react"
import { addToCart, getCart, getTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-formatter"
import { Link } from "react-router-dom"
import { IoClose } from "react-icons/io5"

export default function CartPage(){

    const [cart , setCart] = useState(getCart())

    return (
        <div className="w-full h-auto lg:h-full overflow-y-scroll flex items-center flex-col bg-primary py-6">
            {
                cart.length === 0 && (
                    <p className="text-text-muted text-sm mt-10">Your cart is empty.</p>
                )
            }
            {
                cart.map(
                    (cartItem, index) => {
                        return (
                            <div className="w-[400px] lg:w-[600px] h-[250px] lg:h-[150px] shadow-lg bg-secondary border border-white/5 rounded-xl my-3 flex flex-row relative overflow-hidden" key={index}>
                                <img src={cartItem.product.image} className="h-full w-[150px] md:w-[200px] aspect-square object-cover shrink-0 rounded-l-xl bg-white" alt={cartItem.product.name} />

                                <div className="h-full w-[450px] flex flex-col p-4">
                                    <h3 className="text-base font-semibold text-text-main">{cartItem.product.name}</h3>
                                    <p className="text-text-muted text-sm line-through">{getFormattedPrice(cartItem.product.labelledPrice)}</p>
                                    <p className="text-accent font-semibold">{getFormattedPrice(cartItem.product.price)}</p>
                                    <div className="h-[32px] w-[100px] mt-2 border border-accent/40 rounded-full flex flex-row items-center justify-center overflow-hidden">
                                        <button className="w-[30px] h-full text-text-main hover:bg-accent hover:text-white transition-colors"
                                        onClick={
                                            ()=>{
                                                addToCart(cartItem.product , -1)
                                                setCart(getCart())
                                            }
                                        }>
                                            -
                                        </button>
                                        <span className="w-[40px] h-full flex justify-center items-center text-text-main text-sm">
                                            {cartItem.qty}
                                        </span>
                                        <button className="w-[30px] h-full text-text-main hover:bg-accent hover:text-white transition-colors"
                                        onClick={
                                            ()=>{
                                                addToCart(cartItem.product , 1)
                                                setCart(getCart())
                                            }
                                        }>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button className="absolute top-2 right-2 text-text-muted cursor-pointer hover:text-red-400 transition-colors"
                                onClick={
                                    ()=>{
                                        addToCart(cartItem.product , -cartItem.qty)
                                        setCart(getCart())
                                    }
                                }>
                                    <IoClose size={20} />
                                </button>
                                <span className="absolute bottom-3 text-lg right-4 text-accent font-bold">
                                    {getFormattedPrice(cartItem.product.price * cartItem.qty)}
                                </span>
                            </div>
                        )
                    }
                )
            }

            {cart.length > 0 && (
                <div className="w-[400px] lg:w-[600px] h-[100px] sticky bottom-0 shadow-2xl bg-secondary border border-white/10 rounded-xl my-4 flex flex-row items-center justify-between p-4">
                    <Link to="/checkout" className="w-[220px] p-2.5 text-white bg-isuri-gradient rounded-lg hover:opacity-90 text-center font-semibold transition-opacity" state={cart}>
                        Checkout
                    </Link>
                    <div className="flex justify-end h-full items-center">
                        <span className="text-text-muted text-sm mr-4 hidden lg:block">Total:</span>
                        <span className="text-accent text-xl font-bold">
                            {getFormattedPrice(getTotal(cart))}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
