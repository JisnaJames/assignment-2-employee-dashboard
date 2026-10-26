import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <div className="app-container">
          {/* Navbar with Home and Employee Form navigation links */}
          <Navbar />

          {/* Main Route Content */}
          <main className="main-content">
            <Routes>
              {/* Home & Dashboard are identical as per requirement */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              
              {/* Employee Form Route */}
              <Route path="/employee-form" element={<EmployeeForm />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Toast Notification Container */}
          <ToastContainer />

          {/* Footer Component */}
          <Footer />
        </div>
      </EmployeeProvider>
    </BrowserRouter>
  );
}
