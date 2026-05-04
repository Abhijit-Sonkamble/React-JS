import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getCartItems } from "../services/CartServices";

export default function Header() {
    const [cartCount, setCartCount] = useState<number>(0);

 const fetchCount = async () => {
    const cart = await getCartItems();
    const total = cart.length; 
    setCartCount(total);
};

    useEffect(() => {
        fetchCount();
        window.addEventListener("cartUpdated", fetchCount);
        return () => window.removeEventListener("cartUpdated", fetchCount);
    }, []);

    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `text-xs font-black uppercase tracking-widest transition-all ${isActive ? "text-slate-900 border-b-2 border-slate-900 pb-1" : "text-slate-400 hover:text-slate-900"}`;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                        <span className="text-white font-black text-xl italic">A</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter text-slate-900">AuraTech</span>
                </NavLink>

                <div className="flex items-center gap-10">
                    <ul className="hidden md:flex items-center gap-8">
                        <li><NavLink to="/" className={linkClasses}>Store</NavLink></li>
                        <li><NavLink to="/view-products" className={linkClasses}>Inventory</NavLink></li>
                    </ul>

                    <div className="flex items-center gap-6 border-l border-slate-200 pl-6">
                        <NavLink to="/cart" className="relative group p-2">
                            <svg className="h-6 w-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-black text-white bg-indigo-600 rounded-full ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        <NavLink to="/add-product" className="bg-slate-900 px-5 py-2 text-[10px] font-black uppercase text-white rounded-full hover:bg-indigo-600 transition-colors">
                            Add Gadget
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}