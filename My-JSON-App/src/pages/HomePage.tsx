import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { fetchAllProducts } from "../services/ProductServices";
import type { ProductFetchType } from "../utils/global";

export default function HomePage() {
    const [products, setProducts] = useState<ProductFetchType[]>([]);
    const navigate = useNavigate();

    useEffect(() => { getProducts(); }, []);

    async function getProducts() {
        const data = await fetchAllProducts();
        setProducts(data);
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 font-mono">
            
            {/* Terminal Header Section */}
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-3">
                        <span className="text-cyan-400">~/</span> HARDWARE_GRID
                    </h1>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2">
                        Browse active inventory nodes
                    </p>
                </div>
                <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/50 px-4 py-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-[10px] text-cyan-400 uppercase tracking-widest">
                        SYS_NODES: [ {products.length.toString().padStart(2, '0')} ]
                    </span>
                </div>
            </div>

            {/* Hardware Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
                {products.map((prod) => (
                    <div key={prod.id} className="flex flex-col group">
                        
                        {/* Image Frame */}
                        <Link 
                            to={`/product-detail/${prod.id}`} 
                            className="relative aspect-square block border border-zinc-800 bg-zinc-950 p-3 mb-4 overflow-hidden group-hover:border-cyan-500/50 transition-colors duration-300"
                        >
                            {/* Inner Frame Accent */}
                            <div className="absolute inset-1 border border-zinc-900 z-10 pointer-events-none"></div>
                            
                            {/* Corner Marker */}
                            <div className="absolute top-0 right-0 w-3 h-3 bg-zinc-800 group-hover:bg-cyan-500 transition-colors duration-300 z-20"></div>

                            {/* Hover Overlay Line */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-20"></div>

                            <img 
                                src={prod.image} 
                                alt={prod.name} 
                                className="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                            />
                        </Link>

                        {/* Data Readout */}
                        <div className="px-1 mb-4 flex-grow">
                            <h3 className="font-bold text-zinc-300 text-[11px] uppercase tracking-wider truncate mb-1.5 group-hover:text-cyan-100 transition-colors">
                                {prod.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-cyan-400 font-bold text-xs tracking-widest">₹{prod.price}</p>
                                <span className={`text-[9px] font-bold tracking-widest uppercase ${prod.stock > 0 ? 'text-zinc-600' : 'text-red-500/70'}`}>
                                    {prod.stock > 0 ? `QTY:${prod.stock}` : 'ERR:DEPLETED'}
                                </span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button 
                            onClick={() => navigate(`/product-detail/${prod.id}`)}
                            disabled={prod.stock === 0}
                            className="relative w-full border border-zinc-800 bg-zinc-950/50 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:border-zinc-800 disabled:hover:text-zinc-500 transition-all overflow-hidden focus:outline-none group/btn"
                        >
                            {/* Button Hover Glow */}
                            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                            
                            <span className="relative z-10">
                                {prod.stock > 0 ? "[ ACCESS NODE ]" : "[ OFFLINE ]"}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Loading / Empty State */}
            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 border border-zinc-800 bg-zinc-950/50 mt-8">
                    <div className="w-8 h-8 border-2 border-zinc-800 border-t-cyan-500 animate-spin mb-6"></div>
                    <div className="text-cyan-500 font-bold text-xs uppercase tracking-[0.4em] animate-pulse">
                        &gt; INITIALIZING NETWORK SCAN...
                    </div>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-4">
                        Fetching hardware data streams
                    </p>
                </div>
            )}
        </div>
    );
}