from rest_framework.views import APIView
from rest_framework.response import Response
import random

class CostPredictionView(APIView):
    def post(self, request):
        # Mock ML logic for Dubai market
        area = request.data.get('area', 100)
        building_type = request.data.get('type', 'Residential')
        
        # Base cost in AED per sq ft in Dubai (roughly 400 - 1000)
        base_rate = 650 if building_type == 'Residential' else 850
        predicted_cost = area * base_rate * random.uniform(0.9, 1.1)
        
        return Response({
            'predicted_cost_aed': round(predicted_cost, 2),
            'currency': 'AED',
            'market_trend': 'Stable',
            'location': 'Dubai, UAE'
        })

class MarketAnalysisView(APIView):
    def get(self, request):
        return Response({
            'supply_growth': '4.2%',
            'demand_index': 8.5,
            'top_areas': ['Dubai Marina', 'Business Bay', 'JVC'],
            'investment_rating': 'Strong Buy'
        })
