import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '../context/ToastContext';
import { useToast } from '../context/ToastContext';

interface ToastProps {
  toast: ToastType;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in when component mounts
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    
    return () => clearTimeout(enterTimer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before removing
    setTimeout(() => {
      if (toast.id) {
        removeToast(toast.id);
      }
    }, 400);
  };

  // Auto-remove toast when duration ends
  useEffect(() => {
    if (toast.duration !== 0 && toast.id) {
      const timer = setTimeout(handleClose, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, removeToast]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <div className="d-inline-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-success bg-opacity-25 me-3" style={{width: '40px', height: '40px'}}>
            <i className="bi bi-check-circle-fill text-success"></i>
          </div>
        );
      case 'error':
        return (
          <div className="d-inline-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-danger bg-opacity-25 me-3" style={{width: '40px', height: '40px'}}>
            <i className="bi bi-x-circle-fill text-danger"></i>
          </div>
        );
      case 'warning':
        return (
          <div className="d-inline-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-warning bg-opacity-25 me-3" style={{width: '40px', height: '40px'}}>
            <i className="bi bi-exclamation-circle-fill text-warning"></i>
          </div>
        );
      case 'info':
        return (
          <div className="d-inline-flex align-items-center justify-content-center flex-shrink-0 rounded-circle bg-info bg-opacity-25 me-3" style={{width: '40px', height: '40px'}}>
            <i className="bi bi-info-circle-fill text-info"></i>
          </div>
        );
      default:
        return null;
    }
  };

  const getToastClass = () => {
    let baseClass = 'toast-alert d-flex align-items-center p-3 mb-2 rounded shadow';
    
    switch (toast.type) {
      case 'success':
        return `${baseClass} border-start border-5 border-success`;
      case 'error':
        return `${baseClass} border-start border-5 border-danger`;
      case 'warning':
        return `${baseClass} border-start border-5 border-warning`;
      case 'info':
        return `${baseClass} border-start border-5 border-info`;
      default:
        return `${baseClass} border-start border-5 border-secondary`;
    }
  };

  return (
    <div
      className={getToastClass()}
      role="alert"
      style={{
        transform: isExiting ? 'translateX(100%)' : isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isExiting ? 0 : isVisible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      {getIcon()}
      
      <div className="flex-grow-1 me-3">
        <h6 className="mb-1 fw-semibold">{toast.title}</h6>
        <p className="mb-0">{toast.message}</p>
      </div>
      
      <button
        type="button"
        className="btn-close"
        onClick={handleClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Toast;