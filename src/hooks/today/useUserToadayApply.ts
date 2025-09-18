import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserTodayApply,
  postUserTodayApply,
} from "@/api/today/userTodayApply";

export const useUserTodayApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      isFirstApiCall,
      requireRefreshRecruitmentId,
    }: {
      isFirstApiCall: boolean;
      requireRefreshRecruitmentId: string;
    }) => getUserTodayApply(isFirstApiCall, requireRefreshRecruitmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userTodayApply"],
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export const usePostUserTodayApply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recruitmentId: string[]) => postUserTodayApply(recruitmentId),
    onSuccess: () => {
      // 관련 쿼리키들 초기화
      queryClient.invalidateQueries({
        queryKey: ["userTodayApply"],
      });
      queryClient.invalidateQueries({
        queryKey: ["todayApplyList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["news", "list"],
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
