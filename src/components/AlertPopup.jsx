import { useEffect } from 'react';
import { AlertCircle, X, CheckCircle, ShieldAlert, Activity } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AlertPopup() {
  const { modalState, closeModal, addActivityLog, markLogsResolved } = useData();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const handleSecureAccount = () => {
    closeModal();
    toast.success('✅ Account Secured Successfully');
    
    if (currentUser?.email) {
      markLogsResolved(currentUser.email);
    }
    
    const newLog = {
      id: `sec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      deviceType: 'System Controller',
      os: 'Internal',
      browser: 'Security Process',
      ipAddress: '127.0.0.1',
      location: 'Internal System',
      isSuspicious: false,
      status: 'System Secured',
      email: currentUser?.email || 'unknown@example.com'
    };
    
    addActivityLog(newLog);
  };

  useEffect(() => {
    if (modalState) {
      // Play a generic non-intrusive alert ping safely
      try {
        const alertAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        alertAudio.volume = 0.5;
        alertAudio.play().catch(e => console.log('Audio autoplay blocked by browser'));
      } catch (e) {
        console.log('Audio error:', e);
      }
    }
  }, [modalState]);

  if (!modalState) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[var(--bg-surface)] border border-red-500/40 shadow-2xl rounded-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="bg-red-500/10 p-6 border-b border-red-500/20 relative">
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center text-center mt-2">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{modalState.title || "⚠️ Security Alert"}</h3>
            <p className="text-sm mt-3 text-[var(--text-secondary)] px-2 leading-relaxed">
              {modalState.message}
            </p>
          </div>
        </div>
        
        <div className="p-5 bg-[var(--bg-surface)] flex gap-3 flex-col sm:flex-row">
          <button 
            onClick={handleSecureAccount}
            className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 shadow-md transition-all active:scale-95"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Secure Account
          </button>
          <button 
            onClick={() => {
              closeModal();
              navigate('/activity');
            }}
            className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] text-sm font-semibold transition-all active:scale-95"
          >
            <Activity className="w-4 h-4 mr-2" />
            View Activity
          </button>
        </div>
        
        <div className="px-4 pb-5">
          <button 
            onClick={closeModal}
            className="w-full text-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline-offset-2 hover:underline transition-all"
          >
            Ignore this warning
          </button>
        </div>
      </div>
    </div>
  );
}
