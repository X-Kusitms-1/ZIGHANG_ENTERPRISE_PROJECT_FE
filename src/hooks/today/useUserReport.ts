import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserReport, PostUserReport } from "@/api/today/userReport";

export const usePostUserReport = (report: {
  year: string;
  month: string;
  weekOfMonth: string;
}) => {
  return useMutation({
    mutationFn: () => PostUserReport(report),
  });
};

export const useGetUserReport = (
  year: string,
  month: string,
  weekOfMonth: string,
  isOpen: boolean
) => {
  return useQuery({
    queryKey: ["userReport", year, month, weekOfMonth],
    queryFn: () => GetUserReport(year, month, weekOfMonth),
    enabled: isOpen,
  });
};
