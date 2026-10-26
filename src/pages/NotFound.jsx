import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '5rem 1rem',
        maxWidth: '520px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--danger-bg)',
          color: 'var(--danger-text)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <AlertTriangle size={36} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>404</h1>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The route you are looking for does not exist in the Employee Management Dashboard.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={18} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
