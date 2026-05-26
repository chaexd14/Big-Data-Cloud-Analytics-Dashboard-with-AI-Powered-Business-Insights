import { useEffect, useState } from 'react';
import API from '../api/api';
import { Calendar } from 'lucide-react';

import Navbar from '../components/Navbar';
import KPICards from '../components/KPICards';
import RatingChart from '../components/RatingChart';
import CategoryChart from '../components/CategoryChart';
import DeliveryChart from '../components/DeliveryChart';
import FilterSection from '../components/FilterSection';
import AIInsights from '../components/AIInsights';

function Dashboard() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await API.get('/analytics');
            setData(response.data);
        } catch (error) {
            console.error("Failed fetching analytics data:", error);
        }
    };

    const categories = [...new Set(data.map(item => item.category))];

    const filteredData = selectedCategory === 'All'
        ? data
        : data.filter(item => item.category === selectedCategory);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans antialiased relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <Navbar />

            {/* Main Content Wrapper */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 relative z-10">

                {/* Header Welcome Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            Operational Analytics Hub
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            Real-time intelligence on delivery timelines, categories, and customer satisfaction metrics.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 self-start md:self-center">
                        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Active
                        </div>
                        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                            {currentDate}
                        </div>
                    </div>
                </div>

                {/* Filters positioned elegantly at the top of the workspace */}
                <FilterSection
                    categories={categories}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                />

                {/* Key Metrics */}
                <KPICards data={filteredData} />

                {/* Main Visualization Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <RatingChart data={filteredData} />
                    <CategoryChart data={filteredData} />
                </div>

                {/* Secondary Insights & Full Width Charts */}
                <div className="grid grid-cols-1 gap-8">
                    <DeliveryChart data={filteredData} />
                    <AIInsights />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;