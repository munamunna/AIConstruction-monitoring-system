import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Shield, Activity, List, Video, AlertTriangle } from 'lucide-react';
import '../App.css';

const WS_URL = 'ws://localhost:8000/ws/detect/';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: '12:00:01', message: 'System initialized' },
    { id: 2, time: '12:00:05', message: 'Awaiting connection...' }
  ]);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('Connected to detection server');
      setWs(socket);
      addLog('Connected to AI detection server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.detections) {
        setDetections(data.detections);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
      setWs(null);
      addLog('Disconnected from server');
    };

    return () => socket.close();
  }, []);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Date.now(), time, message }, ...prev].slice(0, 50));
  };

  // Capture and send frame
  const captureFrame = useCallback(() => {
    if (webcamRef.current && ws && ws.readyState === WebSocket.OPEN && isDetecting) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        ws.send(JSON.stringify({ frame: imageSrc }));
      }
    }
  }, [ws, isDetecting]);

  useEffect(() => {
    let interval;
    if (isDetecting) {
      interval = setInterval(captureFrame, 200); // 5 FPS for balance
    }
    return () => clearInterval(interval);
  }, [isDetecting, captureFrame]);

  // Draw bounding boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const video = webcamRef.current?.video;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach(det => {
      const [x1, y1, x2, y2] = det.bbox;
      const width = x2 - x1;
      const height = y2 - y1;

      // Box style
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, width, height);

      // Label background
      ctx.fillStyle = '#f59e0b';
      const label = `${det.label} ${(det.confidence * 100).toFixed(0)}%`;
      const textWidth = ctx.measureText(label).width;
      ctx.fillRect(x1, y1 - 25, textWidth + 10, 25);

      // Label text
      ctx.fillStyle = '#000';
      ctx.font = 'bold 14px Outfit';
      ctx.fillText(label, x1 + 5, y1 - 7);
    });
  }, [detections]);

  return (
    <div className="dashboard-container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>AI <span style={{ color: 'var(--accent-primary)' }}>CONSTRUCT</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time Safety & Productivity Monitoring</p>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: ws ? '#22c55e' : '#ef4444' }}></div>
          <span>{ws ? 'Server Online' : 'Server Offline'}</span>
        </div>
      </header>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Active Objects</span>
            <Shield size={20} color="var(--accent-primary)" />
          </div>
          <div className="stat-value">{detections.length}</div>
        </div>
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Frame Latency</span>
            <Activity size={20} color="var(--accent-secondary)" />
          </div>
          <div className="stat-value">124ms</div>
        </div>
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Safety Violations</span>
            <AlertTriangle size={20} color="#ef4444" />
          </div>
          <div className="stat-value" style={{ color: '#ef4444' }}>0</div>
        </div>
      </div>

      <div className="main-feed-container">
        <div className={`video-wrapper ${isDetecting ? 'active' : ''}`}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            style={{ borderRadius: '1rem' }}
          />
          <canvas ref={canvasRef} className="detection-canvas" />
        </div>

        <div className="glass-panel control-panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Video size={20} /> Controls
          </h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => setIsDetecting(!isDetecting)}>
              {isDetecting ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
            <button className="secondary" onClick={() => setDetections([])}>Clear Map</button>
          </div>

          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <List size={20} /> Event Log
          </h3>
          <div className="log-list">
            {logs.map(log => (
              <div key={log.id} className="log-item">
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>[{log.time}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
