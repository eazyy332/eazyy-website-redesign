import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { View, Text } from 'react-native';

type ToastType = 'success' | 'error' | 'info';
type Toast = { id: number; type: ToastType; message: string };

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="none" className="absolute left-0 right-0 bottom-14 items-center z-50">
        {toasts.map((t) => (
          <View
            key={t.id}
            className={`px-4 py-3 mb-2 rounded-2xl border ${
              t.type === 'success'
                ? 'bg-green-50 border-green-200'
                : t.type === 'error'
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200'
            }`}
            style={{ maxWidth: '90%' }}
          >
            <Text
              className={`${
                t.type === 'success' ? 'text-green-700' : t.type === 'error' ? 'text-red-700' : 'text-foreground'
              }`}
            >
              {t.message}
            </Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}


