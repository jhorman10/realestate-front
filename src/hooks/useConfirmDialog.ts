import { useState, useCallback } from 'react';

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const useConfirmDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'info',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showConfirm = useCallback((
    options: ConfirmDialogOptions = {}
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title: options.title || 'Confirm Action',
        message: options.message || 'Are you sure you want to proceed?',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        type: options.type || 'info',
        onConfirm: () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const hideDialog = useCallback(() => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    dialogState,
    showConfirm,
    hideDialog,
  };
};