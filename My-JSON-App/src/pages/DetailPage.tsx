import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchSingleProduct } from "../services/ProductServices";
import { addToCartServer } from "../services/CartServices"; 
import type { ProductFetchType } from "../utils/global";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
    const [product, setProduct] = useState<ProductFetchType | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => { if (id) getProduct(); }, [id]);

    async function getProduct() {
        const data = await fetchSingleProduct(id || "");
        setProduct(data);
    };

    async function handleAddToCart() {
        if (!product) return;
        const status = await addToCartServer(product); 
        if (status) {
            toast.success("🛒 Added to cart!");
            window.dispatchEvent(new Event("cartUpdated"));
        } else toast.error("❌ Failed to add to cart");
    }

    if (!product) return (
        <div className="flex justify-center items-center min-h-[60vh] text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
            &gt; Establishing connection to data node...
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 font-mono text-zinc-100">
            
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-16">
                <button onClick={() => navigate(-1)} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors">
                    <span className="border border-zinc-700 group-hover:border-cyan-400 px-2 py-1 transition-colors">{"<"}</span> 
                    Return_To_Grid
                </button>
                <div className="h-[1px] flex-grow mx-8 bg-zinc-800 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/50"></div>
                </div>
                <span className="text-[10px] font-bold text-cyan-500/70 uppercase tracking-[0.4em]">
                    CLASS // {product.category}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                
                {/* Image & Status Segment */}
                <div className="lg:col-span-6 relative">
                    {/* Brutalist Frame */}
                    <div className="relative z-10 border border-zinc-800 bg-zinc-950/50 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
                        
                        {/* Frame Accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>

                        {/* Image Container */}
                        <div className="relative aspect-square border border-zinc-800 bg-zinc-900 group overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover filter contrast-125 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                        </div>
                    </div>

                    {/* Detached Status Terminal Box */}
                    <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-zinc-950 p-5 z-20 border border-zinc-700 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`}></span>
                                SYS_NODE_STATUS
                            </p>
                            <p className={`text-sm uppercase font-bold tracking-widest ${product.stock > 0 ? 'text-cyan-400' : 'text-red-500'}`}>
                                {product.stock > 0 ? `[ ${product.stock}_UNITS_ACTIVE ]` : '[ RESOURCE_OFFLINE ]'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details & Specifications Segment */}
                <div className="lg:col-span-6 flex flex-col justify-center mt-12 lg:mt-0">
                    
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 uppercase tracking-widest mb-6 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-baseline gap-4">
                            <span className="text-xl text-zinc-600 font-bold">₹</span>
                            <span className="text-5xl font-bold text-cyan-400 tracking-wider drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                {product.price}
                            </span>
                        </div>
                    </div>

                    {/* Glowing Divider */}
                    <div className="w-full h-[1px] bg-zinc-800 mb-10 relative">
                        <div className="absolute left-0 top-0 h-[1px] w-1/3 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                    </div>

                    {/* Description */}
                    <div className="mb-12 border-l-2 border-zinc-800 pl-6">
                        <h3 className="text-[10px] font-bold uppercase text-zinc-500 mb-4 tracking-[0.3em]">
                            &gt; HARDWARE_SPECIFICATIONS
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed tracking-wide">
                            {product.description}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={handleAddToCart} 
                        disabled={product.stock === 0} 
                        className="relative w-full group border border-cyan-500 bg-transparent py-6 overflow-hidden transition-all focus:outline-none disabled:opacity-30 disabled:border-zinc-700 disabled:cursor-not-allowed"
                    >
                        {/* Hover Fill Effect (only active if not disabled) */}
                        {product.stock > 0 && (
                            <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        )}
                        
                        {/* Button Text */}
                        <div className="relative z-10 flex items-center justify-center">
                            <span className={`font-bold uppercase tracking-[0.3em] text-[11px] transition-colors ${product.stock > 0 ? 'text-cyan-400 group-hover:text-zinc-950' : 'text-zinc-500'}`}>
                                {product.stock > 0 ? "[ INITIALIZE SECURE TRANSFER ]" : "[ CONNECTION FAILED ]"}
                            </span>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}