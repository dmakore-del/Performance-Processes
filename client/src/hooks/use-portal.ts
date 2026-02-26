import { useQuery } from "@tanstack/react-query";
import type { Engagement } from "@shared/schema";

const ENGAGEMENT_KEY = "/api/portal/engagements";

export function usePortalEngagement() {
  const { data: engagements, isLoading } = useQuery<Engagement[]>({
    queryKey: [ENGAGEMENT_KEY],
  });

  const engagement = engagements?.[0] ?? null;
  const engagementId = engagement?.id;

  return { engagement, engagements: engagements ?? [], engagementId, isLoading };
}

export function usePortalData<T>(path: string, engagementId: number | undefined) {
  return useQuery<T>({
    queryKey: [`/api/portal/engagements/${engagementId}/${path}`],
    enabled: !!engagementId,
  });
}
