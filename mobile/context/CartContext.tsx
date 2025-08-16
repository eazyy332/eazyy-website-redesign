import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  serviceCategory: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  decrementItem: (serviceCategory: string, id: string) => void;
  removeItem: (serviceCategory: string, id: string) => void;
  clear: () => void;
  getQty: (serviceCategory: string, id: string) => number;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'eazzy-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const key = `${item.serviceCategory}:${item.id}`;
      const found = prev.find((ci) => `${ci.serviceCategory}:${ci.id}` === key);
      if (found) {
        return prev.map((ci) =>
          `${ci.serviceCategory}:${ci.id}` === key ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decrementItem = (serviceCategory: string, id: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((ci) => ci.serviceCategory === serviceCategory && ci.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const current = copy[idx];
      const nextQty = current.quantity - 1;
      if (nextQty <= 0) {
        return copy.filter((ci) => !(ci.serviceCategory === serviceCategory && ci.id === id));
      }
      copy[idx] = { ...current, quantity: nextQty };
      return copy;
    });
  };

  const removeItem = (serviceCategory: string, id: string) => {
    setItems((prev) => prev.filter((ci) => !(ci.serviceCategory === serviceCategory && ci.id === id)));
  };

  const clear = () => setItems([]);

  const getQty = (serviceCategory: string, id: string) =>
    items.find((ci) => ci.serviceCategory === serviceCategory && ci.id === id)?.quantity ?? 0;

  const count = useMemo(() => items.reduce((t, i) => t + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((t, i) => t + i.price * i.quantity, 0), [items]);

  const value: CartContextValue = { items, addItem, decrementItem, removeItem, clear, getQty, count, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}


