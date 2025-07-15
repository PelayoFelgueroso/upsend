import api from "@/lib/axios";
import { ChangePasswordRequest, UpdateUserRequest } from "@/auth/models/User";
import { User, UserUsage } from "@prisma/client";

type UserWithUsage = User & {
  usage: UserUsage | null;
};

export class UserService {
  private static readonly ENDPOINTS = {
    USER: "/auth/user",
    UPDATE_USER: "/auth/user",
    CHANGE_PASSWORD: "/auth/user/password",
  } as const;

  /**
   * Get current user information
   */
  static async getCurrentUser(): Promise<UserWithUsage> {
    try {
      const response = await api.get<{ user: UserWithUsage }>(
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
