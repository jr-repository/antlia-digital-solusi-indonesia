
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  username: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const isAuthenticated = !!user?.isAuthenticated;

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('antlia_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication logic - replace with proper auth system later
    if (username === 'antlia' && password === 'antliaadmin') {
      const userData = {
        username: 'antlia',
        isAuthenticated: true,
      };
      
      setUser(userData);
      localStorage.setItem('antlia_user', JSON.stringify(userData));
      
      toast({
        title: 'Login Berhasil',
        description: 'Selamat datang di panel admin Antlia',
      });
      
      return true;
    } else {
      toast({
        title: 'Login Gagal',
        description: 'Username atau password salah',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('antlia_user');
    
    // Instead of using navigate, we'll use window.location
    window.location.href = '/admin/login';
    
    toast({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari sistem',
    });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
