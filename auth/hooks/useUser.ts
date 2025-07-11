"use client";

import { UpdateUserRequest } from "@/auth/models/User";
import { UserService } from "@/auth/services/user.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Query keys for consistent cache management
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
};

/**
 * Hook to get current user data with caching and error handling
 */
export function useUser() {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: UserService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: AxiosError) => {
      // Don't retry on authentication errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to update user profile with optimistic updates
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.updateUser,
    onMutate: async (newUserData: UpdateUserRequest) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: userKeys.current() });

      // Snapshot previous value
      const previousUser = queryClient.getQueryData(userKeys.current());

      // Optimistically update
      if (previousUser) {
        queryClient.setQueryData(userKeys.current(), {
          ...previousUser,
          ...newUserData,
          updatedAt: new Date().toISOString(),
        });
      }

      return { previousUser };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(userKeys.current(), context.previousUser);
      }
      toast.error(error.message || "Failed to update profile");
    },
    onSuccess: (data) => {
      // Update cache with server response
      queryClient.setQueryData(userKeys.current(), data);
      toast.success("Profile updated successfully");
    },
  });
}

/**
 * Hook to change user password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: UserService.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
}
