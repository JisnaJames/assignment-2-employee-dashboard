import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Table as TableIcon,
  LayoutGrid,
  Search,
  RefreshCw,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Building2,
  MapPin,
  Briefcase,
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';
import EmployeeModal from '../components/EmployeeModal';

export default function Dashboard() {
  const {
    employees,
    rawEmployees,
    apiEmployeesCount,
    customEmployeesCount,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    fetchEmployees,
    showToast
  } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Avatar color generator based on index/id
  const getAvatarGradient = (id) => {
    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
    ];
    return gradients[(id || 0) % gradients.length];
  };

  const getInitials = (name) => {
    if (!name) return 'EP';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const copyToClipboard = (email, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    showToast('Copied to Clipboard', email, 'info');
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">
              Employee Directory
              <span className="brand-badge" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                {rawEmployees.length} Total
              </span>
            </h1>
            <p className="page-subtitle">
              Live records fetched from the external REST API (<code>jsonplaceholder.typicode.com/users</code>) 
              combined with local employee registrations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link to="/employee-form" className="btn-primary" id="btn-add-employee-header">
              <UserPlus size={18} />
              <span>Add Employee</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics / Stats Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--badge-purple-bg)', color: 'var(--badge-purple-text)' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{rawEmployees.length}</span>
            <span className="stat-label">Total Personnel</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--badge-blue-bg)', color: 'var(--badge-blue-text)' }}>
            <Building2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{apiEmployeesCount}</span>
            <span className="stat-label">API Synced Users</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--badge-emerald-bg)', color: 'var(--badge-emerald-text)' }}>
            <Sparkles size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{customEmployeesCount}</span>
            <span className="stat-label">Form Submissions</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--badge-amber-bg)', color: 'var(--badge-amber-text)' }}>
            <MapPin size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">100%</span>
            <span className="stat-label">Active Directory</span>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & View Mode Switcher */}
      <div className="controls-bar">
        {/* Search Input */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by ID, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="employee-search-input"
          />
        </div>

        {/* Right Controls: Refresh & View Toggle */}
        <div className="controls-right">
          <button
            type="button"
            className="icon-btn"
            onClick={fetchEmployees}
            title="Refresh Data from API"
            aria-label="Refresh Data from API"
            id="btn-refresh-data"
          >
            <RefreshCw size={17} className={loading ? 'spin-animation' : ''} />
          </button>

          <div className="view-toggle-group" role="group" aria-label="View toggle">
            <button
              type="button"
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              id="view-toggle-table"
              title="Tabular View"
            >
              <TableIcon size={16} />
              <span>Table</span>
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
              id="view-toggle-card"
              title="Card Grid View"
            >
              <LayoutGrid size={16} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {error && (
        <div
          style={{
            background: 'var(--danger-bg)',
            border: '1px solid var(--danger-border)',
            color: 'var(--danger-text)',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={22} />
            <div>
              <strong>Failed to fetch external API data:</strong> {error}
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={fetchEmployees}
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        viewMode === 'table' ? (
          <div className="table-container">
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton" style={{ height: '36px', width: '100%' }}></div>
              <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
              <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
              <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
              <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <div className="cards-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="employee-card" style={{ height: '190px' }}>
                <div className="skeleton" style={{ height: '40px', width: '50%' }}></div>
                <div className="skeleton" style={{ height: '20px', width: '80%' }}></div>
                <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>
              </div>
            ))}
          </div>
        )
      ) : employees.length === 0 ? (
        /* Empty State */
        <div
          className="table-container"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>No Employees Found</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.925rem' }}>
            {searchTerm
              ? `No records matched your search query "${searchTerm}". Try searching with a different term.`
              : 'There are currently no employee records available.'}
          </p>
          {searchTerm && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setSearchTerm('')}
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        /* TABULAR VIEW (Required: id, name, email) */
        <div className="table-container">
          <div className="table-responsive">
            <table className="custom-table" id="employee-table">
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>ID</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Designation / Company</th>
                  <th>Location</th>
                  <th style={{ textAlign: 'right', width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    style={{ cursor: 'pointer' }}
                    title="Click to view details"
                  >
                    {/* ID Field */}
                    <td>
                      <span className="badge-id">#{emp.id}</span>
                    </td>

                    {/* Name Field */}
                    <td>
                      <div className="employee-cell">
                        <div
                          className="avatar"
                          style={{ background: getAvatarGradient(emp.id) }}
                        >
                          {getInitials(emp.name)}
                        </div>
                        <div className="employee-details">
                          <span className="employee-name">{emp.name}</span>
                          <span className="employee-role-tag">
                            {emp.username ? `@${emp.username}` : (emp.isCustom ? 'Internal Registered' : 'Staff Member')}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email Field */}
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={15} color="var(--accent-primary)" />
                        <a
                          href={`mailto:${emp.email}`}
                          className="email-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {emp.email}
                        </a>
                        <button
                          type="button"
                          className="icon-btn"
                          style={{ width: '28px', height: '28px', padding: 0 }}
                          title="Copy Email"
                          onClick={(e) => copyToClipboard(emp.email, e)}
                        >
                          {copiedEmail === emp.email ? <Check size={14} color="#10b981" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>

                    {/* Designation / Company Field */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.875rem' }}>
                        <Briefcase size={15} color="var(--text-muted)" />
                        <span>{emp.designation || emp.company?.name || 'Enterprise Team'}</span>
                      </div>
                    </td>

                    {/* Location Field */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={15} color="var(--text-muted)" />
                        <span>{emp.location || emp.address?.city || 'Corporate HQ'}</span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD GRID VIEW (Required: id, name, email) */
        <div className="cards-grid" id="employee-cards-grid">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="employee-card"
              onClick={() => setSelectedEmployee(emp)}
              style={{ cursor: 'pointer' }}
            >
              <div className="employee-card-header">
                <div className="employee-card-avatar-wrap">
                  <div
                    className="avatar"
                    style={{ background: getAvatarGradient(emp.id), width: '44px', height: '44px' }}
                  >
                    {getInitials(emp.name)}
                  </div>
                  <div>
                    <h3 className="employee-name" style={{ fontSize: '1rem' }}>
                      {emp.name}
                    </h3>
                    <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      {emp.username ? `@${emp.username}` : (emp.isCustom ? 'Locally Registered' : 'Staff Member')}
                    </span>
                  </div>
                </div>
                <span className="badge-id">#{emp.id}</span>
              </div>

              <div className="employee-card-body">
                {/* Email Field */}
                <div className="card-info-row">
                  <Mail size={16} className="card-info-icon" />
                  <a
                    href={`mailto:${emp.email}`}
                    className="email-link"
                    style={{ fontSize: '0.875rem' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {emp.email}
                  </a>
                </div>

                {/* Designation / Company Field */}
                <div className="card-info-row">
                  <Briefcase size={16} className="card-info-icon" />
                  <span style={{ fontWeight: 500 }}>
                    {emp.designation || emp.company?.name || 'Enterprise Member'}
                  </span>
                </div>

                {/* Location Field */}
                <div className="card-info-row">
                  <MapPin size={16} className="card-info-icon" />
                  <span>{emp.location || emp.address?.city || 'Corporate HQ'}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600
                  }}
                >
                  View Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
