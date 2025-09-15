import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodayApplyList } from "@/api/today/getTodayApplyList";
import { getPastApplyList } from "@/api/today/getPastApplyList";

export const todayApplyQueryKeys = {
  all: ["todayApplyList"] as const,
  list: () => [...todayApplyQueryKeys.all, "list"] as const,
};

export const pastApplyQueryKeys = {
  all: ["pastApplyList"] as const,
  list: () => [...pastApplyQueryKeys.all, "list"] as const,
};

export const useGetTodayApplyList = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: todayApplyQueryKeys.list(),
    queryFn: getTodayApplyList,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 (평상시에는 캐시 사용)
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 안함
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 안함 (캐시 있으면)
    retry: 1,
  });

  // 리스트업 시 호출할 함수
  const refreshTodayApplyList = () => {
    queryClient.invalidateQueries({ queryKey: todayApplyQueryKeys.all });
  };

  return {
    ...query,
    refreshTodayApplyList, // 이 함수를 외부에서 호출
  };
};

export const useGetPastApplyList = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: pastApplyQueryKeys.list(),
    queryFn: getPastApplyList,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 (평상시에는 캐시 사용)
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 안함
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 안함 (캐시 있으면)
    retry: 1,
  });

  // 리스트업 시 호출할 함수
  const refreshPastApplyList = () => {
    queryClient.invalidateQueries({ queryKey: pastApplyQueryKeys.all });
  };

  return {
    ...query,
    refreshPastApplyList, // 이 함수를 외부에서 호출
  };
};
