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

    if (!product) return <div className="flex justify-center items-center h-96 text-slate-500 font-bold animate-pulse">Loading Details...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-12">
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-slate-900 transition-all">
                    <span className="text-lg transition-transform group-hover:-translate-x-1">←</span> Back to Store
                </button>
                <div className="h-[1px] flex-grow mx-8 bg-slate-200"></div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">{product.category}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 relative group">
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square bg-slate-50">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white p-5 rounded-3xl shadow-xl z-20 border border-slate-100">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Stock Status</p>
                            <p className={`text-lg font-black leading-none ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center max-w-md mx-auto lg:mx-0">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">{product.name}</h1>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-slate-900">₹</span>
                            <span className="text-5xl font-black text-slate-900 tracking-tight">{product.price}</span>
                        </div>
                    </div>

                    <div className="h-[2px] w-20 bg-indigo-600 mb-8"></div>

                    <div className="mb-10">
                        <h3 className="text-[11px] font-black uppercase text-slate-400 mb-3 tracking-widest">Tech Specs</h3>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            {product.description}
                        </p>
                    </div>

                    <button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 disabled:opacity-40 transition-colors shadow-xl shadow-slate-900/20 active:scale-95">
                        {product.stock > 0 ? "Add to Cart →" : "Currently Unavailable"}
                    </button>
                </div>
            </div>
        </div>
    );
}