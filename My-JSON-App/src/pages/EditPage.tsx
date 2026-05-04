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

    const inputClass = (fieldName: string) => `w-full border ${error[fieldName] ? 'border-red-500' : 'border-slate-200'} rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 transition-all`;

    return (
        <div className="max-w-2xl mx-auto py-6">
            <h1 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Edit Gadget Details</h1>
            <form onSubmit={onHandleSubmit} className="space-y-5">
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Product Name</label>
                    <input type="text" name="name" value={productData.name} onChange={onHandleChange} className={inputClass('name')} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Price (₹)</label>
                        <input type="number" name="price" value={productData.price} onChange={onHandleChange} className={inputClass('price')} />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Stock</label>
                        <input type="number" name="stock" value={productData.stock} onChange={onHandleChange} className={inputClass('stock')} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Image URL</label>
                        <input type="text" name="image" value={productData.image} onChange={onHandleChange} className={inputClass('image')} />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Category</label>
                        <select name="category" value={productData.category} onChange={onHandleChange} className={inputClass('category')}>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold uppercase text-slate-500 ml-1">Description</label>
                    <textarea name="description" value={productData.description} onChange={onHandleChange} rows={4} className={inputClass('description')}></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-indigo-600 active:scale-95 transition-all">Save Changes</button>
                </div>
            </form>
        </div>
    );
}