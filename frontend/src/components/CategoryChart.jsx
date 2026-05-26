import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { LayoutGrid } from 'lucide-react';

function CategoryChart({ data }) {
    const grouped = {};

    data.forEach(item => {
        grouped[item.category] = (grouped[item.category] || 0) + 1;
    });

    const chartData = Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key]
    }));

    // Premium UI cohesive color palette
    const COLORS = [
        '#6366f1', // Indigo
        '#8b5cf6', // Violet
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#10b981', // Emerald
        '#06b6d4'  // Cyan
    ];

    return (
        <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl">
            <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <LayoutGrid className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wider uppercase">
                    Orders by Category
                </h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={4}
                        stroke="rgba(15, 23, 42, 0.8)"
                        strokeWidth={2}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ 
                            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)', 
                            borderRadius: '12px', 
                            color: '#fff',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#94a3b8' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CategoryChart;