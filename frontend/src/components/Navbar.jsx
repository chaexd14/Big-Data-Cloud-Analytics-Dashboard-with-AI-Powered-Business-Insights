import { TrendingUp, Activity } from 'lucide-react';

function Navbar() {
    return (
        <header className="bg-[#0b0f19]/80 border-b border-slate-800/60 sticky top-0 z-50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {/* Visual accent: Purple-indigo gradient sphere with icon */}
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0b0f19] rounded-full animate-ping" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                            Antigravity <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">Cloud</span>
                        </h1>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide uppercase">Big Data Analytics Portal</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg shadow-sm">
                        <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse-glow" />
                        <span>Core API: Online</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;