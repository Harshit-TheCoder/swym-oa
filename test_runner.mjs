import { RiskScoringStrategy } from './src/domain/RiskScoringStrategy.js';

const strategy = new RiskScoringStrategy();

const baseMerchant = {
  id: 'T000',
  name: 'Test Merchant',
  plan: 'Growth',
  mrr: 1000,
  daysSinceLastLogin: 5,
  wishlistActivityChange: 10,
  orderVolumeChange: 10,
  supportTickets: 1,
  nps: 9,
  billingStatus: 'Healthy'
};

const testCases = [
  {
    name: '1. Healthy Merchant',
    input: { ...baseMerchant },
  },
  {
    name: '2. Billing Issue Only',
    input: { ...baseMerchant, billingStatus: 'Payment Failed' },
  },
  {
    name: '3. Login Inactivity Only',
    input: { ...baseMerchant, daysSinceLastLogin: 35 },
  },
  {
    name: '4. Order Decline Only',
    input: { ...baseMerchant, orderVolumeChange: -45 },
  },
  {
    name: '5. Wishlist Decline Only',
    input: { ...baseMerchant, wishlistActivityChange: -45 },
  },
  {
    name: '6. Low NPS Only',
    input: { ...baseMerchant, nps: 4 },
  },
  {
    name: '7. High Support Tickets Only',
    input: { ...baseMerchant, supportTickets: 10 },
  },
  {
    name: '8. Multiple Moderate Signals',
    input: { ...baseMerchant, daysSinceLastLogin: 35, orderVolumeChange: -45, wishlistActivityChange: -45 },
  },
  {
    name: '9. Billing + Low NPS',
    input: { ...baseMerchant, billingStatus: 'Overdue', nps: 4 },
  },
  {
    name: '10. Maximum Risk',
    input: {
      ...baseMerchant,
      billingStatus: 'Payment Failed',
      daysSinceLastLogin: 40,
      orderVolumeChange: -50,
      wishlistActivityChange: -50,
      nps: 2,
      supportTickets: 12
    }
  },
  {
    name: '11. Boundary Test (Login = 30)',
    input: { ...baseMerchant, daysSinceLastLogin: 30 },
  },
  {
    name: '12. Boundary Test (Support = 8)',
    input: { ...baseMerchant, supportTickets: 8 },
  },
  {
    name: '13. Boundary Test (NPS = 6)',
    input: { ...baseMerchant, nps: 6 },
  },
  {
    name: '14. Boundary Test (Order = -40)',
    input: { ...baseMerchant, orderVolumeChange: -40 },
  },
  {
    name: '15. Boundary Test (Wishlist = -40)',
    input: { ...baseMerchant, wishlistActivityChange: -40 },
  }
];

console.log("Running 15 Edge Cases:\n=======================");
for (const tc of testCases) {
  const result = strategy.calculateScore(tc.input);
  console.log(`\n${tc.name}`);
  console.log(`- Score: ${result.score}`);
  console.log(`- Risk Level: ${result.level}`);
  console.log(`- Primary Factor: ${result.primaryRiskFactor}`);
  console.log(`- Action: ${result.recommendation.action}`);
  console.log(`- Reason: ${result.recommendation.reason}`);
}
