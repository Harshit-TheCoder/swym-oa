export class Merchant {
  constructor({
    id,
    name,
    plan,
    mrr,
    daysSinceLastLogin,
    wishlistActivityChange,
    orderVolumeChange,
    supportTickets,
    nps,
    billingStatus
  }) {
    this.id = id;
    this.name = name;
    this.plan = plan; // 'Starter', 'Growth', 'Enterprise'
    this.mrr = mrr;
    this.daysSinceLastLogin = daysSinceLastLogin;
    this.wishlistActivityChange = wishlistActivityChange;
    this.orderVolumeChange = orderVolumeChange;
    this.supportTickets = supportTickets;
    this.nps = nps;
    this.billingStatus = billingStatus; // 'Healthy', 'Overdue', 'Payment Failed'
  }
}
