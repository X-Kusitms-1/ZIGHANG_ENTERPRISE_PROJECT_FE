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
      queryClient.invalidateQueries({
        queryKey: ["userTodayApply"],
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
