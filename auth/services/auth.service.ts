import api from "@/lib/axios";
import type {
  LoginCredentials,
  AuthResponse,
  AuthUser,
} from "@/auth/models/Auth";

export class AuthService {
  private static readonly ENDPOINTS = {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  } as const;

  private static readonly STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user",
  } as const;

  /**
   * Login user with credentials
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        this.ENDPOINTS.LOGIN,
        credentials
      );
      const authData = response.data;

      // Store user securely
      this.setUser(authData.user);

      return authData;
    } catch (error) {
      throw this.handleError(error, "Invalid credentials");
    }
  }

  /**
   * Logout user and clear tokens
   */
  static async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate tokens on server
      await api.post(this.ENDPOINTS.LOGOUT);
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn("Logout endpoint failed:", error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(this.ENDPOINTS.REFRESH);
      const authData = response.data;

      // Update stored tokens
      this.setUser(authData.user);
      return authData;
    } catch (error) {
      this.clearTokens();
      throw this.handleError(error, "Session expired");
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getUser();
  }

  /**
   * Get user from storage
   */
  static getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Set user in storage
   */
  private static setUser(user: AuthUser): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Clear user data
   */
  private static clearTokens(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.STORAGE_KEYS.USER);
  }

  /**
   * Handle API errors consistently
   */
  private static handleError(error: any, defaultMessage: string): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error(defaultMessage);
  }
}
