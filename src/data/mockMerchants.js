import { Merchant } from '../domain/Merchant.js';

export const mockMerchantsData = [
  new Merchant({ id: 'M001', name: 'Acme Corp', plan: 'Enterprise', mrr: 12000, daysSinceLastLogin: 4, wishlistActivityChange: 5, orderVolumeChange: 2, supportTickets: 2, nps: 9, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M002', name: 'Globex', plan: 'Growth', mrr: 3500, daysSinceLastLogin: 35, wishlistActivityChange: -10, orderVolumeChange: -5, supportTickets: 1, nps: 7, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M003', name: 'Soylent', plan: 'Starter', mrr: 500, daysSinceLastLogin: 12, wishlistActivityChange: -45, orderVolumeChange: -10, supportTickets: 0, nps: 8, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M004', name: 'Initech', plan: 'Enterprise', mrr: 15000, daysSinceLastLogin: 2, wishlistActivityChange: 0, orderVolumeChange: -50, supportTickets: 4, nps: 5, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M005', name: 'Umbrella Corp', plan: 'Growth', mrr: 4200, daysSinceLastLogin: 10, wishlistActivityChange: 2, orderVolumeChange: 5, supportTickets: 12, nps: 6, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M006', name: 'Massive Dynamic', plan: 'Enterprise', mrr: 25000, daysSinceLastLogin: 40, wishlistActivityChange: -50, orderVolumeChange: -45, supportTickets: 9, nps: 4, billingStatus: 'Overdue' }), 
  new Merchant({ id: 'M007', name: 'Stark Industries', plan: 'Enterprise', mrr: 50000, daysSinceLastLogin: 1, wishlistActivityChange: 10, orderVolumeChange: 15, supportTickets: 3, nps: 10, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M008', name: 'Wayne Ent.', plan: 'Enterprise', mrr: 45000, daysSinceLastLogin: 5, wishlistActivityChange: -5, orderVolumeChange: 0, supportTickets: 1, nps: 8, billingStatus: 'Payment Failed' }),
  new Merchant({ id: 'M009', name: 'LexCorp', plan: 'Growth', mrr: 8000, daysSinceLastLogin: 20, wishlistActivityChange: -10, orderVolumeChange: -15, supportTickets: 5, nps: 4, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M010', name: 'Cyberdyne', plan: 'Starter', mrr: 900, daysSinceLastLogin: 45, wishlistActivityChange: -5, orderVolumeChange: -2, supportTickets: 0, nps: 7, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M011', name: 'Aperture Science', plan: 'Growth', mrr: 6000, daysSinceLastLogin: 8, wishlistActivityChange: 15, orderVolumeChange: -55, supportTickets: 15, nps: 5, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M012', name: 'Black Mesa', plan: 'Enterprise', mrr: 18000, daysSinceLastLogin: 14, wishlistActivityChange: -60, orderVolumeChange: -20, supportTickets: 2, nps: 8, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M013', name: 'Buy n Large', plan: 'Growth', mrr: 7500, daysSinceLastLogin: 2, wishlistActivityChange: 8, orderVolumeChange: 12, supportTickets: 0, nps: 9, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M014', name: 'Monsters Inc.', plan: 'Starter', mrr: 400, daysSinceLastLogin: 25, wishlistActivityChange: -30, orderVolumeChange: -35, supportTickets: 7, nps: 6, billingStatus: 'Overdue' }),
  new Merchant({ id: 'M015', name: 'Wonka Ind.', plan: 'Enterprise', mrr: 22000, daysSinceLastLogin: 3, wishlistActivityChange: 20, orderVolumeChange: 25, supportTickets: 4, nps: 8, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M016', name: 'Tyrell Corp', plan: 'Growth', mrr: 5500, daysSinceLastLogin: 60, wishlistActivityChange: -80, orderVolumeChange: -70, supportTickets: 0, nps: 3, billingStatus: 'Payment Failed' }),
  new Merchant({ id: 'M017', name: 'Oscorp', plan: 'Starter', mrr: 700, daysSinceLastLogin: 15, wishlistActivityChange: 0, orderVolumeChange: 5, supportTickets: 10, nps: 5, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M018', name: 'Gringotts', plan: 'Enterprise', mrr: 30000, daysSinceLastLogin: 1, wishlistActivityChange: 2, orderVolumeChange: 4, supportTickets: 0, nps: 9, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M019', name: 'Ollivanders', plan: 'Starter', mrr: 300, daysSinceLastLogin: 5, wishlistActivityChange: -10, orderVolumeChange: -10, supportTickets: 1, nps: 7, billingStatus: 'Healthy' }),
  new Merchant({ id: 'M020', name: 'Los Pollos Hermanos', plan: 'Growth', mrr: 9500, daysSinceLastLogin: 1, wishlistActivityChange: 15, orderVolumeChange: 20, supportTickets: 2, nps: 10, billingStatus: 'Healthy' })
];
