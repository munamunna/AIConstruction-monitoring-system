import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MonitoringDashboard from './pages/MonitoringDashboard';
import CostPrediction from './pages/CostPrediction';
import MarketAnalysis from './pages/MarketAnalysis';
import InvestmentTools from './pages/InvestmentTools';
import { LayoutDashboard, Shield, Menu } from 'lucide-react';

const Navbar = () => (
  <nav className="glass-panel navbar">
    <Link to="/" className="nav-logo">
      AI <span>CONSTRUCT</span>
    </Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/monitoring">AI Monitoring</Link>
      <Link to="/prediction">Cost Prediction</Link>
      <Link to="/market">Market Analysis</Link>
      <Link to="/investment">Investment Tools</Link>
    </div>
    <div className="nav-actions">
      <button className="secondary" style={{ padding: '0.5rem 1rem' }}>Login</button>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        margin: 1rem 5%;
        border-radius: 1rem;
        position: sticky;
        top: 1rem;
        z-index: 1000;
      }
      .nav-logo {
        font-size: 1.5rem;
        font-weight: 800;
        text-decoration: none;
        color: white;
      }
      .nav-logo span { color: var(--accent-primary); }
      .nav-links {
        display: flex;
        gap: 2rem;
      }
      .nav-links a {
        text-decoration: none;
        color: var(--text-muted);
        font-weight: 500;
        transition: color 0.2s;
      }
      .nav-links a:hover { color: var(--accent-primary); }
    `}} />
  </nav>
);

const Placeholder = ({ title }) => (
  <div style={{ padding: '4rem 5%', textAlign: 'center' }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: 'var(--text-muted)' }}>This service is currently under development for the Dubai market.</p>
    <div style={{ marginTop: '2rem', height: '300px', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LayoutDashboard size={48} opacity={0.2} />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/monitoring" element={<MonitoringDashboard />} />
        <Route path="/prediction" element={<CostPrediction />} />
        <Route path="/market" element={<MarketAnalysis />} />
        <Route path="/investment" element={<InvestmentTools />} />
      </Routes>
    </Router>
  );
}

export default App;
