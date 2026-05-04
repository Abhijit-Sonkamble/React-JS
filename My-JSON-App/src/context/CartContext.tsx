import { useState } from "react";
import type { CartItem, ProductFetchType } from "../utils/global";
import { toast } from "react-toastify";

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: ProductFetchType) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    toast.warning("⚠️ Maximum stock limit reached!");
                    return prevCart;
                }
                toast.success("📦 Quantity updated in cart!");
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success("🚀 Gadget added to cart!");
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
        toast.info("🗑️ Removed from cart");
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ));
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return { cart, addToCart, removeFromCart, updateQuantity, cartTotal };
};