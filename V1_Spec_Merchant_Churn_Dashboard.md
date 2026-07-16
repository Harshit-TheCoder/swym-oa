# Merchant Churn Risk Dashboard -- V1 Specification

## Objective

Build a simple dashboard that helps a Customer Success team identify
merchants at risk of churning and recommend the most appropriate next
action based on transparent business rules.

## Assumptions

-   No historical dataset is provided, so merchant data will be
    simulated using realistic SaaS/e-commerce metrics.
-   Churn risk will be determined using a rule-based weighted scoring
    model instead of machine learning to ensure explainability.
-   The dashboard is intended for internal Customer Success use.

## Merchant Record Schema

Each merchant record contains: - Merchant ID - Merchant Name -
Subscription Plan - Monthly Recurring Revenue (MRR) - Days Since Last
Login - Wishlist Activity Change (last 30 days) - Order Volume Change
(last 30 days) - Number of Support Tickets (last 30 days) - Net Promoter
Score (NPS) - Billing Status (Healthy / Payment Failed / Overdue) - Risk
Score - Risk Level - Recommended Next Action

## Parameter Justification

  -----------------------------------------------------------------------
  Parameter                    Why it Matters
  ---------------------------- ------------------------------------------
  Merchant Name                Identifies the merchant.

  Subscription Plan            Higher-tier merchants may require greater
                               retention priority.

  MRR                          Helps prioritize merchants by business
                               impact if they churn.

  Days Since Last Login        Prolonged inactivity is a strong indicator
                               of disengagement.

  Wishlist Activity Change     A decline suggests reduced customer
                               engagement and merchant activity.

  Order Volume Change          Falling order volume may indicate
                               declining business performance or customer
                               interest.

  Support Tickets              A spike often reflects unresolved issues
                               that can increase churn risk.

  NPS                          Low satisfaction scores are a leading
                               indicator of potential churn.

  Billing Status               Failed or overdue payments can directly
                               lead to involuntary churn if unresolved.

  Risk Score                   Provides a single, interpretable measure
                               of churn risk.

  Risk Level                   Enables quick prioritization by Customer
                               Success teams.

  Recommended Next Action      Converts identified risk into a clear,
                               actionable follow-up.
  -----------------------------------------------------------------------

## Churn Signals

The dashboard considers the following indicators: 1. Long login
inactivity 2. Declining wishlist activity 3. Declining order volume 4.
High support ticket volume 5. Low customer satisfaction (NPS) 6. Billing
or payment issues

These signals were selected because they represent merchant engagement,
business performance, customer sentiment, and operational health.

## Risk Scoring

A transparent weighted scoring model will be used.

Example weights: - Billing issue: +30 - Login inactivity (\>30 days):
+25 - Order decline (\>40%): +20 - Wishlist decline (\>40%): +15 - NPS
below 6: +20 - High support ticket volume: +10

Total score is capped at 100.

### Risk Levels

-   Low: 0--29
-   Medium: 30--59
-   High: 60--100

## Recommended Next Actions

The recommendation should be based on the dominant risk signal.

Examples: - Billing issue → Billing follow-up - Login inactivity →
Customer Success outreach - Low NPS → Schedule feedback call - High
support volume → Product support review - Multiple severe signals →
Executive success intervention - Low risk → Continue monitoring

## Dashboard Features

-   Responsive single-page dashboard
-   Merchant table
-   Risk score and color-coded risk badge
-   Search merchants
-   Filter by risk level
-   Sort by risk score
-   Merchant details panel showing score breakdown and recommendation
-   Modern, clean UI

## Data Persistence

Merchant records will be stored as local mock JSON data. No backend or
database is required for this prototype.

## Validation Plan

Verify the dashboard using representative edge cases: - Highly inactive
merchant - Active merchant with billing failure - Merchant with
declining engagement but positive NPS - Healthy merchant with strong
engagement - Merchant with multiple simultaneous risk signals

The scoring and recommendations should remain transparent, explainable,
and consistent across all scenarios.
