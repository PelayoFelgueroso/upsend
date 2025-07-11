import api from "@/lib/axios";
import { ChangePasswordRequest, UpdateUserRequest } from "@/auth/models/User";
import { User } from "@prisma/client";

export class UserService {
  private static readonly ENDPOINTS = {
    USER: "/auth/user",
    UPDATE_USER: "/auth/user",
    CHANGE_PASSWORD: "/auth/user/password",
  } as const;

  /**
   * Get current user information
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<{ user: User }>(
        UserService.ENDPOINTS.USER
      );
      return response.data.user;
    } catch (error) {
      throw UserService.handleError(error, "Failed to fetch user information");
    }
  }

  /**
   * Update user profile information
   */
  static async updateUser(data: UpdateUserRequest): Promise<User> {
    try {
      const response = await api.patch<{ user: User }>(
        this.ENDPOINTS.UPDATE_USER,
        data
      );
      return response.data.user;
    } catch (error) {
      throw this.handleError(error, "Failed to update user information");
    }
  }

  /**
   * Change user password
   */
  static async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      await api.post(this.ENDPOINTS.CHANGE_PASSWORD, data);
    } catch (error) {
      throw this.handleError(error, "Failed to change password");
    }
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
