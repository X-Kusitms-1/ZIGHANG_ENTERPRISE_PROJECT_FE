import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeCompany, unsubscribeCompany } from "@/api/news/subscribe";

import { newsQueryKeys } from "./useGetNewsList";

export const useSubscriptionMutation = (companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscribeCompany(companyId),
    onSuccess: () => {
      // 회사 상세 쿼리 무효화
      queryClient.removeQueries({
        queryKey: ["company", "detail", companyId],
      });
      // 구독 기반 데이터 무효화
      queryClient.invalidateQueries({
        queryKey: ["subscribedCompaniesWithNews"],
      });
      // 뉴스 리스트(무한스크롤) 전체 키 무효화
      queryClient.refetchQueries({
        queryKey: newsQueryKeys.all,
        exact: false,
      });
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
      queryClient.removeQueries({
        queryKey: ["company", "detail", companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["subscribedCompaniesWithNews"],
      });
      queryClient.refetchQueries({
        queryKey: newsQueryKeys.all,
        exact: false,
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
