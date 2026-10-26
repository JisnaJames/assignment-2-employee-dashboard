import React from 'react';
import { Heart, Globe, ShieldCheck, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p>© {new Date().getFullYear()} StaffPulse Systems. Employee Dashboard & Analytics Portal.</p>
        </div>
        <div className="footer-links">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Code2 size={16} /> React + Vite SPA
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={16} /> REST API Synced
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} /> Assignment 2
          </span>
        </div>
      </div>
    </footer>
  );
}
