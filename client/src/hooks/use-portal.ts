import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";
import React from "react";
import type { Engagement } from "@shared/schema";

const ENGAGEMENT_KEY = "/api/portal/engagements";

interface EngagementContextType {
  selectedEngagementId: number | null;
  setSelectedEngagementId: (id: number | null) => void;
}

const EngagementContext = createContext<EngagementContextType>({
  selectedEngagementId: null,
  setSelectedEngagementId: () => {},
});

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [selectedEngagementId, setSelectedEngagementId] = useState<number | null>(() => {
    const stored = localStorage.getItem("selectedEngagementId");
    return stored ? parseInt(stored, 10) : null;
  });

  const handleSetEngagement = (id: number | null) => {
    setSelectedEngagementId(id);
    if (id) {
      localStorage.setItem("selectedEngagementId", String(id));
    } else {
      localStorage.removeItem("selectedEngagementId");
    }
  };

  return React.createElement(
    EngagementContext.Provider,
    { value: { selectedEngagementId, setSelectedEngagementId: handleSetEngagement } },
    children
  );
}

export function usePortalEngagement() {
  const { data: engagements, isLoading } = useQuery<Engagement[]>({
    queryKey: [ENGAGEMENT_KEY],
  });

  const { selectedEngagementId, setSelectedEngagementId } = useContext(EngagementContext);

  const allEngagements = engagements ?? [];

  let engagement: Engagement | null = null;
  if (selectedEngagementId) {
    engagement = allEngagements.find((e) => e.id === selectedEngagementId) ?? null;
  }
  if (!engagement && allEngagements.length > 0) {
    engagement = allEngagements[0];
  }

  const engagementId = engagement?.id;

  return {
    engagement,
    engagements: allEngagements,
    engagementId,
    isLoading,
    selectedEngagementId,
    setSelectedEngagementId,
  };
}

export function usePortalData<T>(path: string, engagementId: number | undefined) {
  return useQuery<T>({
    queryKey: [`/api/portal/engagements/${engagementId}/${path}`],
    enabled: !!engagementId,
  });
}
