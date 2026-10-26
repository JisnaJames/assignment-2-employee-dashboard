import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

export default function ToastContainer() {
  const { toasts } = useEmployees();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || 'success'}`}>
          <div className="toast-icon-box">
            {toast.type === 'error' ? (
              <AlertCircle size={18} />
            ) : toast.type === 'info' ? (
              <Info size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
          </div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            {toast.message && <div className="toast-msg">{toast.message}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
