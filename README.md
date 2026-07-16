# Merchant Churn Risk Dashboard

A modern, responsive, and highly actionable Customer Success internal tool designed to flag at-risk merchants and recommend concrete next steps. 

Built as a prototype for an AI Proficiency Assessment, this dashboard leverages a transparent, weighted risk-scoring algorithm (without opaque machine learning models) to compute a churn risk score out of 100 and escalate appropriately.
Live website: https://swym-oa.vercel.app/
Chatgpt chat link: https://chatgpt.com/share/6a58f886-e048-83e8-af9c-9275dd589717
## ✨ Key Features

- **Transparent Risk Scoring**: Automatically calculates a Risk Score (0-100) based on multiple factors (Billing, Inactivity, Order/Wishlist declines, NPS, and Support Tickets).
- **Dynamic Action Playbooks**: Translates the Primary Risk Factor into a specific, concrete next step for the Customer Success team, removing decision fatigue.
- **Explainability Engine**: Detailed score breakdowns with plain English explanations for why each signal matters, completely visible to the end-user.
- **Priority Triaging**: Automatically ranks the most critical accounts utilizing a custom "Priority Score" (`Risk Score × MRR`) to focus CS efforts on maximum business impact.
- **Premium Glassmorphic UI**: Features a 3D glass-styled interface, rich gradients, dynamic hover states, and fully responsive CSS grid layouts.

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 (with custom glassmorphism)
- **State Management**: Redux Toolkit (predictable state container for sorting/filtering)
- **Icons**: Lucide React
- **Animations**: Framer Motion (for smooth drawer and panel transitions)

## 📊 Risk Scoring Methodology

The dashboard uses a transparent weighted model to flag risk. A score of `30-59` is considered **Medium Risk**, while `60-100` is considered **High Risk**. A score of `>= 70` triggers an immediate **Executive Success Intervention**.

| Risk Signal | Threshold | Weight | CS Recommendation |
| :--- | :--- | :--- | :--- |
| **Billing Issue** | Status != Healthy | +30 | Contact billing owner within 24 hours. |
| **Login Inactivity** | > 30 Days | +25 | Schedule a success call within 48 hours. |
| **Order Decline** | < -40% (30d) | +20 | Review sales trends, pricing, merchandising. |
| **Low NPS** | < 6 | +20 | Schedule feedback call. |
| **Wishlist Decline** | < -40% (30d) | +15 | Recommend promotions and discoverability. |
| **High Support Tickets**| > 8 (30d) | +10 | Investigate issues and assign an engineer. |

*(Scores are dynamically capped at 100)*

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Harshit-TheCoder/swym-oa.git
   ```
2. Navigate to the project directory:
   ```bash
   cd swym-oa
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

This project is configured out-of-the-box for **Vercel**. 
Simply import the GitHub repository into your Vercel dashboard. The build settings (`npm run build`, output directory `dist`) will be automatically detected by Vercel via the standard Vite preset.

## 📝 Design & Implementation Notes

- **Strategy Pattern**: The core calculation logic is isolated within `src/domain/RiskScoringStrategy.js` using Object-Oriented principles, allowing the business rules to be tested and extended independently of the React UI.
- **Immutable State**: Sorting and filtering are handled immutably via Redux, ensuring the UI remains perfectly synchronized with the data layer.
- **Responsive Grids**: The primary view utilizes CSS Grid for the merchant cards, seamlessly adapting from mobile to ultra-wide desktop monitors without breaking layout integrity.
