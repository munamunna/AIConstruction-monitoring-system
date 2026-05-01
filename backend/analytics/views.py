from rest_framework.views import APIView
from rest_framework.response import Response
from .predictor import predictor

class CostPredictionView(APIView):
    def post(self, request):
        area = float(request.data.get('area', 1000))
        floors = int(request.data.get('floors', 1))
        quality = request.data.get('quality', 'Mid-range')
        location = request.data.get('location', 'JVC')
        
        result = predictor.predict(area, floors, quality, location)
        
        return Response({
            'prediction': result,
            'currency': 'AED',
            'location': location,
            'timestamp': '2026-05-01'
        })

class MarketAnalysisView(APIView):
    def get(self, request):
        return Response({
            'supply_growth': '4.2%',
            'demand_index': 8.5,
            'top_areas': ['Dubai Marina', 'Business Bay', 'JVC'],
            'investment_rating': 'Strong Buy'
        })
