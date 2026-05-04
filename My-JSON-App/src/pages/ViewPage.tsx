import { useEffect, useState } from "react";
import type { ProductFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../services/ProductServices";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

export default function ViewProductPage() {
    const [allProducts, setAllProducts] = useState<ProductFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(5);
    const navigate = useNavigate();

    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / itemPerPage) || 1;
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);

    useEffect(() => { getProducts(); }, []);

    const getProducts = async () => {
        const data = await fetchAllProducts();
        setAllProducts(data);
    };

    const handleDelete = async (e: any, id: string) => {
        e.preventDefault();
        const updatedList = allProducts.filter(prod => prod.id !== id);
        setAllProducts(updatedList);
        const status = await deleteProduct(id);
        if (status) {
            toast.success("🗑️ Product removed!");
            const newTotalPages = Math.ceil(updatedList.length / itemPerPage) || 1;
            if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
        } else {
            toast.error("❌ Server error");
            getProducts();
        }
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Tech Inventory</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage your premium gadgets catalog</p>
                </div>
                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200 flex gap-4 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Items</span>
                    <span className="text-2xl font-black text-indigo-600">{totalItems}</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">No.</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">Product</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">Category</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">Price</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">Stock</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500">Description</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentProducts.map((prod, index) => (
                                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-5 text-sm font-bold text-slate-400">{startIndex + index + 1}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <img src={prod.image} className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200" alt="" />
                                            <span className="font-bold text-slate-900">{prod.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[10px] font-black uppercase text-indigo-600">{prod.category}</td>
                                    <td className="px-6 py-5 font-black text-slate-900">₹{prod.price}</td>
                                    <td className="px-6 py-5">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${prod.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {prod.stock} Units
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-xs font-medium text-slate-500 max-w-[200px] truncate" title={prod.description}>{prod.description}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => navigate(`/edit-product/${prod.id}`)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"><HiPencilAlt size={20} /></button>
                                            <button onClick={(e) => handleDelete(e, prod.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><HiTrash size={20} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Logic */}
            <div className="mt-8 flex items-center justify-between gap-6 px-2">
                <div className="flex items-center gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30">Prev</button>
                    <div className="flex gap-1.5">
                        {[...Array(Math.min(totalPages, 4))].map((_, index) => (
                            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === index + 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-900'}`}>
                                {index + 1}
                            </button>
                        ))}
                        {totalPages > 4 && <span className="flex items-end px-2 text-slate-400 font-bold tracking-widest">...</span>}
                    </div>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30">Next</button>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase text-slate-500">Show</span>
                    <select value={itemPerPage} onChange={(e) => { setItemPerPage(Number(e.target.value)); setCurrentPage(1); }} className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer text-sm">
                        <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
}