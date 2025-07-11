import axios from "axios";
import { toast } from "sonner";

export async function requestHandler<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.message || "Request failed");
    }
    throw new Error("Unexpected error");
  }
}
