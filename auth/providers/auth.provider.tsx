"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AuthContextType,
  AuthState,
  LoginCredentials,
} from "@/auth/models/Auth";
import { AuthService } from "@/auth/services/auth.service";
import { UserService } from "../services/user.service";

// Auth reducer for state management
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: any } }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check existing auth
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check for existing authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Set up automatic token refresh
  useEffect(() => {
    if (state.isAuthenticated) {
      const interval = setInterval(() => {
        refreshAuth().catch(() => {
          // Silent fail - will be handled by the next API call
        });
      }, 14 * 60 * 1000); // Refresh every 14 minutes

      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated]);

  const checkAuth = useCallback(async () => {
    try {
      dispatch({ type: "AUTH_START" });

      // Check if user has valid tokens
      if (!AuthService.isAuthenticated()) {
        dispatch({ type: "AUTH_LOGOUT" });
        return;
      }

      // Verify with server
      const user = await UserService.getCurrentUser();
      dispatch({ type: "AUTH_SUCCESS", payload: { user } });
    } catch {
      // Try to refresh token
      try {
        const authData = await AuthService.refreshToken();
        dispatch({ type: "AUTH_SUCCESS", payload: { user: authData.user } });
      } catch {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch({ type: "AUTH_START" });
        const authData = await AuthService.login(credentials);
        dispatch({ type: "AUTH_SUCCESS", payload: { user: authData.user } });

        // Mensaje más genérico que funciona para ambos casos
        toast.success(
          `Welcome${authData.user.name ? `, ${authData.user.name}` : ""}!`
        );
        router.push("/dashboard");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed";
        dispatch({ type: "AUTH_ERROR", payload: message });
        toast.error(message);
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      dispatch({ type: "AUTH_LOGOUT" });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      // Even if logout fails on server, clear local state
      dispatch({ type: "AUTH_LOGOUT" });
      router.push("/login");
    }
  }, [router]);

  const refreshAuth = useCallback(async () => {
    try {
      const authData = await AuthService.refreshToken();
      dispatch({ type: "AUTH_SUCCESS", payload: { user: authData.user } });
    } catch (error) {
      dispatch({ type: "AUTH_LOGOUT" });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
