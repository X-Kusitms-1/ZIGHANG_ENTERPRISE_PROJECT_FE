"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  SearchWithNewsJobGroupsEnum,
  SearchWithNewsTypesEnum,
} from "@/api/generated/api/company-controller-api";

export type NewsFiltersState = {
  types?: Set<SearchWithNewsTypesEnum>;
  jobGroups?: Set<SearchWithNewsJobGroupsEnum>;
  regionCodes?: Set<string>;
  size?: number;
  sort?: string;
};

type NewsFilterContextValue = {
  filters: NewsFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<NewsFiltersState>>;
  showSubscribedOnly: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowSubscribedOnly: (next: boolean) => void;
  toggleSubscribedOnly: () => void;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

const NewsFilterContext = createContext<NewsFilterContextValue | null>(null);

export function useNewsFilterContext() {
  const ctx = useContext(NewsFilterContext);
  if (!ctx)
    throw new Error(
      "useNewsFilterContext must be used within NewsFilterProvider"
    );
  return ctx;
}

export function NewsFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<NewsFiltersState>({ size: 10 });
  const [showSubscribedOnly, _setShowSubscribedOnly] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const setShowSubscribedOnly = useCallback((next: boolean) => {
    _setShowSubscribedOnly(next);
  }, []);

  const toggleSubscribedOnly = useCallback(() => {
    _setShowSubscribedOnly((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      showSubscribedOnly,
      setShowSubscribedOnly,
      toggleSubscribedOnly,
      totalCount,
      setTotalCount,
    }),
    [
      filters,
      showSubscribedOnly,
      setFilters,
      setShowSubscribedOnly,
      toggleSubscribedOnly,
      totalCount,
      setTotalCount,
    ]
  );

  return (
    <NewsFilterContext.Provider value={value}>
      {children}
    </NewsFilterContext.Provider>
  );
}
