import React from 'react';
import { useSelector } from 'react-redux';
import { Users, AlertTriangle, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

export const SummaryCards = () => {
  const merchants = useSelector(state => state.merchants.merchants);
  
  const total = merchants.length;
  const high = merchants.filter(m => m.riskLevel === 'High').length;
  const medium = merchants.filter(m => m.riskLevel === 'Medium').length;
  const low = merchants.filter(m => m.riskLevel === 'Low').length;
  
  const mrrAtRisk = merchants
    .filter(m => m.riskLevel === 'High')
    .reduce((sum, m) => sum + m.mrr, 0);

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const cards = [
    { label: 'Total Merchants', value: total, icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'High Risk', value: high, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
    { label: 'Medium Risk', value: medium, icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { label: 'Low Risk', value: low, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'MRR at Risk', value: formatCurrency(mrrAtRisk), icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg shadow-indigo-900/5 border border-white p-5 flex items-center space-x-4 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20 relative overflow-hidden group">
          {/* Subtle 3D lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className={`p-3 rounded-xl ${card.bg} shadow-inner`}>
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 drop-shadow-sm">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
