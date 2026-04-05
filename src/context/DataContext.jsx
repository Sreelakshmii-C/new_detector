import { createContext, useContext, useState, useEffect } from 'react';
import { recentLogs, trustedDevices as initialTrusted, mockAlerts } from '../utils/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [modalState, setModalState] = useState(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('activityLogs')) || recentLogs;
    const storedAlerts = JSON.parse(localStorage.getItem('alerts')) || mockAlerts;
    const storedDevices = JSON.parse(localStorage.getItem('hd_devices')) || initialTrusted;

    setLogs(storedLogs);
    setAlerts(storedAlerts);
    setDevices(storedDevices);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('activityLogs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('hd_devices', JSON.stringify(devices));
  }, [devices]);

  const resolveAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  const resolveAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, status: 'Resolved' })));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const markLogsResolved = (email) => {
    setLogs(prev => prev.map(log => log.email === email && log.isSuspicious ? { ...log, isSuspicious: false } : log));
  };

  const addActivityLog = (log) => {
    setLogs(prev => [log, ...prev]);
  };

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const showModal = (title, message) => {
    setModalState({ title, message });
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <DataContext.Provider value={{ 
      logs, 
      alerts, 
      devices,
      resolveAlert,
      resolveAllAlerts,
      clearAlerts,
      markLogsResolved,
      addActivityLog,
      addAlert,
      modalState,
      showModal,
      closeModal
    }}>
      {children}
    </DataContext.Provider>
  );
};
