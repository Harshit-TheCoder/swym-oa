import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingDown, AlertCircle, MessageSquare, CreditCard, Activity } from 'lucide-react';
import { RiskBadge } from './RiskBadge';
import { ProgressBar } from './ProgressBar';

export const MerchantDetailsDrawer = ({ merchant, onClose }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const getIconForFactor = (factor) => {
    if (factor.includes('Billing')) return <CreditCard className="w-5 h-5 text-red-500" />;
    if (factor.includes('Login')) return <Activity className="w-5 h-5 text-orange-500" />;
    if (factor.includes('Decline')) return <TrendingDown className="w-5 h-5 text-yellow-500" />;
    if (factor.includes('NPS')) return <MessageSquare className="w-5 h-5 text-purple-500" />;
    return <AlertCircle className="w-5 h-5 text-blue-500" />;
  };

  const riskExplanations = {
    'Billing Issue': 'Billing issues may lead to involuntary churn.',
    'Login Inactivity': 'Login inactivity indicates declining engagement.',
    'Order Decline': 'Falling order volume suggests reduced business performance.',
    'Wishlist Decline': 'Declining wishlist activity may indicate lower customer interest.',
    'Low NPS': 'Low NPS reflects customer dissatisfaction.',
    'High Support Tickets': 'High support volume suggests unresolved friction.'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl border-l border-white h-full shadow-[0_0_50px_rgba(49,46,129,0.2)] flex flex-col overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/40 backdrop-blur-xl border-b border-white/50 p-6 flex justify-between items-center z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{merchant.name}</h2>
              <p className="text-sm text-gray-500">{merchant.id} • {merchant.plan} Plan</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Risk Assessment</h3>
                <RiskBadge level={merchant.riskLevel} />
              </div>
              {merchant.primaryRiskFactor && (
                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Risk: </span>
                  <span className="text-sm font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded ml-1">{merchant.primaryRiskFactor}</span>
                </div>
              )}
              <div className="mb-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-3xl font-black text-gray-900">{merchant.riskScore}</span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
                <ProgressBar score={merchant.riskScore} level={merchant.riskLevel} />
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6">
                <h4 className="font-semibold text-blue-900 mb-1 flex items-center">
                  Recommended Action
                </h4>
                <p className="text-blue-800 font-medium">{merchant.recommendation.action}</p>
                <p className="text-blue-700 text-sm mt-1">{merchant.recommendation.reason}</p>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Score Breakdown</h3>
              {merchant.breakdown.length > 0 ? (
                <div className="space-y-3">
                  {merchant.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-start p-3 bg-white/60 backdrop-blur-sm shadow-sm rounded-xl border border-white">
                      <div className="mt-0.5 mr-3">
                        {getIconForFactor(item.factor)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">{item.factor}</span>
                          <span className="font-bold text-red-600">+{item.score}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 mb-2">{item.details}</p>
                        <div className="bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 text-xs text-indigo-800 font-medium">
                          {riskExplanations[item.factor] || 'Metric deviation indicates risk.'}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 mt-2 border-t-2 border-dashed border-gray-300 flex justify-between items-center px-1">
                    <span className="font-bold text-gray-700">Total Risk Score:</span>
                    <span className="font-black text-lg text-gray-900">
                      {merchant.riskScore} <span className="text-sm font-bold text-gray-500">({merchant.riskLevel} Risk)</span>
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No significant risk factors identified.</p>
              )}
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Raw Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">MRR</span>
                  <span className="font-medium text-gray-900">${merchant.mrr.toLocaleString()}</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">Days Inactive</span>
                  <span className="font-medium text-gray-900">{merchant.daysSinceLastLogin}</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">Order Change (30d)</span>
                  <span className={`font-medium ${merchant.orderVolumeChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {merchant.orderVolumeChange}%
                  </span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">Wishlist Change (30d)</span>
                  <span className={`font-medium ${merchant.wishlistActivityChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {merchant.wishlistActivityChange}%
                  </span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">Support Tickets (30d)</span>
                  <span className="font-medium text-gray-900">{merchant.supportTickets}</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                  <span className="text-xs text-gray-500 block">NPS</span>
                  <span className={`font-medium ${merchant.nps < 6 ? 'text-red-600' : 'text-green-600'}`}>
                    {merchant.nps}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
