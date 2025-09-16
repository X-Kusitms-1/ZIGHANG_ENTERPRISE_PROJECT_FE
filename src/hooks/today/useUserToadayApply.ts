import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserTodayApply,
  postUserTodayApply,
} from "@/api/today/userTodayApply";

export const useUserTodayApply = () => {
  return useQuery({
    queryKey: ["userTodayApply"],
    queryFn: () => getUserTodayApply(),
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
