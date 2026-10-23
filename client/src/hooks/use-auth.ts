import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import type { z } from "zod";
import type { registerSchema } from "@shared/schema";

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
}

interface AuthSession {
  user: AuthUser;
  impersonation: { adminFullName: string; adminEmail: string } | null;
}
export type RegistrationInput = z.infer<typeof registerSchema>;

export function useAuth() {
  const { data, isLoading, error } = useQuery<AuthSession>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 30000,
  });

  return {
    user: data?.user ?? null,
    impersonation: data?.impersonation ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
  };
}

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return res.json();
    },
    onSuccess: (data) => {
      if (!data.requiresTwoFactor) {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      }
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegistrationInput) => {
      const res = await apiRequest("POST", "/api/auth/register", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (!data.pendingApproval) {
        queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      }
    },
  });
}

export function useVerify2FA() {
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await apiRequest("POST", "/api/auth/verify-2fa", { code });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });
}

export function useSetup2FA() {
  return useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/setup-2fa");
      return res.json();
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", "/api/auth/forgot-password", { email });
      return res.json();
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: { token?: string; email?: string; code?: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/reset-password", data);
      return res.json();
    },
  });
}

export function useLogout() {
  const [, setLocation] = useLocation();
  return useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/portal/login");
    },
  });
}
