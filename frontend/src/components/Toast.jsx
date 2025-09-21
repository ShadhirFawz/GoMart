import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in when component mounts
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    
    return () => clearTimeout(enterTimer);
  }, []);

  const handleClose = () => {
    console.log('Close button clicked for toast:', toast.id);
    setIsExiting(true);
    // Wait for exit animation to complete before removing
    setTimeout(() => {
      if (toast.id) {
        console.log('Removing toast:', toast.id);
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
          <div className="toast-icon-success">
            <i className="bi bi-check-circle-fill"></i>
          </div>
        );
      case 'error':
        return (
          <div className="toast-icon-error">
            <i className="bi bi-x-circle-fill"></i>
          </div>
        );
      case 'warning':
        return (
          <div className="toast-icon-warning">
            <i className="bi bi-exclamation-circle-fill"></i>
          </div>
        );
      case 'info':
        return (
          <div className="toast-icon-info">
            <i className="bi bi-info-circle-fill"></i>
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
        return `${baseClass} toast-success`;
      case 'error':
        return `${baseClass} toast-error`;
      case 'warning':
        return `${baseClass} toast-warning`;
      case 'info':
        return `${baseClass} toast-info`;
      default:
        return `${baseClass} toast-default`;
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
        maxWidth: '400px',
        position: 'relative' // Added for proper positioning
      }}
    >
      {getIcon()}
      
      <div className="flex-grow-1 me-3" style={{paddingRight: '30px'}}> {/* Added padding for close button */}
        <h6 className="mb-1 fw-semibold">{toast.title}</h6>
        <p className="mb-0">{toast.message}</p>
      </div>
      
      <button
        type="button"
        className="btn-close"
        onClick={handleClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          padding: '0.5rem'
        }}
      ></button>
    </div>
  );
};

export default Toast;