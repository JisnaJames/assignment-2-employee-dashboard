import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  User,
  Briefcase,
  MapPin,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmployee, setSubmittedEmployee] = useState(null);

  // Common quick-fill suggestions for convenience
  const designationPresets = [
    'Software Engineer',
    'Product Designer',
    'DevOps Engineer',
    'Data Analyst',
    'Technical Lead'
  ];

  const locationPresets = ['San Francisco, CA', 'New York, NY', 'London, UK', 'Bengaluru, IN', 'Remote'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.designation.trim()) {
      errs.designation = 'Designation / job title is required.';
    }

    if (!formData.location.trim()) {
      errs.location = 'Location / office city is required.';
    }

    if (!formData.salary.trim()) {
      errs.salary = 'Salary is required.';
    } else {
      const numericVal = Number(formData.salary.replace(/[^0-9.]/g, ''));
      if (isNaN(numericVal) || numericVal <= 0) {
        errs.salary = 'Please enter a valid positive salary amount.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field upon typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePresetClick = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      designation: '',
      location: '',
      salary: ''
    });
    setErrors({});
    setSubmittedEmployee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate responsive submission feel
    setTimeout(() => {
      const added = addEmployee(formData);
      setSubmittedEmployee(added);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="form-page-container">
      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
          className="email-link"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="form-card">
        {submittedEmployee ? (
          /* Submission Success State */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--badge-emerald-bg)',
                color: 'var(--badge-emerald-text)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Employee Registered!
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.75rem' }}>
              <strong>{submittedEmployee.name}</strong> has been added with ID{' '}
              <span className="badge-id">#{submittedEmployee.id}</span>. You can inspect the record on the Dashboard.
            </p>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                maxWidth: '440px',
                margin: '0 auto 2rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Designation:</span>
                <span style={{ fontWeight: 600 }}>{submittedEmployee.designation}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Location:</span>
                <span style={{ fontWeight: 600 }}>{submittedEmployee.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Salary:</span>
                <span style={{ fontWeight: 700, color: 'var(--badge-emerald-text)' }}>
                  {submittedEmployee.salary.startsWith('$') ? submittedEmployee.salary : `$${submittedEmployee.salary}`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
              >
                <UserPlus size={16} />
                <span>Add Another Employee</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/')}
                id="btn-go-dashboard"
              >
                <span>View in Dashboard &rarr;</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <>
            <div className="form-header">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent-gradient)',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 8px 20px var(--accent-glow)'
                }}
              >
                <UserPlus size={26} />
              </div>
              <h2 className="form-title">Create Employee Record</h2>
              <p className="form-description">
                Enter personnel details below to register an employee in the system.
              </p>
            </div>

            {/* Note alert regarding assignment spec */}
            <div
              style={{
                background: 'var(--badge-blue-bg)',
                border: '1px solid var(--badge-blue-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.75rem',
                fontSize: '0.85rem',
                color: 'var(--badge-blue-text)'
              }}
            >
              <Info size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>Assignment Note:</strong> Data is handled client-side in React state and verified locally. No backend POST request is required.
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                {/* Field 1: Name */}
                <div className="form-group">
                  <label htmlFor="employee-name" className="form-label">
                    <span>Full Name</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="employee-name"
                      name="name"
                      className={`form-control ${errors.name ? 'has-error' : ''}`}
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                {/* Field 2: Designation */}
                <div className="form-group">
                  <label htmlFor="employee-designation" className="form-label">
                    <span>Designation / Role</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <Briefcase size={18} className="input-icon" />
                    <input
                      type="text"
                      id="employee-designation"
                      name="designation"
                      className={`form-control ${errors.designation ? 'has-error' : ''}`}
                      placeholder="e.g. Senior Frontend Architect"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.designation && <div className="error-message">{errors.designation}</div>}

                  {/* Preset quick buttons */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                    {designationPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePresetClick('designation', preset)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        +{preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 3: Location */}
                <div className="form-group">
                  <label htmlFor="employee-location" className="form-label">
                    <span>Location / Office City</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <input
                      type="text"
                      id="employee-location"
                      name="location"
                      className={`form-control ${errors.location ? 'has-error' : ''}`}
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.location && <div className="error-message">{errors.location}</div>}

                  {/* Location Presets */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                    {locationPresets.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handlePresetClick('location', loc)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        +{loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 4: Salary */}
                <div className="form-group">
                  <label htmlFor="employee-salary" className="form-label">
                    <span>Annual Salary (USD)</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <DollarSign size={18} className="input-icon" />
                    <input
                      type="text"
                      id="employee-salary"
                      name="salary"
                      className={`form-control ${errors.salary ? 'has-error' : ''}`}
                      placeholder="e.g. 95000"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.salary && <div className="error-message">{errors.salary}</div>}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  <RotateCcw size={16} />
                  <span>Clear</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  id="btn-submit-employee"
                >
                  <Sparkles size={16} />
                  <span>{isSubmitting ? 'Registering...' : 'Save Employee'}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
