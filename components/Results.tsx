
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Candidate } from '../types';
import { TrendingUp, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { getElectionAnalysis } from '../services/geminiService';

interface ResultsProps {
  candidates: Candidate[];
}

const Results: React.FC<ResultsProps> = ({ candidates }) => {
  const [analysis, setAnalysis] = useState('Analyzing voting patterns...');
  const [loading, setLoading] = useState(false);

  const data = candidates.map(c => ({
    name: c.name,
    votes: c.voteCount,
    party: c.party
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const fetchAnalysis = async () => {
    setLoading(true);
    const result = await getElectionAnalysis(candidates);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, [candidates]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Live Election Results</h1>
          <p className="text-slate-500 text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500" /> Secure, real-time data synchronization.
          </p>
        </div>
        <button 
          onClick={fetchAnalysis}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-2xl font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
        >
          <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> Update Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Vote Distribution</h2>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="votes" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight & Pie */}
        <div className="space-y-8">
          <div className="bg-indigo-600 text-white rounded-3xl p-8 shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 text-indigo-200" /> AI Poll Analysis
            </h3>
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 relative z-10">
              <p className="text-indigo-50 leading-relaxed italic text-lg">
                "{analysis}"
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
             <h3 className="text-xl font-bold mb-6 text-slate-900">Market Share</h3>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={data}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="votes"
                   >
                     {data.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Leaderboard */}
      <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Detailed Standing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.sort((a, b) => b.voteCount - a.voteCount).map((c, idx) => (
            <div key={c.id} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
               <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold text-xl ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}`}>
                 {idx + 1}
               </div>
               <div className="flex-grow">
                 <p className="font-bold text-slate-900">{c.name}</p>
                 <p className="text-xs text-slate-500 font-medium uppercase">{c.party}</p>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-black text-indigo-600">{c.voteCount}</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Votes</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
