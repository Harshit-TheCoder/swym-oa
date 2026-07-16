export class RiskScoringStrategy {
  calculateScore(merchant) {
    let score = 0;
    const breakdown = [];
    const signals = [];

    // Billing Issue (+30)
    if (['Overdue', 'Payment Failed'].includes(merchant.billingStatus)) {
      score += 30;
      breakdown.push({ factor: 'Billing Issue', score: 30, details: merchant.billingStatus });
      signals.push('Billing issue');
    }

    // Login Inactivity > 30 days (+25)
    if (merchant.daysSinceLastLogin > 30) {
      score += 25;
      breakdown.push({ factor: 'Login Inactivity', score: 25, details: `>30 days (${merchant.daysSinceLastLogin} days)` });
      signals.push('Login inactivity');
    }

    // Order decline > 40% (+20)
    if (merchant.orderVolumeChange < -40) {
      score += 20;
      breakdown.push({ factor: 'Order Decline', score: 20, details: `>40% (${merchant.orderVolumeChange}%)` });
      signals.push('Order decline');
    }

    // Wishlist decline > 40% (+15)
    if (merchant.wishlistActivityChange < -40) {
      score += 15;
      breakdown.push({ factor: 'Wishlist Decline', score: 15, details: `>40% (${merchant.wishlistActivityChange}%)` });
      signals.push('Wishlist decline');
    }

    // NPS below 6 (+20)
    if (merchant.nps < 6) {
      score += 20;
      breakdown.push({ factor: 'Low NPS', score: 20, details: `<6 (${merchant.nps})` });
      signals.push('Low NPS');
    }

    // Support tickets > 8 (+10)
    if (merchant.supportTickets > 8) {
      score += 10;
      breakdown.push({ factor: 'High Support Tickets', score: 10, details: `>8 (${merchant.supportTickets})` });
      signals.push('High support tickets');
    }

    // Cap the score at 100
    const finalScore = Math.min(score, 100);
    
    // Determine primary risk factor (highest weighted contributor)
    let primaryRiskFactor = null;
    if (breakdown.length > 0) {
      primaryRiskFactor = breakdown.reduce((prev, current) => (prev.score > current.score) ? prev : current).factor;
    }
    
    return {
      score: finalScore,
      breakdown,
      signals,
      primaryRiskFactor,
      level: this.determineRiskLevel(finalScore),
      recommendation: this.generateRecommendation(signals, finalScore, primaryRiskFactor)
    };
  }

  determineRiskLevel(score) {
    if (score < 30) return 'Low';
    if (score < 60) return 'Medium';
    return 'High';
  }

  generateRecommendation(signals, score, primaryRiskFactor) {
    if (score >= 70) {
      return { 
        action: 'Escalate to Customer Success leadership and prepare an account recovery plan.', 
        reason: `Primary Risk: ${primaryRiskFactor || 'Multiple'}. Multiple high-impact signals indicate an elevated churn risk.` 
      };
    }
    
    switch (primaryRiskFactor) {
      case 'Billing Issue':
        return { action: 'Contact billing owner within 24 hours and retry payment.', reason: 'Immediate revenue risk due to payment failure or overdue status.' };
      case 'Login Inactivity':
        return { action: 'Schedule a success call within 48 hours.', reason: 'Prolonged inactivity strongly suggests disengagement.' };
      case 'Order Decline':
        return { action: 'Review sales trends, pricing, merchandising, and inventory.', reason: 'Investigate declining sales, merchandising, pricing, or inventory issues.' };
      case 'Low NPS':
        return { action: 'Schedule feedback call', reason: 'Negative customer sentiment requires qualitative understanding.' };
      case 'Wishlist Decline':
        return { action: 'Recommend promotions and improve discoverability.', reason: 'Review promotions, discoverability, and customer engagement.' };
      case 'High Support Tickets':
        return { action: 'Investigate recurring support issues and assign an engineer.', reason: 'High friction or bugs may be frustrating the merchant.' };
      default:
        return { action: 'Continue monitoring', reason: 'No significant risk factors present at this time.' };
    }
  }
}
