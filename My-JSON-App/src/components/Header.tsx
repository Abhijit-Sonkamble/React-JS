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
        `text-sm uppercase tracking-widest transition-all ${isActive ? "text-cyan-400 border-l-2 border-cyan-400 pl-2" : "text-zinc-500 hover:text-cyan-300"}`;

    return (
        <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 font-mono">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                
                {/* Bracket-style logo replacing the rounded pill */}
                <NavLink to="/" className="flex items-center gap-4 group">
                    <div className="border border-cyan-500 px-2 py-1 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all">
                        <span className="font-bold text-xl">{"[ A ]"}</span>
                    </div>
                    <span className="text-xl font-light tracking-widest text-zinc-100">AURA<span className="font-bold text-cyan-400">TECH</span></span>
                </NavLink>

                <div className="flex items-center gap-12">
                    <ul className="hidden md:flex items-center gap-8">
                        <li><NavLink to="/" className={linkClasses}>Store</NavLink></li>
                        <li><NavLink to="/view-products" className={linkClasses}>Inventory</NavLink></li>
                    </ul>

                    <div className="flex items-center gap-8 border-l border-zinc-800 pl-8">
                        {/* New Shopping Cart Icon */}
                        <NavLink to="/cart" className="relative group p-2">
                            <svg className="h-6 w-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                /* Sharp, glowing badge */
                                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-zinc-950 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>

                        {/* Ghost button with hover fill replacing the solid dark button */}
                        <NavLink to="/add-product" className="border border-cyan-500 px-6 py-2 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-500 hover:text-zinc-950 transition-all">
                            Add Gadget
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}