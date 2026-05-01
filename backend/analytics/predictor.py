import numpy as np
from sklearn.ensemble import RandomForestRegressor
import pandas as pd

class ConstructionCostPredictor:
    def __init__(self):
        # Synthetic data tailored for Dubai Market
        # Features: [Area, Floors, Quality_Score, Location_Premium]
        # Quality_Score: 1 (Basic) - 5 (Ultra Luxury)
        # Location_Premium: 1 (Suburbs) - 3 (Prime Downtown)
        
        # Generating 200 synthetic data points for training
        np.random.seed(42)
        n_samples = 200
        
        areas = np.random.uniform(500, 10000, n_samples)
        floors = np.random.randint(1, 60, n_samples)
        quality = np.random.uniform(1, 5, n_samples)
        location = np.random.uniform(1, 3, n_samples)
        
        # Cost logic: Base cost + area factor + quality multiplier + location premium
        costs = (areas * 450) + (floors * 50000) * (quality * 0.5) * (location * 1.2) + np.random.normal(0, 10000, n_samples)
        
        self.data = pd.DataFrame({
            'area': areas,
            'floors': floors,
            'quality': quality,
            'location': location,
            'cost': costs
        })
        
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(self.data[['area', 'floors', 'quality', 'location']], self.data['cost'])

    def predict(self, area, floors, quality, location_type):
        # Map location type to premium
        location_map = {
            'Downtown': 3.0,
            'Marina': 2.5,
            'JVC': 1.5,
            'Suburbs': 1.0
        }
        loc_val = location_map.get(location_type, 1.5)
        
        # Map quality to score
        quality_map = {
            'Basic': 1.0,
            'Mid-range': 3.0,
            'Luxury': 5.0
        }
        qual_val = quality_map.get(quality, 3.0)
        
        features = np.array([[area, floors, qual_val, loc_val]])
        prediction = self.model.predict(features)[0]
        
        # Break down costs
        materials = prediction * 0.55
        labor = prediction * 0.30
        permits = prediction * 0.15
        
        return {
            'total_cost': round(prediction, 2),
            'breakdown': {
                'materials': round(materials, 2),
                'labor': round(labor, 2),
                'permits': round(permits, 2)
            },
            'confidence': 0.94
        }

# Singleton instance
predictor = ConstructionCostPredictor()
