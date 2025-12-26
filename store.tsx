import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // ⚡️ عند تحميل التطبيق، اقرأ من localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  // ⚡️ عند تغير اليوزر، خزنه في localStorage
  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem('user', JSON.stringify(u));
    } else {
      localStorage.removeItem('user');
    }
  };

  // ⚡️ عند تغير الثيم، طبق الكلاس على الـ html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
