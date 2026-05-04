import type { CartItem, ProductFetchType } from "../utils/global";

const CART_URL = "http://localhost:8000/cart/";

export const getCartItems = async () => {
    try {
        const res = await fetch(CART_URL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return [];
    }
}

export const addToCartServer = async (product: ProductFetchType) => {
    try {
        const cartItems: CartItem[] = await getCartItems();
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            const res = await fetch(CART_URL + existingItem.id, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: existingItem.quantity + 1 })
            });
            return res.ok;
        } else {
            const newCartItem: CartItem = { ...product, quantity: 1 };
            const res = await fetch(CART_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCartItem)
            });
            return res.ok;
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        return false;
    }
}

export const removeFromCartServer = async (id: string) => {
    try {
        const res = await fetch(CART_URL + id, { 
            method: "DELETE" 
        });
        return res.ok;
    } catch (error) {
        console.error("Error removing from cart:", error);
        return false;
    }
}

export const updateCartQuantity = async (id: string, quantity: number) => {
    try {
        const res = await fetch(CART_URL + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity })
        });
        return res.ok;
    } catch (error) {
        console.error("Error updating quantity:", error);
        return false;
    }
}