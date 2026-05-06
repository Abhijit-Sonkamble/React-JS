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
        <div className="container mx-auto py-12 px-4 font-mono text-zinc-100 min-h-[80vh]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-widest text-zinc-100 flex items-center gap-3">
                        <span className="text-cyan-400">~/</span> SYS.INVENTORY_DB
                    </h1>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2">Manage restricted hardware catalog</p>
                </div>
                <div className="border border-zinc-800 bg-zinc-950 px-6 py-3 flex gap-4 items-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Total_Records</span>
                    <span className="text-xl font-bold text-cyan-400">[{totalItems.toString().padStart(3, '0')}]</span>
                </div>
            </div>

            {/* Terminal Data Table */}
            <div className="relative border border-zinc-800 bg-zinc-950/80 p-1 sm:p-2 shadow-2xl backdrop-blur-sm">
                
                {/* Decorative Frame Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead className="bg-zinc-900/50 border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Idx.</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Identity</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Class</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Value</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Units</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Data</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-center">Sys.Cmd</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {currentProducts.map((prod, index) => (
                                <tr key={prod.id} className="hover:bg-cyan-950/10 transition-colors group">
                                    <td className="px-6 py-5 text-xs text-zinc-600 font-bold tracking-widest">
                                        [{String(startIndex + index + 1).padStart(2, '0')}]
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="border border-zinc-800 p-1 bg-zinc-950 group-hover:border-cyan-500/50 transition-colors">
                                                <img src={prod.image} className="w-10 h-10 object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="" />
                                            </div>
                                            <span className="font-bold text-zinc-300 uppercase tracking-widest text-xs group-hover:text-cyan-100 transition-colors">{prod.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/70">{prod.category}</td>
                                    <td className="px-6 py-5 text-sm font-bold text-zinc-300 tracking-wider">₹{prod.price}</td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border ${prod.stock < 5 ? 'border-red-500/50 text-red-400 bg-red-950/30' : 'border-zinc-700 text-zinc-400 bg-zinc-900'}`}>
                                            {prod.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-[11px] text-zinc-500 max-w-[200px] truncate tracking-wide" title={prod.description}>{prod.description}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center gap-3">
                                            <button 
                                                onClick={() => navigate(`/edit-product/${prod.id}`)} 
                                                className="p-2 text-zinc-500 hover:text-cyan-400 hover:bg-cyan-950/30 border border-transparent hover:border-cyan-500/30 transition-all"
                                                title="Edit Node"
                                            >
                                                <HiPencilAlt size={18} />
                                            </button>
                                            <button 
                                                onClick={(e) => handleDelete(e, prod.id)} 
                                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-all"
                                                title="Delete Node"
                                            >
                                                <HiTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {currentProducts.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <span className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-xs">&gt; DB_EMPTY_NO_RECORDS</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Logic */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
                <div className="flex items-center gap-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-transparent border border-zinc-800 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:border-zinc-800 disabled:hover:text-zinc-400 transition-colors">Prev</button>
                    <div className="flex gap-2">
                        {[...Array(Math.min(totalPages, 4))].map((_, index) => (
                            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-9 h-9 flex items-center justify-center text-xs font-bold transition-all border ${currentPage === index + 1 ? 'border-cyan-400 bg-cyan-950/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'border-zinc-800 text-zinc-600 hover:border-cyan-500/50 hover:text-cyan-400'}`}>
                                {index + 1}
                            </button>
                        ))}
                        {totalPages > 4 && <span className="flex items-end px-2 text-zinc-600 font-bold tracking-widest">...</span>}
                    </div>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-transparent border border-zinc-800 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:border-zinc-800 disabled:hover:text-zinc-400 transition-colors">Next</button>
                </div>
                
                <div className="flex items-center gap-4 border border-zinc-800 bg-zinc-950 px-4 py-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Rows_Per_Page</span>
                    <div className="relative">
                        <select value={itemPerPage} onChange={(e) => { setItemPerPage(Number(e.target.value)); setCurrentPage(1); }} className="bg-transparent font-bold text-cyan-400 outline-none cursor-pointer text-xs appearance-none pr-4">
                            <option value={5} className="bg-zinc-950">05</option>
                            <option value={10} className="bg-zinc-950">10</option>
                            <option value={20} className="bg-zinc-950">20</option>
                        </select>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500 text-[8px]">▼</div>
                    </div>
                </div>
            </div>
        </div>
    );
}