import { useEffect, useState } from "react";
import type { ProductFetchType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../services/ProductServices";

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<ProductFetchType>({
        id: "", name: "", category: "", price: 0, stock: 0, image: "", description: "",
    });

    const [error, setError] = useState<any>({});
    const categories = ["Laptops", "Smartphones", "Audio", "Wearables", "Accessories"];

    useEffect(() => { if (id) getSingleData(); }, [id]);

    async function getSingleData() {
        const data = await fetchSingleProduct(id || "");
        setProductData(data);
    }

    function onHandleChange(e: any) {
        const { name, value } = e.target;
        setProductData(old => ({ ...old, [name]: (name === 'price' || name === 'stock') ? Number(value) : value }));
        if (error[name]) setError((prev: any) => ({ ...prev, [name]: "" }));
    }

    async function onHandleSubmit(e: any) {
        e.preventDefault();
        const status = await updateProduct(productData);
        if (status) {
            toast.success("✨ Tech specs updated successfully!");
            navigate('/view-products');
        } else toast.error("❌ Update failed");
    }

    const inputClass = (fieldName: string) => 
        `w-full bg-zinc-900/50 text-zinc-100 p-3 border-l-2 border-y border-r ${error[fieldName] ? 'border-red-500/50 border-l-red-500 bg-red-950/10' : 'border-zinc-800 border-l-zinc-600 hover:border-zinc-700 focus:border-cyan-500/50 focus:border-l-cyan-400 focus:bg-cyan-950/10'} outline-none transition-all duration-300 font-mono`;

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 font-mono">
            {/* Terminal-style Outer Container */}
            <div className="relative border border-zinc-800 bg-zinc-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
                
                {/* Decorative Frame Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50"></div>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-zinc-800 pb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-3">
                            <span className="text-cyan-400">~/</span> Modify_Node
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2">Update existing hardware parameters</p>
                    </div>
                    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-[10px] text-cyan-400 uppercase tracking-widest">Sys_Admin_Mode</span>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={onHandleSubmit} className="space-y-8">
                    
                    {/* Input Group: Name */}
                    <div className="group">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                            <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                            Identity Label
                        </label>
                        <input type="text" name="name" value={productData.name} onChange={onHandleChange} className={inputClass('name')} />
                    </div>
                    
                    {/* Input Group: Price & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Value (INR)
                            </label>
                            <input type="number" name="price" value={productData.price} onChange={onHandleChange} className={inputClass('price')} />
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Available Units
                            </label>
                            <input type="number" name="stock" value={productData.stock} onChange={onHandleChange} className={inputClass('stock')} />
                        </div>
                    </div>
                    
                    {/* Input Group: Image & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Visual Asset URL
                            </label>
                            <input type="text" name="image" value={productData.image} onChange={onHandleChange} className={inputClass('image')} />
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Classification
                            </label>
                            <select name="category" value={productData.category} onChange={onHandleChange} className={`${inputClass('category')} cursor-pointer appearance-none`}>
                                <option value="" className="bg-zinc-950 text-zinc-500">-- Select Class --</option>
                                {categories.map(c => <option key={c} value={c} className="bg-zinc-950">{c}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {/* Input Group: Description */}
                    <div className="group">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                            <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                            Tech Specifications
                        </label>
                        <textarea name="description" value={productData.description} onChange={onHandleChange} rows={5} className={`${inputClass('description')} resize-y`}></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 py-5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 border border-zinc-800 hover:bg-zinc-900 hover:text-zinc-300 transition-colors">
                            [ Abort Override ]
                        </button>
                        <button type="submit" className="relative flex-1 group border border-cyan-500 bg-transparent py-5 overflow-hidden transition-all focus:outline-none">
                            {/* Hover Fill Effect */}
                            <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            
                            {/* Button Text */}
                            <div className="relative z-10 flex items-center justify-center">
                                <span className="text-cyan-400 group-hover:text-zinc-950 font-bold uppercase tracking-[0.3em] text-xs transition-colors">
                                    [ Execute Override ]
                                </span>
                            </div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}