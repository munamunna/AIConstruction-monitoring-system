import numpy as np

class InvestmentAnalyzer:
    def calculate_roi(self, purchase_price, rental_income, maintenance_rate=0.15, appreciation_rate=0.05, years=10):
        # Dubai specific fees
        dld_fee = purchase_price * 0.04 # Dubai Land Dept fee
        registration_fee = 4000 # Typical fixed fee
        total_initial_investment = purchase_price + dld_fee + registration_fee
        
        # Projections
        projections = []
        current_value = purchase_price
        cumulative_rental = 0
        
        for year in range(1, years + 1):
            # Annual maintenance and service charges
            annual_maintenance = rental_income * maintenance_rate
            net_rental = rental_income - annual_maintenance
            cumulative_rental += net_rental
            
            # Capital appreciation
            current_value *= (1 + appreciation_rate)
            
            # Total ROI = (Net Rental + Appreciation) / Initial Investment
            total_gain = cumulative_rental + (current_value - purchase_price)
            roi_percent = (total_gain / total_initial_investment) * 100
            
            projections.append({
                'year': year,
                'property_value': round(current_value, 2),
                'cumulative_rental': round(cumulative_rental, 2),
                'total_gain': round(total_gain, 2),
                'roi': round(roi_percent, 2)
            })
            
        return {
            'initial_investment': round(total_initial_investment, 2),
            'payback_period_years': round(total_initial_investment / (rental_income * (1 - maintenance_rate)), 1),
            'projections': projections
        }

# Singleton instance
investment_analyzer = InvestmentAnalyzer()
