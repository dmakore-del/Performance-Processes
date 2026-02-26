import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  role: string;
  status: string;
  twoFactorEnabled: boolean;
}

export function useAuth() {
  const { data, isLoading, error } = useQuery<{ user: AuthUser }>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 30000,
  });

  return {
    user: data?.user ?? null,
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
    mutationFn: async (data: { email: string; password: string; companyName: string; fullName: string; accountType?: string }) => {
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
    mutationFn: async (data: { token: string; password: string }) => {
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
