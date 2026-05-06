import { useState } from "react";
import type { ProductType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../services/ProductServices";

export default function AddProductPage() {
    const navigate = useNavigate();

    const [productData, setProductData] = useState<ProductType>({
        name: "", category: "", price: 0, stock: 0, image: "", description: "",
    });

    const [error, setError] = useState<any>({}); 
    const categories = ["Laptops", "Smartphones", "Audio", "Wearables", "Accessories"];

    function onHandleChange(e: any) {
        const { name, value } = e.target;
        setProductData(old => ({ ...old, [name]: (name === 'price' || name === 'stock') ? Number(value) : value }));
        if (error[name]) setError((prev: any) => ({ ...prev, [name]: "" }));
    }

    function validation() {
        const error: any = {};
        if (!productData.name.trim()) error.name = "Product name is required";
        if (!productData.category.trim()) error.category = "Category is required";
        if (!productData.price || productData.price < 0) error.price = "Valid price is required";
        if (productData.stock === undefined || productData.stock < 0) error.stock = "Valid stock is required";
        if (!productData.image.trim()) error.image = "Image URL is required";
        if (!productData.description.trim()) error.description = "Description is required";

        setError(error);
        return Object.keys(error).length === 0;
    }

    async function onHandleSubmit(e: any) {
        e.preventDefault();
        if (!validation()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        const status = await addProduct(productData);
        if (status) {
            toast.success("🚀 Gadget added to inventory!");
            navigate('/view-products');
        } else {
            toast.error("❌ Server Error");
        }
    }

    const inputClass = (fieldName: string) => 
        `w-full bg-zinc-900/50 text-zinc-100 p-3 border-l-2 border-y border-r ${error[fieldName] ? 'border-red-500/50 border-l-red-500 bg-red-950/10' : 'border-zinc-800 border-l-zinc-600 hover:border-zinc-700 focus:border-cyan-500/50 focus:border-l-cyan-400 focus:bg-cyan-950/10'} outline-none transition-all duration-300 font-mono placeholder:text-zinc-700`;

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
                            <span className="text-cyan-400">~/</span> Create_Node
                        </h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2">Initialize new hardware entry</p>
                    </div>
                    <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-[10px] text-cyan-400 uppercase tracking-widest">System Ready</span>
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
                        <input type="text" name="name" onChange={onHandleChange} placeholder="e.g. AuraBook Pro 15" className={inputClass('name')} />
                        {error.name && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.name}</span>}
                    </div>
                    
                    {/* Input Group: Price & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Value (INR)
                            </label>
                            <input type="number" name="price" onChange={onHandleChange} placeholder="0.00" className={inputClass('price')} />
                            {error.price && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.price}</span>}
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Available Units
                            </label>
                            <input type="number" name="stock" onChange={onHandleChange} placeholder="0" className={inputClass('stock')} />
                            {error.stock && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.stock}</span>}
                        </div>
                    </div>
                    
                    {/* Input Group: Image & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Visual Asset URL
                            </label>
                            <input type="text" name="image" onChange={onHandleChange} placeholder="https://..." className={inputClass('image')} />
                            {error.image && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.image}</span>}
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                                <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                                Classification
                            </label>
                            <select name="category" onChange={onHandleChange} className={`${inputClass('category')} cursor-pointer appearance-none`}>
                                <option value="" className="bg-zinc-950 text-zinc-500">-- Select Class --</option>
                                {categories.map(c => <option key={c} value={c} className="bg-zinc-950">{c}</option>)}
                            </select>
                            {error.category && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.category}</span>}
                        </div>
                    </div>
                    
                    {/* Input Group: Description */}
                    <div className="group">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 mb-2 flex items-center gap-2 tracking-[0.2em]">
                            <span className="w-1 h-3 bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></span>
                            Tech Specifications
                        </label>
                        <textarea name="description" onChange={onHandleChange} rows={5} placeholder="Enter hardware parameters..." className={`${inputClass('description')} resize-y`}></textarea>
                        {error.description && <span className="text-[10px] text-red-400 uppercase tracking-widest mt-2 block">! {error.description}</span>}
                    </div>

                    {/* Execution Button */}
                    <div className="pt-4">
                        <button type="submit" className="relative w-full group border border-cyan-500 bg-transparent py-5 overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-950">
                            {/* Hover Fill Effect */}
                            <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            
                            {/* Button Text */}
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                <span className="text-cyan-400 group-hover:text-zinc-950 font-bold uppercase tracking-[0.3em] text-xs transition-colors">
                                    [ Execute Upload Sequence ]
                                </span>
                            </div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}