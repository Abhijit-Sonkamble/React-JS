import { Outlet } from "react-router";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono selection:bg-cyan-500 selection:text-zinc-950 relative">
      
      {/* Subtle Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Main App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          
          {/* Main Outlet Container - Terminal Frame Style */}
          <div className="relative min-h-[75vh] border border-zinc-800 bg-zinc-950/90 p-4 sm:p-8 backdrop-blur-md shadow-2xl">
            
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none"></div>

            {/* Glowing Top Edge Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

            {/* Injected Page Content */}
            <div className="relative z-10 h-full">
              <Outlet />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}