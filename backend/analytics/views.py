from rest_framework.views import APIView
from rest_framework.response import Response
from .predictor import predictor
from datetime import datetime

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

from .market_data import market_intel

from .investment import investment_analyzer

class MarketAnalysisView(APIView):
    def get(self, request):
        trends = market_intel.get_market_trends()
        areas = market_intel.get_area_analysis()
        
        return Response({
            'history': trends,
            'area_analysis': areas,
            'global_sentiment': 'Bullish',
            'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M')
        })

from .investment import investment_analyzer

class InvestmentAnalysisView(APIView):
    def post(self, request):
        price = float(request.data.get('purchase_price', 1000000))
        rent = float(request.data.get('annual_rent', 80000))
        appreciation = float(request.data.get('appreciation', 0.05))
        
        result = investment_analyzer.calculate_roi(
            purchase_price=price,
            rental_income=rent,
            appreciation_rate=appreciation
        )
        
        return Response(result)
