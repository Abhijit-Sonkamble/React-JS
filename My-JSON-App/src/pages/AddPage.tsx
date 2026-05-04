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

    const inputClass = (fieldName: string) => `w-full border ${error[fieldName] ? 'border-red-500' : 'border-slate-200'} rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all`;

    return (
        <div className="max-w-2xl mx-auto py-6">
            <h1 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Add New Gadget</h1>
            <form onSubmit={onHandleSubmit} className="space-y-5">
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Product Name</label>
                    <input type="text" name="name" onChange={onHandleChange} placeholder="e.g. AuraBook Pro 15" className={inputClass('name')} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Price (₹)</label>
                        <input type="number" name="price" onChange={onHandleChange} className={inputClass('price')} />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Stock</label>
                        <input type="number" name="stock" onChange={onHandleChange} className={inputClass('stock')} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Image URL</label>
                        <input type="text" name="image" onChange={onHandleChange} className={inputClass('image')} />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Category</label>
                        <select name="category" onChange={onHandleChange} className={inputClass('category')}>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Description</label>
                    <textarea name="description" onChange={onHandleChange} rows={4} className={inputClass('description')}></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all mt-4">
                    Upload to Inventory
                </button>
            </form>
        </div>
    );
}