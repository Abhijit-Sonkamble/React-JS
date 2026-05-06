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
        <div className="py-12 px-4 font-mono text-zinc-100 min-h-[80vh]">
            <div className="mx-auto max-w-5xl">
                
                {/* Header Section */}
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-800 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest text-zinc-100 uppercase flex items-center gap-3">
                            <span className="text-cyan-400">~/</span> SYS.CART_BUFFER
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-3">Active_Nodes: [ {cart.length} ]</p>
                    </div>
                    <div className="relative group">
                        <select onChange={(e) => setFilteredCategory(e.target.value)} className="appearance-none bg-zinc-900/50 px-6 py-3 text-xs font-bold text-zinc-400 border border-zinc-800 outline-none focus:border-cyan-400 focus:bg-cyan-950/10 cursor-pointer uppercase tracking-widest transition-all pr-12">
                            <option value="" className="bg-zinc-950">ALL_CATEGORIES</option>
                            {allCategories.map((cat, idx) => <option key={idx} value={cat} className="bg-zinc-950">{cat.toUpperCase()}</option>)}
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500 text-xs font-bold">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Main Cart Terminal Window */}
                <div className="relative border border-zinc-800 bg-zinc-950/80 p-1 sm:p-2 shadow-2xl backdrop-blur-sm">
                    
                    {/* Decorative Frame Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead className="bg-zinc-900/50 border-b border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Identity</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] text-center">Allocated_Qty</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Sub_Sum</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] text-right">Command</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {filteredCart.map((item) => (
                                    <tr key={item.id} className="hover:bg-cyan-950/10 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="border border-zinc-800 p-1 bg-zinc-950 group-hover:border-cyan-500/50 transition-colors">
                                                    <img src={item.image} className="h-14 w-14 object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-zinc-300 uppercase tracking-widest group-hover:text-cyan-100 transition-colors">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1 group-hover:text-cyan-500/70">CLASS // {item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-1 w-fit mx-auto border border-zinc-800 bg-zinc-950 p-1">
                                                <button onClick={() => handleQuantity(item, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 transition-all active:scale-95 font-bold">-</button>
                                                <span className="text-sm font-bold text-cyan-400 w-8 text-center">{item.quantity}</span>
                                                <button onClick={() => handleQuantity(item, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 transition-all active:scale-95 font-bold">+</button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-zinc-300 tracking-widest">
                                            ₹{item.price * item.quantity}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button onClick={() => handleRemove(item.id)} className="text-[10px] font-bold text-red-500/60 hover:text-red-400 border border-transparent hover:border-red-500/50 bg-transparent hover:bg-red-950/30 px-3 py-2 transition-all uppercase tracking-[0.2em]">
                                                [ Drop ]
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCart.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-32 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4">
                                                <span className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-xs">&gt; STATUS: BUFFER_EMPTY</span>
                                                <button onClick={() => navigate('/')} className="text-[10px] text-cyan-500 hover:text-cyan-400 uppercase tracking-widest border-b border-cyan-500/30 hover:border-cyan-400 pb-1 transition-colors mt-2">
                                                    Initialize Shop Protocol
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {cart.length > 0 && (
                        <div className="bg-zinc-900/30 p-6 sm:p-10 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-8 mt-2">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-2">&gt; Total_Sum_Allocated</p>
                                <p className="text-3xl font-bold text-cyan-400 tracking-wider">₹{cartTotal}</p>
                            </div>
                            <button className="relative w-full sm:w-auto group border border-cyan-500 bg-transparent py-4 px-12 overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
                                {/* Hover Fill Effect */}
                                <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                
                                {/* Button Text */}
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="text-cyan-400 group-hover:text-zinc-950 font-bold uppercase tracking-[0.3em] text-[11px] transition-colors">
                                        [ Secure Checkout ]
                                    </span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}