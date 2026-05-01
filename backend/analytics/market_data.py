import numpy as np
import pandas as pd
from datetime import datetime, timedelta

class MarketIntelligence:
    def __init__(self):
        self.areas = ['Dubai Marina', 'Downtown Dubai', 'Jumeirah Village Circle (JVC)', 'Business Bay', 'Palm Jumeirah']
        
    def get_market_trends(self):
        # Generate last 12 months of trend data
        months = []
        base_date = datetime.now()
        for i in range(12):
            date = base_date - timedelta(days=30 * (11 - i))
            months.append(date.strftime('%b %Y'))
        
        # Simulated price index growth for Dubai
        price_index = [100 + (i * 1.2) + np.random.normal(0, 0.5) for i in range(12)]
        demand_index = [80 + (np.sin(i/2) * 10) + np.random.normal(0, 2) for i in range(12)]
        
        history = []
        for i in range(12):
            history.append({
                'month': months[i],
                'price_index': round(price_index[i], 2),
                'demand': round(demand_index[i], 2)
            })
            
        return history

    def get_area_analysis(self):
        analysis = []
        for area in self.areas:
            # Synthetic metrics per area
            supply = round(np.random.uniform(2, 8), 1)
            demand = round(np.random.uniform(5, 10), 1)
            yield_rate = round(np.random.uniform(5, 9), 2) # Typical Dubai ROI
            
            rating = 'Strong Buy' if demand > 8 and yield_rate > 7 else 'Hold'
            if demand < 6: rating = 'Wait'
            
            analysis.append({
                'name': area,
                'supply_growth': f"{supply}%",
                'demand_index': demand,
                'rental_yield': f"{yield_rate}%",
                'rating': rating
            })
        return analysis

# Singleton instance
market_intel = MarketIntelligence()
