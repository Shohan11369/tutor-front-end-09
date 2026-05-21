import axios from 'axios';
import { authClient } from "@/lib/auth-client";

export const getAuthHeaders = async () => {
  const session = await authClient.getSession();
  const token = session?.data?.token || session?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = axios.create({
  baseURL: 'https://tutor-server-09.vercel.app',
});