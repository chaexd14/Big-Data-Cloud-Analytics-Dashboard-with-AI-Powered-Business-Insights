import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import { Clock } from 'lucide-react';

function DeliveryChart({ data }) {
    return (
        <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl">
            <div className="flex items-center space-x-2.5 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Clock className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-white tracking-wider uppercase">
                    Delivery Time Trends (mins)
                </h2>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={data.slice(0, 20)} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                    <defs>
                        <linearGradient id="deliveryGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.6} />
                    <XAxis 
                        dataKey="restaurant" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                    />
                    <Tooltip
                        cursor={{ stroke: 'rgba(255, 255, 255, 0.15)', strokeDasharray: '3 3' }}
                        contentStyle={{ 
                            backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                            border: '1px solid rgba(255, 255, 255, 0.08)', 
                            borderRadius: '12px', 
                            color: '#fff',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                        itemStyle={{ color: '#e2e8f0' }}
                        labelStyle={{ fontWeight: 'bold', color: '#8b5cf6' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="delivery_time"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#deliveryGrad)"
                        dot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2, fill: '#0b0f19' }}
                        activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DeliveryChart;