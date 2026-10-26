import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Users, UserPlus, Sun, Moon, LayoutDashboard, Sparkles, Building2 } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

export default function Navbar() {
  const { theme, toggleTheme, rawEmployees } = useEmployees();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <Link to="/" className="brand-logo" title="StaffPulse Dashboard">
          <div className="brand-icon-box">
            <Building2 size={22} strokeWidth={2.3} />
          </div>
          <div className="brand-title">
            <span>Staff<span className="brand-gradient">Pulse</span></span>
            <span className="brand-badge">HR Portal</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                id="nav-home-link"
              >
                <LayoutDashboard size={18} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employee-form"
                className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
                id="nav-form-link"
              >
                <UserPlus size={18} />
                <span>Employee Form</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Actions: Theme Toggle & Count */}
        <div className="nav-actions">
          <div 
            className="brand-badge" 
            style={{ 
              display: 'none', 
              '@media (min-width: 640px)': { display: 'inline-flex' } 
            }}
          >
            {rawEmployees.length} Personnel
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
