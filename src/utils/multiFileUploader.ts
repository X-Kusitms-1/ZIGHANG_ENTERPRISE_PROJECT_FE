// utils/multiFileUploader.ts
import { useGetPresignedUrl } from "@/hooks/today/useFileUpload";

export interface FileUploadResult {
  file: File;
  success: boolean;
  objectUrl?: string;
  savedFileId?: number;
  error?: string;
}

export interface FileUploadProgress {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

/**
 * React Hook을 사용하는 다중 파일 업로드 훅
 */
export const useMultipleFileUpload = () => {
  // presigned url만 사용
  const presignedUrlMutation = useGetPresignedUrl();

  const uploadMultipleFiles = async (
    files: File[],
    recruitmentId: number,
    onProgress?: (_progress: FileUploadProgress[]) => void,
    maxConcurrency = 5
  ): Promise<FileUploadResult[]> => {
    const results: FileUploadResult[] = [];
    const progressMap = new Map<string, FileUploadProgress>();

    // 초기 진행 상황 설정
    files.forEach((file) => {
      progressMap.set(file.name, {
        fileName: file.name,
        progress: 0,
        status: "pending",
      });
    });

    // 진행 상황 업데이트 함수
    const updateProgress = (
      fileName: string,
      updates: Partial<FileUploadProgress>
    ) => {
      const current = progressMap.get(fileName);
      if (current) {
        progressMap.set(fileName, { ...current, ...updates });
        onProgress?.(Array.from(progressMap.values()));
      }
    };

    // 단일 파일 업로드 함수
    const uploadSingleFile = async (file: File): Promise<FileUploadResult> => {
      try {
        updateProgress(file.name, { status: "uploading", progress: 0 });

        // 1. presigned URL 요청 (Hook 사용)
        const prefix = "resume";
        const response = await presignedUrlMutation.mutateAsync({
          prefix,
          fileName: file.name.replace(/\s+/g, ""),
        });
        const { preSignedUrl, objectUrl } = response.data;

        if (!preSignedUrl) {
          throw new Error("preSignedUrl을 받지 못했습니다");
        }

        updateProgress(file.name, { progress: 30 });

        // 2. 파일 업로드
        const uploadResponse = await fetch(preSignedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!uploadResponse.ok) {
          throw new Error(`파일 업로드 실패: ${uploadResponse.status}`);
        } else {
          console.log("put으로 파일 업로드하기 성공", uploadResponse);
        }

        updateProgress(file.name, { status: "completed", progress: 100 });

        return {
          file,
          success: true,
          objectUrl,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "업로드 실패";
        updateProgress(file.name, { status: "error", error: errorMessage });

        return {
          file,
          success: false,
          error: errorMessage,
        };
      }
    };

    // 파일을 청크로 나누어 동시성 제어
    const fileChunks = chunkArray(files, maxConcurrency);

    for (const chunk of fileChunks) {
      const chunkPromises = chunk.map((file) => uploadSingleFile(file));
      const chunkResults = await Promise.allSettled(chunkPromises);

      chunkResults.forEach((result, index) => {
        const file = chunk[index];
        if (result.status === "fulfilled") {
          results.push(result.value);
        } else {
          results.push({
            file,
            success: false,
            error: result.reason?.message || "알 수 없는 오류",
          });
          updateProgress(file.name, {
            status: "error",
            error: result.reason?.message,
          });
        }
      });
    }

    return results;
  };

  return {
    uploadMultipleFiles,
    isLoading: presignedUrlMutation.isPending,
    error: presignedUrlMutation.error,
  };
};

/**
 * 배열을 일정 크기(chunkSize)만큼 잘라서
 * 여러 개의 작은 배열로 나눠주는 유틸리티 함수
 */
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
