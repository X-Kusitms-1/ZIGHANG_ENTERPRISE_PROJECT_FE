"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplyStatus } from "@/api/today/getApplyStatus";

export const applyStatusQueryKeys = {
  all: ["applyStatus"] as const,
  list: () => [...applyStatusQueryKeys.all, "list"] as const,
};

export const useGetApplyStatus = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: applyStatusQueryKeys.list(),
    queryFn: getApplyStatus,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  // 외부에서 호출할 수 있는 상태 갱신 함수
  const refetchApplyStatus = () => {
    queryClient.invalidateQueries({ queryKey: applyStatusQueryKeys.list() });
  };

  return {
    ...query,
    refetchApplyStatus,
  };
};
