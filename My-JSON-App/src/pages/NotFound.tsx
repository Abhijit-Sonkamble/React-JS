import { useNavigate } from "react-router";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-8xl md:text-9xl font-black text-slate-200 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase mb-6">Device Not Found</h2>
            <p className="text-slate-500 font-medium mb-10 max-w-md">The page or gadget you are looking for has been moved or doesn't exist.</p>
            <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 transition-colors shadow-xl active:scale-95">
                Return to Store
            </button>
        </div>
    );
}