import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";

interface AuthData {
  username: string;
  user_id: string;
  access_token: string;
  token_type: string;
}

interface AuthContextType {
  auth: AuthData | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USERNAME = "test";
const DUMMY_PASSWORD = "test@123";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedAuth = localStorage.getItem("auth");
        if (savedAuth) {
          setAuth(JSON.parse(savedAuth));
        }
      } catch (error) {
        setAuth(null);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      const authData: AuthData = {
        username: DUMMY_USERNAME,
        user_id: "1",
        access_token: "dummy_token_" + Date.now(),
        token_type: "bearer",
      };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
    } else {
      throw new Error("Invalid username or password");
    }
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      const authData: AuthData = {
        username: DUMMY_USERNAME,
        user_id: "1",
        access_token: "dummy_token_" + Date.now(),
        token_type: "bearer",
      };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
    } else {
      throw new Error("Registration failed");
    }
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
    localStorage.removeItem("auth");
  }, []);

  const contextValue = useMemo(
    () => ({
      auth,
      login,
      register,
      logout,
      isInitialized,
    }),
    [auth, login, register, logout, isInitialized]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}