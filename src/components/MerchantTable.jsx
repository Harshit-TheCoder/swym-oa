import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../store/merchantsSlice';
import { RiskBadge } from './RiskBadge';
import { ProgressBar } from './ProgressBar';
import { MerchantDetailsDrawer } from './MerchantDetailsDrawer';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export const MerchantTable = () => {
  const dispatch = useDispatch();
  const { merchants, searchQuery, riskFilter, sortBy, sortDirection } = useSelector(state => state.merchants);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...merchants];
    
    // Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q));
    }
    if (riskFilter !== 'All') {
      result = result.filter(m => m.riskLevel === riskFilter);
    }
    
    // Sort
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [merchants, searchQuery, riskFilter, sortBy, sortDirection]);

  const handleSort = (field) => {
    dispatch(setSort(field));
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 ml-1 inline text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4 ml-1 inline text-blue-600" /> : <ArrowDown className="w-4 h-4 ml-1 inline text-blue-600" />;
  };

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <>
      <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-indigo-900/5 border border-white mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="text-sm font-semibold text-gray-600 flex items-center">
          <span className="mr-3">Sort by:</span>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => handleSort('name')} className="flex items-center px-3 py-1.5 bg-white/40 hover:bg-white/80 rounded-lg border border-white transition-colors">
              Name <SortIcon field="name" />
            </button>
            <button onClick={() => handleSort('plan')} className="flex items-center px-3 py-1.5 bg-white/40 hover:bg-white/80 rounded-lg border border-white transition-colors">
              Plan <SortIcon field="plan" />
            </button>
            <button onClick={() => handleSort('mrr')} className="flex items-center px-3 py-1.5 bg-white/40 hover:bg-white/80 rounded-lg border border-white transition-colors">
              MRR <SortIcon field="mrr" />
            </button>
            <button onClick={() => handleSort('riskScore')} className="flex items-center px-3 py-1.5 bg-white/40 hover:bg-white/80 rounded-lg border border-white transition-colors">
              Risk Score <SortIcon field="riskScore" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Showing {filteredAndSorted.length} merchants
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white text-center text-gray-500 shadow-xl shadow-indigo-900/5">
          No merchants found matching the criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSorted.map((merchant) => (
            <div key={merchant.id} className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg shadow-indigo-900/5 border border-white p-5 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 truncate" title={merchant.name}>{merchant.name}</h3>
                    <p className="text-xs text-gray-500">{merchant.id}</p>
                  </div>
                  <RiskBadge level={merchant.riskLevel} />
                </div>
                
                <div className="flex justify-between items-center bg-white/40 p-3 rounded-xl border border-white mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Plan</span>
                    <span className="text-sm font-medium text-gray-800">{merchant.plan}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">MRR</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(merchant.mrr)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-end justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Risk Score</span>
                    <span className="text-xl font-black text-gray-900">{merchant.riskScore}</span>
                  </div>
                  <ProgressBar score={merchant.riskScore} level={merchant.riskLevel} />
                </div>

                <div className="mt-auto pt-4 border-t border-white/50 flex justify-between items-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${merchant.billingStatus === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {merchant.billingStatus}
                  </span>
                  
                  <button 
                    onClick={() => setSelectedMerchant(merchant)}
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-4 rounded-lg transition-colors shadow-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedMerchant && (
        <MerchantDetailsDrawer 
          merchant={selectedMerchant} 
          onClose={() => setSelectedMerchant(null)} 
        />
      )}
    </>
  );
};
