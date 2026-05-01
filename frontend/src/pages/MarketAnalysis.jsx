import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, AreaChart, Area 
} from 'recharts';
import { TrendingUp, PieChart, Map, Globe, Clock, ArrowUpRight } from 'lucide-react';

function MarketAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/analytics/market-analysis/');
        setData(response.data);
      } catch (error) {
        console.error("Market analysis error", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading Market Intelligence...</div>;

  return (
    <div className="dashboard-container" style={{ padding: '2rem 5%' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Market <span style={{ color: 'var(--accent-primary)' }}>Analysis</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Dubai Construction & Real Estate Intelligence</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.85rem' }}>Updated: {data?.last_updated}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={16} color="#10b981" />
            <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Sentiment: {data?.global_sentiment}</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Price Trend Chart */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} /> Price Index Trend (12 Months)
          </h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.history}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="price_index" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand vs Supply Overview */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChart size={20} /> Area Performance (Demand Index)
          </h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.area_analysis} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={10} width={100} />
                <Tooltip 
                  contentStyle={{ background: '#1a1a1a', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="demand_index" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Area Analysis Table */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Map size={20} /> Detailed Area Analysis
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>Area Name</th>
              <th style={{ padding: '1rem' }}>Supply Growth</th>
              <th style={{ padding: '1rem' }}>Demand Index</th>
              <th style={{ padding: '1rem' }}>Rental Yield</th>
              <th style={{ padding: '1rem' }}>Investment Rating</th>
            </tr>
          </thead>
          <tbody>
            {data?.area_analysis.map((area, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }} className="table-row">
                <td style={{ padding: '1rem', fontWeight: 600 }}>{area.name}</td>
                <td style={{ padding: '1rem' }}>{area.supply_growth}</td>
                <td style={{ padding: '1rem' }}>{area.demand_index}/10</td>
                <td style={{ padding: '1rem', color: '#10b981', fontWeight: 600 }}>{area.rental_yield}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '2rem', 
                    fontSize: '0.8rem', 
                    background: area.rating === 'Strong Buy' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: area.rating === 'Strong Buy' ? '#10b981' : '#f59e0b'
                  }}>
                    {area.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}} />
    </div>
  );
}

export default MarketAnalysis;
