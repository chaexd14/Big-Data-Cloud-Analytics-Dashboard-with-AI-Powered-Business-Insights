import { Layers, Star, CircleDollarSign, ArrowUpRight } from 'lucide-react';

function KPICards({ data }) {
    const totalRecords = data.length;

    const averageRating = totalRecords > 0
        ? (data.reduce((acc, item) => acc + item.rating, 0) / totalRecords).toFixed(2)
        : '0.00';

    const maxOrder = totalRecords > 0
        ? Math.max(...data.map(item => item.order_value))
        : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Records Card */}
            <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300 hover:translate-y-[-4px] hover:border-indigo-500/40 hover:shadow-indigo-500/5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-300" />
                <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Total Records</span>
                    <p className="text-3xl font-extrabold text-white tracking-tight leading-none">
                        {totalRecords.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="flex items-center text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.4%
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
                    </div>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-inner">
                    <Layers className="w-6 h-6" />
                </div>
            </div>

            {/* Average Rating Card */}
            <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300 hover:translate-y-[-4px] hover:border-amber-500/40 hover:shadow-amber-500/5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300" />
                <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Average Rating</span>
                    <p className="text-3xl font-extrabold text-white tracking-tight leading-none">
                        {averageRating} <span className="text-base font-normal text-slate-500">/ 5.0</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="flex items-center text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +4.2%
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">Customer satisfaction</span>
                    </div>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-inner animate-pulse-glow">
                    <Star className="w-6 h-6 fill-amber-400/20 text-amber-400" />
                </div>
            </div>

            {/* Max Order Value Card */}
            <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300 hover:translate-y-[-4px] hover:border-emerald-500/40 hover:shadow-emerald-500/5 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-300" />
                <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Max Order Value</span>
                    <p className="text-3xl font-extrabold text-white tracking-tight leading-none">
                        ₱{maxOrder.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="flex items-center text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                            Peak order
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">operational high</span>
                    </div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-inner">
                    <CircleDollarSign className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

export default KPICards;