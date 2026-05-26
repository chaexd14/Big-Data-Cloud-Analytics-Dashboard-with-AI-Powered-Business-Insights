import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import { Star } from 'lucide-react';

function RatingChart({ data }) {
    const grouped = {};

    data.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item.rating);
    });

    const chartData = Object.keys(grouped).map(key => ({
        category: key,
        rating: parseFloat((grouped[key].reduce((a, b) => a + b, 0) / grouped[key].length).toFixed(2))
    }));

    return (
        <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl">
            <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Star className="w-4 h-4 fill-amber-400/10" />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wider uppercase">
                    Average Ratings by Category
                </h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <defs>
                        <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.6} />
                    <XAxis 
                        dataKey="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                        domain={[0, 5]} 
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                        contentStyle={{ 
                            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)', 
                            borderRadius: '12px', 
                            color: '#fff',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                        itemStyle={{ color: '#e2e8f0' }}
                        labelStyle={{ fontWeight: 'bold', color: '#6366f1' }}
                    />
                    <Bar dataKey="rating" fill="url(#ratingGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RatingChart;