import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostUserAccuracy } from "@/api/today/userAccuracy";

export const usePostUserAccuracy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accuracy: {
      question1: string[];
      question2: string[];
      question3: string[];
      question4: string[];
      question5: string[];
      question6: string[];
      question7: string[];
      question8: string[];
      question9: string[];
      question10: string[];
    }) => PostUserAccuracy(accuracy),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userAccuracy"],
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
