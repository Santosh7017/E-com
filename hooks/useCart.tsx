import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQuantity: number;
    cartProducts: CartProductType[] | null;
    handleAddProductCart: (product: CartProductType) => void
}

interface Props {
    [propName: string]: any;
}
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
    console.log("Component rendered");
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
 
    const[cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(()=> {
        const cartItems: any = localStorage.getItem('cartItems');
        const addedcartProducts: CartProductType[]| null = JSON.parse(cartItems)
        console.log("inside useEffect", 2);
        
        setCartProducts(addedcartProducts); 
        
},[]);

    
    const handleAddProductCart =useCallback((product: CartProductType) => {
            setCartProducts((prev) => {
                let updatedCart;
                if(prev ){
                    updatedCart = [...prev, product]
                }else {
                    updatedCart = [product]
                    
                }
                console.log("handleAddProductCart called");
                
                toast.success("Product added to cart");
                    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
                    return updatedCart;
            });
    },[])

  
   const value = {
    cartTotalQuantity ,
    cartProducts,
    handleAddProductCart,
   }

    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(context === null){
        throw new Error("useCart must me used within a CartContextProvider");
    }

    return context;

}