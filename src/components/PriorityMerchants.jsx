import React from 'react';
import { useSelector } from 'react-redux';
import { Star, TrendingUp } from 'lucide-react';
import { RiskBadge } from './RiskBadge';

export const PriorityMerchants = () => {
  const merchants = useSelector(state => state.merchants.merchants);
  
  const topPriority = [...merchants]
    .map(m => ({ ...m, priorityScore: m.riskScore * m.mrr }))
    .filter(m => m.priorityScore > 0)
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  if (topPriority.length === 0) return null;

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-indigo-900/5 border border-white overflow-hidden p-6 mb-6">
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-900">Priority Merchants</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">Top 5 accounts ranked by Priority Score (Risk Score × MRR).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topPriority.map((merchant, idx) => (
          <div key={merchant.id} className="bg-white/70 border border-white rounded-xl p-4 shadow-sm relative overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <span className="text-6xl font-black text-indigo-900">#{idx + 1}</span>
            </div>
            <div className="relative z-10">
              <p className="font-bold text-gray-900 truncate" title={merchant.name}>{merchant.name}</p>
              <p className="text-xs text-gray-500 mb-2">{merchant.plan} • {formatCurrency(merchant.mrr)}</p>
              <div className="flex justify-between items-center mt-3">
                <RiskBadge level={merchant.riskLevel} />
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Priority Score</span>
                  <span className="text-sm font-black text-indigo-900 flex items-center justify-end">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {merchant.priorityScore.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
