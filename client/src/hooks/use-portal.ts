import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";
import type { Engagement } from "@shared/schema";

const ENGAGEMENT_KEY = "/api/portal/engagements";

export function usePortalEngagement() {
  const { data: engagements, isLoading } = useQuery<Engagement[]>({
    queryKey: [ENGAGEMENT_KEY],
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/portal/seed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENGAGEMENT_KEY] });
    },
  });

  useEffect(() => {
    if (!isLoading && engagements && engagements.length === 0 && !seedMutation.isPending) {
      seedMutation.mutate();
    }
  }, [isLoading, engagements]);

  const engagement = engagements?.[0];
  const engagementId = engagement?.id;

  return { engagement, engagementId, isLoading: isLoading || seedMutation.isPending };
}

export function usePortalData<T>(path: string, engagementId: number | undefined) {
  return useQuery<T>({
    queryKey: [`/api/portal/engagements/${engagementId}/${path}`],
    enabled: !!engagementId,
  });
}
