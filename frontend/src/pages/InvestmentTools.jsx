import React, { useState } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend 
} from 'recharts';
import { Wallet, TrendingUp, Calendar, DollarSign, ArrowRight, Info } from 'lucide-react';

function InvestmentTools() {
  const [formData, setFormData] = useState({
    purchase_price: 1500000,
    annual_rent: 90000,
    appreciation: 5
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/analytics/investment-analysis/', {
        ...formData,
        appreciation: formData.appreciation / 100
      });
      setData(response.data);
    } catch (error) {
      console.error("Investment calculation error", error);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container" style={{ padding: '2rem 5%' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
          Investment <span style={{ color: 'var(--accent-primary)' }}>Tools</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>ROI Calculator & Long-term Financial Projections for Dubai Real Estate</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        {/* Input Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <Wallet size={16} /> Purchase Price (AED)
              </label>
              <input 
                type="number" 
                value={formData.purchase_price}
                onChange={(e) => setFormData({...formData, purchase_price: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <DollarSign size={16} /> Expected Annual Rent (AED)
              </label>
              <input 
                type="number" 
                value={formData.annual_rent}
                onChange={(e) => setFormData({...formData, annual_rent: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <TrendingUp size={16} /> Annual Appreciation (%)
              </label>
              <input 
                type="number" 
                value={formData.appreciation}
                onChange={(e) => setFormData({...formData, appreciation: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '0.5rem' }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} /> {loading ? 'Calculating...' : 'Generate Projections'}
            </button>

            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#60a5fa', display: 'flex', gap: '0.5rem' }}>
              <Info size={16} style={{ flexShrink: 0 }} />
              <span>Includes standard 4% DLD fee and registration costs.</span>
            </div>
          </form>
        </div>

        {/* Results Panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          {!data ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <Wallet size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
              <p>Configure your investment parameters to see ROI projections</p>
            </div>
          ) : (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Initial Investment</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>AED {data.initial_investment.toLocaleString()}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Estimated Payback Period</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--accent-primary)' }}>{data.payback_period_years} Years</div>
                </div>
              </div>

              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} /> 10-Year ROI Projection (%)
              </h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.projections}>
                    <defs>
                      <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis stroke="var(--text-muted)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a1a', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                    />
                    <Area type="monotone" dataKey="roi" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRoi)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Key Milestones</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[1, 5, 10].map(yr => {
                    const proj = data.projections.find(p => p.year === yr);
                    return (
                      <div key={yr} style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Year {yr}</div>
                        <div style={{ fontWeight: 700, color: '#10b981' }}>{proj.roi}% ROI</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentTools;
