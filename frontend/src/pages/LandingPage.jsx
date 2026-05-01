import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, Building2, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Real-time AI Monitoring",
      description: "Live computer vision for safety and progress tracking on construction sites.",
      icon: <ShieldCheck size={32} color="#f59e0b" />,
      route: "/monitoring"
    },
    {
      title: "Cost Prediction",
      description: "Leverage ML models to predict material and labor costs with 98% accuracy.",
      icon: <TrendingUp size={32} color="#3b82f6" />,
      route: "/prediction"
    },
    {
      title: "Market Analysis",
      description: "In-depth analysis of Dubai's construction market trends and competitor insights.",
      icon: <BarChart3 size={32} color="#10b981" />,
      route: "/market"
    },
    {
      title: "Investment Insights",
      description: "Data-driven decisions for high-yield construction investments in the UAE.",
      icon: <Building2 size={32} color="#8b5cf6" />,
      route: "/investment"
    }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="dubai-badge">
            <MapPin size={16} /> <span>Dubai, UAE</span>
          </div>
          <h1>AI-Powered <br /><span>Construction</span> Excellence</h1>
          <p>The ultimate data-driven platform for Dubai's modern construction industry. Predict costs, analyze markets, and monitor sites in real-time.</p>
          <div className="hero-btns">
            <button onClick={() => navigate('/monitoring')}>Get Started</button>
            <button className="secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-visual">
          {/* Abstract visual or image could go here */}
          <div className="abstract-glow"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <h2>Our Intelligence Suite</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="glass-panel service-card" onClick={() => navigate(s.route)}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="learn-more">
                Learn More <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .landing-container {
          padding: 0 5%;
          background: radial-gradient(circle at 10% 20%, rgba(245, 158, 11, 0.03), transparent 50%),
                      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03), transparent 50%);
        }

        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 0;
        }

        .hero-content {
          max-width: 600px;
        }

        .dubai-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border-radius: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .hero h1 {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }

        .hero h1 span {
          color: var(--accent-primary);
        }

        .hero p {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .hero-btns {
          display: flex;
          gap: 1.5rem;
        }

        .services-section {
          padding: 6rem 0;
        }

        .services-section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .service-card {
          padding: 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .service-icon {
          margin-bottom: 1.5rem;
        }

        .service-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .service-card p {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .learn-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .abstract-glow {
          width: 400px;
          height: 400px;
          background: var(--accent-primary);
          filter: blur(150px);
          opacity: 0.1;
          border-radius: 50%;
        }
      `}} />
    </div>
  );
}

export default LandingPage;
