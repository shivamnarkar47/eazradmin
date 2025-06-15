"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, ApiResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ADMIN_CONTACT_NUMBER, DEFAULT_OTP, MOCK_TOKEN } from "@/lib/constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => Cookies.get("adminToken") || null);
  const router = useRouter();

  const login = async (contactNumber: string, otp: string): Promise<boolean> => {
    if (contactNumber === ADMIN_CONTACT_NUMBER && otp === DEFAULT_OTP) {
      const mockResponse: ApiResponse = {
        success: true,
        token: MOCK_TOKEN,
      };
      
      setToken(mockResponse.token || null);
      Cookies.set("adminToken", mockResponse.token || "", { expires: 1 }); 
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("adminToken");
    router.push("/admin/login");
  };

  const isAuthenticated = (): boolean => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};