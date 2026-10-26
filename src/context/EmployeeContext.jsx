import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const LOCAL_STORAGE_KEY = 'staffpulse_custom_employees';
const THEME_STORAGE_KEY = 'staffpulse_theme';

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [customEmployees, setCustomEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  });
  const [toasts, setToasts] = useState([]);

  // Fetch employees from external API: https://jsonplaceholder.typicode.com/users
  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch records (HTTP ${response.status})`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'Unable to connect to the Employee API. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Persist custom added employees
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customEmployees));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  }, [customEmployees]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (title, message = '', type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Add employee (supports form submission)
  const addEmployee = (newEmpData) => {
    // Generate next sequential ID starting after API IDs (1-10)
    const nextId = employees.length + customEmployees.length + 1;
    const newEmployee = {
      id: nextId,
      name: newEmpData.name,
      email: newEmpData.email || `${newEmpData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      designation: newEmpData.designation,
      location: newEmpData.location,
      salary: newEmpData.salary,
      company: {
        name: newEmpData.designation || 'Staff Member',
        catchPhrase: `Operating out of ${newEmpData.location || 'HQ'}`
      },
      address: {
        city: newEmpData.location || 'HQ Office'
      },
      isCustom: true
    };

    setCustomEmployees(prev => [newEmployee, ...prev]);
    showToast('Employee Added Successfully!', `${newEmpData.name} has been added to the directory.`);
    return newEmployee;
  };

  // Combine fetched API data and locally submitted employees
  const allEmployees = [...customEmployees, ...employees];

  // Filtered employees based on search
  const filteredEmployees = allEmployees.filter(emp => {
    const query = searchTerm.toLowerCase();
    const idMatch = String(emp.id).toLowerCase().includes(query);
    const nameMatch = (emp.name || '').toLowerCase().includes(query);
    const emailMatch = (emp.email || '').toLowerCase().includes(query);
    const desigMatch = (emp.designation || emp.company?.name || '').toLowerCase().includes(query);
    const locMatch = (emp.location || emp.address?.city || '').toLowerCase().includes(query);
    return idMatch || nameMatch || emailMatch || desigMatch || locMatch;
  });

  return (
    <EmployeeContext.Provider
      value={{
        employees: filteredEmployees,
        rawEmployees: allEmployees,
        apiEmployeesCount: employees.length,
        customEmployeesCount: customEmployees.length,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        theme,
        toggleTheme,
        fetchEmployees,
        addEmployee,
        toasts,
        showToast
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}
