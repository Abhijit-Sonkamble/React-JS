import { Outlet } from "react-router";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="min-h-[500px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}