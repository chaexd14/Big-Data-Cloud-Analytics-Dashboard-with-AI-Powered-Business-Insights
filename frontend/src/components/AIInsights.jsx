import { useState } from 'react';
import API from '../api/api';
import { BrainCircuit, Sparkles, Loader2 } from 'lucide-react';

function AIInsights() {
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(false);

    const generateInsight = async () => {
        try {
            setLoading(true);
            const response = await API.get('/ai/generate-insight');
            setInsight(response.data.insight);
        } catch (error) {
            console.error("AI Insight dispatch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const parseInlineStyles = (text) => {
        if (!text) return '';
        const parts = text.split('**');
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <strong key={index} className="font-semibold text-white">{part}</strong>;
            }
            return part;
        });
    };

    const renderInsightContent = (text) => {
        if (!text) return null;
        
        const lines = text.split('\n');
        return (
            <div className="space-y-3.5">
                {lines.map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;

                    // 1. Detect headers
                    if (trimmed.startsWith('## ')) {
                        const headingText = trimmed.replace(/^##\s+/, '');
                        return (
                            <h3 key={idx} className="text-base font-extrabold text-white mt-6 mb-3 pb-1.5 flex items-center gap-2 border-b border-slate-800/80">
                                <span className="w-1 h-4.5 bg-indigo-500 rounded-full" />
                                {parseInlineStyles(headingText)}
                            </h3>
                        );
                    }
                    if (trimmed.startsWith('### ')) {
                        const headingText = trimmed.replace(/^###\s+/, '');
                        return (
                            <h4 key={idx} className="text-sm font-bold text-indigo-400 mt-4 mb-2">
                                {parseInlineStyles(headingText)}
                            </h4>
                        );
                    }

                    // 2. Detect Blockquotes or lines fully enclosed in double quotes
                    if (trimmed.startsWith('>') || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                        const quoteText = trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '');
                        return (
                            <blockquote key={idx} className="border-l-2 border-indigo-500/60 pl-4 py-2 my-4 italic text-slate-300 bg-indigo-950/20 rounded-r-lg">
                                "{parseInlineStyles(quoteText)}"
                            </blockquote>
                        );
                    }

                    // 3. Detect bullet/numbered lists
                    const isBullet = trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+[\s.)]/.test(trimmed);
                    if (isBullet) {
                        const content = trimmed.replace(/^([-*\d]+[\s.)]*)\s*/, '');
                        return (
                            <div key={idx} className="flex items-start space-x-3 text-sm text-slate-300 pl-2">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                <span className="leading-relaxed">{parseInlineStyles(content)}</span>
                            </div>
                        );
                    }

                    // 4. Default paragraph
                    return (
                        <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                            {parseInlineStyles(trimmed)}
                        </p>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="glass-panel glass-panel-glow p-6 rounded-2xl shadow-xl relative overflow-hidden border border-indigo-500/20 group">
            {/* Ambient inner card glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse-glow">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-white tracking-wide">AI Business Insights</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Generate real-time operational optimization recommendations.</p>
                    </div>
                </div>

                <button
                    onClick={generateInsight}
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-3.5 w-3.5 text-white" />
                            <span>Analyzing Metrics...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                            <span>Generate Insight</span>
                        </>
                    )}
                </button>
            </div>

            {/* Display Panel output space */}
            {insight || loading ? (
                <div className="mt-6 pt-6 border-t border-slate-800/80 relative z-10">
                    {loading ? (
                        <div className="space-y-3.5 animate-pulse bg-slate-950/20 p-5 rounded-2xl border border-slate-900">
                            <div className="h-3 bg-slate-800/60 rounded w-3/4"></div>
                            <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
                            <div className="h-3 bg-slate-800/60 rounded w-2/3"></div>
                        </div>
                    ) : (
                        <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/40 shadow-inner">
                            {renderInsightContent(insight)}
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-6 text-center py-5 border-t border-slate-800/40 relative z-10">
                    <p className="text-xs text-slate-500 italic">No insights compiled yet. Trigger analytics computation above.</p>
                </div>
            )}
        </div>
    );
}

export default AIInsights;