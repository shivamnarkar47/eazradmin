export interface User {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
  }
  
  export interface AuthContextType {
    token: string | null;
    login: (contactNumber: string, otp: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: () => boolean;
  }
  
  export interface ApiResponse {
    success: boolean;
    message?: string;
    token?: string;
    users?: User[];
    user?: User;
  }