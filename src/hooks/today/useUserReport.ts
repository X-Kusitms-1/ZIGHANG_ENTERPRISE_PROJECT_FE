import { useMutation } from "@tanstack/react-query";
import { PostUserReport } from "@/api/today/userReport";

export const usePostUserReport = (report: {
  year: string;
  month: string;
  weekOfMonth: string;
}) => {
  return useMutation({
    mutationFn: () => PostUserReport(report),
  });
};
