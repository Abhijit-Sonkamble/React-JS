import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCartItems, removeFromCartServer, updateCartQuantity } from "../services/CartServices";
import type { CartItem } from "../utils/global";
import { toast } from "react-toastify";

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => { fetchCart(); }, []);

    async function fetchCart() {
        const data = await getCartItems();
        setCart(data);
        const categories: any = new Set(data.map((item: CartItem) => item.category));
        setAllCategories(Array.from(categories));
    }

    const handleRemove = async (id: string) => {
        const status = await removeFromCartServer(id);
        if (status) {
            toast.error("🗑️ Removed from cart");
            window.dispatchEvent(new Event("cartUpdated"));
            fetchCart();
        }
    }

    const handleQuantity = async (item: CartItem, newQty: number) => {
        if (newQty < 1) return;
        if (newQty > item.stock) {
            toast.warning("⚠️ Max stock reached!");
            return;
        }
        const status = await updateCartQuantity(item.id, newQty);
        if (status) {
            window.dispatchEvent(new Event("cartUpdated"));
            fetchCart();
        }
    }

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const filteredCart = filteredCategory === "" ? cart : cart.filter(item => item.category === filteredCategory);

    return (
        <div className="py-6 px-4">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Your Cart</h1>
                        <p className="text-sm font-medium text-slate-500 mt-2">{cart.length} gadgets in bag</p>
                    </div>
                    <select onChange={(e) => setFilteredCategory(e.target.value)} className="appearance-none rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 border border-slate-200 outline-none focus:border-indigo-500 cursor-pointer">
                        <option value="">All Categories</option>
                        {allCategories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                    </select>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Quantity</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Subtotal</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCart.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200" alt="" />
                                            <div>
                                                <p className="font-bold text-slate-900">{item.name}</p>
                                                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{item.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-3 bg-slate-50 w-fit mx-auto px-2 py-1 rounded-lg border border-slate-200">
                                            <button onClick={() => handleQuantity(item, item.quantity - 1)} className="text-slate-500 hover:text-slate-900 px-2 font-black">-</button>
                                            <span className="text-sm font-black text-slate-900 min-w-[20px] text-center">{item.quantity}</span>
                                            <button onClick={() => handleQuantity(item, item.quantity + 1)} className="text-slate-500 hover:text-slate-900 px-2 font-black">+</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-black text-slate-900">₹{item.price * item.quantity}</td>
                                    <td className="px-6 py-5 text-right">
                                        <button onClick={() => handleRemove(item.id)} className="text-xs font-bold text-red-500 hover:text-red-700 underline underline-offset-4">Remove</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCart.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-slate-500 font-bold">Your cart is empty. <br/><button onClick={() => navigate('/')} className="text-indigo-600 mt-2 underline">Shop Now</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {cart.length > 0 && (
                        <div className="bg-slate-50 p-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="text-4xl font-black text-slate-900">₹{cartTotal}</p>
                            </div>
                            <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
                                Checkout Securely
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}