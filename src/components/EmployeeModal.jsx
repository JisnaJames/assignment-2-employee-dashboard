import React from 'react';
import { X, Mail, Phone, Globe, MapPin, Building, Briefcase, DollarSign, Hash } from 'lucide-react';

export default function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  // Generate color palette based on ID
  const colors = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #8b5cf6)',
    'linear-gradient(135deg, #8b5cf6, #3b82f6)'
  ];
  const bgGrad = colors[(employee.id || 1) % colors.length];

  const getInitials = (name) => {
    if (!name) return 'EP';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              className="avatar"
              style={{
                background: bgGrad,
                width: '46px',
                height: '46px',
                fontSize: '1.05rem',
                fontWeight: 800
              }}
            >
              {getInitials(employee.name)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{employee.name}</h3>
              <span className="badge-id">ID: #{employee.id}</span>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-info-item">
            <span className="modal-info-label">Email Address</span>
            <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--accent-primary)" />
              <a href={`mailto:${employee.email}`} className="email-link">
                {employee.email}
              </a>
            </div>
          </div>

          <div className="modal-info-item">
            <span className="modal-info-label">Designation / Role</span>
            <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={16} color="var(--accent-primary)" />
              {employee.designation || employee.company?.name || 'Senior Associate'}
            </div>
          </div>

          <div className="modal-info-item">
            <span className="modal-info-label">Location / City</span>
            <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--accent-primary)" />
              {employee.location || employee.address?.city || 'Corporate HQ'}
              {employee.address?.street && `, ${employee.address.street}`}
            </div>
          </div>

          {employee.salary && (
            <div className="modal-info-item">
              <span className="modal-info-label">Annual Compensation</span>
              <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={16} color="#10b981" />
                <span style={{ color: 'var(--badge-emerald-text)', fontWeight: 700 }}>
                  {employee.salary.startsWith('$') ? employee.salary : `$${Number(employee.salary).toLocaleString()}`}
                </span>
              </div>
            </div>
          )}

          {employee.phone && (
            <div className="modal-info-item">
              <span className="modal-info-label">Contact Number</span>
              <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--accent-primary)" />
                {employee.phone}
              </div>
            </div>
          )}

          {employee.website && (
            <div className="modal-info-item">
              <span className="modal-info-label">Website / Portfolio</span>
              <div className="modal-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="var(--accent-primary)" />
                <a
                  href={`https://${employee.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="email-link"
                >
                  {employee.website}
                </a>
              </div>
            </div>
          )}

          {employee.company?.catchPhrase && (
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontStyle: 'italic',
                borderLeft: '3px solid var(--accent-primary)'
              }}
            >
              "{employee.company.catchPhrase}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
