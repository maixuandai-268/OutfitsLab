"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: number;
  email: string;
  displayName: string;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  password?: string;
  role: string;
  shop?: {
    id: number;
    status: string;
    shop_name?: string;
  };
  shopId?: number | null;
  shopStatus?: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (jwt: string) => {
    try {
      const res = await fetch(`https://outfitslab.onrender.com/api/users/me?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();

      // FIX: Map dữ liệu từ data.shop sang shopId và shopStatus cho Navbar dùng
      setUser({
        ...data,
        shopId: data.shop?.id || null,
        shopStatus: data.shop?.status || null
      });
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const storedToken = localStorage.getItem("token") || localStorage.getItem("access_token");
    if (storedToken) await fetchUser(storedToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    fetchUser(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};