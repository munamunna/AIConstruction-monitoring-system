import React, { useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Calculator, MapPin, Building, Ruler, Info } from 'lucide-react';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981'];

function CostPrediction() {
  const [formData, setFormData] = useState({
    area: 2500,
    floors: 2,
    quality: 'Mid-range',
    location: 'JVC'
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/analytics/predict-cost/', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Prediction error", error);
    }
    setLoading(false);
  };

  const chartData = prediction ? [
    { name: 'Materials', value: prediction.breakdown.materials },
    { name: 'Labor', value: prediction.breakdown.labor },
    { name: 'Permits', value: prediction.breakdown.permits },
  ] : [];

  return (
    <div className="dashboard-container" style={{ padding: '2rem 5%' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Cost <span style={{ color: 'var(--accent-primary)' }}>Predictor</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Advanced Machine Learning Analysis for Dubai Construction Projects</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        {/* Form Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <Ruler size={16} /> Total Area (sq ft)
              </label>
              <input 
                type="number" 
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <Building size={16} /> Number of Floors
              </label>
              <input 
                type="number" 
                value={formData.floors}
                onChange={(e) => setFormData({...formData, floors: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <Info size={16} /> Finish Quality
              </label>
              <select 
                value={formData.quality}
                onChange={(e) => setFormData({...formData, quality: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              >
                <option value="Basic">Basic</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <MapPin size={16} /> Project Location (Dubai)
              </label>
              <select 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              >
                <option value="JVC">JVC / Suburbs</option>
                <option value="Marina">Dubai Marina / JLT</option>
                <option value="Downtown">Downtown / Business Bay</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Calculator size={20} /> {loading ? 'Analyzing...' : 'Predict Project Cost'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
          {!prediction ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <Calculator size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
              <p>Enter project details to generate AI cost prediction</p>
            </div>
          ) : (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Estimated Total Cost</span>
                  <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    AED {prediction.total_cost.toLocaleString()}
                  </h2>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  Confidence: {(prediction.confidence * 100).toFixed(0)}%
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: '#1a1a1a', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                  {chartData.map((item, i) => (
                    <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', borderLeft: `4px solid ${COLORS[i]}` }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.name}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>AED {item.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CostPrediction;
