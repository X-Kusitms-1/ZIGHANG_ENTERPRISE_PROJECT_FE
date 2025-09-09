import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeCompany, unsubscribeCompany } from "@/api/news/subscribe";
import { companyQueryKeys } from "./useGetCompanyWithNews";
import { newsQueryKeys } from "./useGetNewsList";

export const useSubscriptionMutation = (companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscribeCompany(companyId),
    onSuccess: () => {
      // 회사 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.detail(companyId),
      });
      // 뉴스 리스트(무한스크롤) 전체 키 무효화
      queryClient.refetchQueries({ queryKey: newsQueryKeys.all });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export const useUnsubscriptionMutation = (companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unsubscribeCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.detail(companyId),
      });
      queryClient.refetchQueries({ queryKey: newsQueryKeys.all });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
