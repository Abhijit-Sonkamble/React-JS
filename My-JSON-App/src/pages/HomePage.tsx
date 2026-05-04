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
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-xl font-black uppercase tracking-[0.4em] text-slate-900 mb-2">Featured Gadgets</h1>
                <div className="h-[2px] w-12 bg-indigo-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {products.map((prod) => (
                    <div key={prod.id} className="flex flex-col gap-3 group">
                        <Link to={`/product-detail/${prod.id}`} className="aspect-square block rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-50" />
                        </Link>
                        <div className="px-1">
                            <h3 className="font-bold text-slate-900 text-sm truncate">{prod.name}</h3>
                            <p className="text-indigo-600 font-black text-xs">₹{prod.price}</p>
                        </div>
                        <button 
                            onClick={() => navigate(`/product-detail/${prod.id}`)}
                            disabled={prod.stock === 0}
                            className="w-full py-3 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase rounded-xl hover:bg-indigo-600 active:scale-95 disabled:opacity-40 transition-colors shadow-lg shadow-slate-900/10"
                        >
                            {prod.stock > 0 ? "View Details" : "Out of Stock"}
                        </button>
                    </div>
                ))}
            </div>
            
            {products.length === 0 && (
                <div className="text-center py-20 text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">
                    Loading Devices...
                </div>
            )}
        </div>
    );
}