import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setRiskFilter, setSort } from './store/merchantsSlice';
import { SummaryCards } from './components/SummaryCards';
import { PriorityMerchants } from './components/PriorityMerchants';
import { MerchantTable } from './components/MerchantTable';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

function App() {
  const dispatch = useDispatch();
  const { searchQuery, riskFilter } = useSelector(state => state.merchants);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <header className="bg-white/60 backdrop-blur-xl border-b border-white/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-blue-200">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Merchant Churn Risk</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
            <span>Customer Success Internal Tool</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm">Monitor merchant health and identify accounts requiring immediate attention based on engagement and revenue metrics.</p>
        </div>

        <SummaryCards />
        <PriorityMerchants />

        <div className="bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-xl shadow-indigo-900/5 border border-white mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 hover:bg-white transition-colors outline-none"
              placeholder="Search merchants by name or ID..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full sm:w-40 pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-white/50 hover:bg-white transition-colors"
                value={riskFilter}
                onChange={(e) => dispatch(setRiskFilter(e.target.value))}
              >
                <option value="All">All Risk Levels</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full sm:w-40 pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg border bg-white/50 hover:bg-white transition-colors"
                value={useSelector(state => state.merchants.sortBy)}
                onChange={(e) => dispatch(setSort(e.target.value))}
              >
                <option value="riskScore">Risk Score</option>
                <option value="mrr">MRR</option>
                <option value="name">Merchant Name</option>
                <option value="plan">Plan Type</option>
              </select>
            </div>
          </div>
        </div>

        <MerchantTable />
      </main>
    </div>
  );
}

export default App;
