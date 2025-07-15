import api from "@/lib/axios"
import { ApiKey } from "@prisma/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateApiKeyData {
  name: string
}

export function useApiKeys() {
  return useQuery({
    queryKey: ["apiKeys"],
    queryFn: async (): Promise<ApiKey[]> => {
      const response = await api.get("/api-keys")
      return response.data.apiKeys
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateApiKeyData): Promise<ApiKey> => {
      const response = await api.post("/api-keys", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] })
      toast.success("API key created successfully")
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create API key"
      toast.error(message)
    },
  })
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/api-keys/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] })
      toast.success("API key revoked successfully")
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to revoke API key"
      toast.error(message)
    },
  })
}
