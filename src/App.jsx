
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AlertPopup from './components/AlertPopup';

const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ActivityLogs from './pages/ActivityLogs';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            toastClassName="!bg-white/80 dark:!bg-black/60 !backdrop-blur-md !text-[var(--text-primary)] !rounded-xl !shadow-lg !border !border-[var(--border-color)]"
          />
          <AlertPopup />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="activity" element={<ActivityLogs />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
