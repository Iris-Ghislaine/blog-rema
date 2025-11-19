'use client';

import React, { createContext, useContext } from 'react';
import toast, { Toaster, Toast } from 'react-hot-toast';

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  loading: (message: string) => string;
  dismiss: (toastId?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastHelpers: ToastContextType = {
    success: (message: string) => {
      toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#10b981',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    },
    error: (message: string) => {
      toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    },
    loading: (message: string) => {
      return toast.loading(message, {
        position: 'top-right',
      });
    },
    dismiss: (toastId?: string) => {
      toast.dismiss(toastId);
    },
  };

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}