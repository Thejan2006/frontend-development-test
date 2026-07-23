export function getCart(){
    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart", "[]")
        return []
    }

    const cart = JSON.parse(cartString)
    return cart
}

export function addToCart(product, qty){
    const cart = getCart()

    // MongoDB _id හෝ productId ද කියන එක හරියටම check කරගැනීම
    const targetId = product.productId || product._id;

    const existingProductIndex = cart.findIndex(
        (item) => {
            const itemId = item.product.productId || item.product._id;
            return itemId == targetId;
        }
    )

    if(existingProductIndex == -1 && qty > 0){
        cart.push({
            product: {
                productId: targetId,
                name: product.name,
                image: (product.images && product.images.length > 0) ? product.images[0] : product.image, 
                price: product.price,
                labelledPrice: product.labelledPrice
            },
            qty: qty
        })
    } else if(existingProductIndex != -1){
        cart[existingProductIndex].qty += qty 

        // Quantity එක 0 හෝ ඊට අඩු නම් cart එකෙන් ඉවත් කිරීම
        if(cart[existingProductIndex].qty <= 0){
            cart.splice(existingProductIndex, 1)
        }
    }

    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart", cartString)
}

// 🟢 අලුතින් එකතු කළ Cart එකෙන් Item එක සම්පූර්ණයෙන්ම ඉවත් කරන Function එක
export function removeFromCart(productId){
    const cart = getCart();
    
    // අදාළ productId එක නැති අනෙක් items පමණක් පෙරළා ගැනීම
    const updatedCart = cart.filter(item => {
        const itemId = item.product.productId || item.product._id;
        return itemId != productId;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
}

export function getTotal(cart){    
    let total = 0

    cart.forEach((item)=>{
        total += item.product.price * item.qty
    })

    return total
}