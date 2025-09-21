import React from 'react';
import { useToast } from '../context/ToastContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3" style={{zIndex: 1100}}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;