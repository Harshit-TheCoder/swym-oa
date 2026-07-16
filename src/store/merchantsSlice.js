import { createSlice } from '@reduxjs/toolkit';
import { mockMerchantsData } from '../data/mockMerchants';
import { RiskScoringStrategy } from '../domain/RiskScoringStrategy';

const strategy = new RiskScoringStrategy();
const processedMerchants = mockMerchantsData.map(merchant => {
  const { score, level, recommendation, breakdown, signals } = strategy.calculateScore(merchant);
  return {
    ...merchant,
    riskScore: score,
    riskLevel: level,
    recommendation,
    breakdown,
    signals
  };
});

const initialState = {
  merchants: processedMerchants,
  searchQuery: '',
  riskFilter: 'All', // 'All', 'Low', 'Medium', 'High'
  sortBy: 'riskScore', // 'riskScore', 'mrr'
  sortDirection: 'desc'
};

const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setRiskFilter: (state, action) => {
      state.riskFilter = action.payload;
    },
    setSort: (state, action) => {
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortDirection = 'desc';
      }
    }
  }
});

export const { setSearchQuery, setRiskFilter, setSort } = merchantsSlice.actions;
export default merchantsSlice.reducer;
