from django.urls import path
from .views import CostPredictionView, MarketAnalysisView

urlpatterns = [
    path('predict-cost/', CostPredictionView.as_view(), name='predict-cost'),
    path('market-analysis/', MarketAnalysisView.as_view(), name='market-analysis'),
]
