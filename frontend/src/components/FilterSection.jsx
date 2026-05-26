import { SlidersHorizontal } from 'lucide-react';

function FilterSection({ categories, selected, setSelected }) {
    return (
        <div className="glass-panel glass-panel-glow p-5 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl shadow-black/10">
            <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Filter Operational Workspace</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Segment real-time analytics by food classifications.</p>
                </div>
            </div>

            {/* Responsive Pill Selection Bar */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                <button
                    onClick={() => setSelected('All')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                        selected === 'All'
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-600/20 scale-[1.03]'
                            : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                >
                    All Categories
                </button>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(category)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                            selected === category
                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-600/20 scale-[1.03]'
                                : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterSection;