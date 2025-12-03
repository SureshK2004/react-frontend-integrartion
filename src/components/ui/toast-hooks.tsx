import { useState, useCallback } from 'react';

interface ToastState {
  isVisible: boolean;
  title: string;
  description?: string;
}

export const useCustomToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    title: '',
    description: ''
  });

  const showToast = useCallback((title: string, description?: string) => {
    setToast({
      isVisible: true,
      title,
      description
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};