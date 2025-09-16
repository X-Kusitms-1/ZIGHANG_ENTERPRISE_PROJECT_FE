import { useMutation } from "@tanstack/react-query";
import {
  getPresignedUrlApi,
  PresignedUrlRequest,
} from "@/api/today/getPresignedUrl";
import {
  saveFileApi,
  saveMultipleFilesApi,
  SaveFileRequest,
} from "@/api/today/saveFile";

export const useGetPresignedUrl = () => {
  return useMutation({
    mutationFn: (request: PresignedUrlRequest) => getPresignedUrlApi(request),
  });
};

export const useSaveFile = () => {
  return useMutation({
    mutationFn: (request: SaveFileRequest) => saveFileApi(request),
  });
};

export const useSaveMultipleFiles = () => {
  return useMutation({
    mutationFn: (requests: SaveFileRequest[]) => saveMultipleFilesApi(requests),
  });
};
