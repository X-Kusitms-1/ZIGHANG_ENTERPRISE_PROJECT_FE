"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef } from "react";
import { FilePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import CustomScrollbar from "@/components/ui/CustomScrollbar";
import {
  useMultipleFileUpload,
  FileUploadResult,
  FileUploadProgress,
} from "@/utils/multiFileUploader";
import { useSaveFile } from "@/hooks/today/useFileUpload";
import UploadedFile from "./UploadedFile";

interface FileUploadModalProps {
  children: React.ReactNode;
  onFileUpload?: (_files: File[]) => void;
  onUploadComplete?: (_results: FileUploadResult[]) => void;
  onCancel?: () => void;
  onSave?: () => void;
  number?: string;
  recruitmentId?: number;
  initialFiles?: { name: string; url: string }[];
}

interface FileWithProgress {
  name: string;
  url: string;
  progress?: number;
  size?: number;
  status?: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export default function FileUploadModal({
  children,
  onFileUpload,
  onUploadComplete,
  onCancel,
  onSave,
  number,
  recruitmentId,
  initialFiles = [],
}: FileUploadModalProps) {
  // 업로드 완료된 파일 정보 (objectUrl 포함)
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: saveFileAsync } = useSaveFile();
  // Hook 사용
  const { uploadMultipleFiles } = useMultipleFileUpload();

  // 파일 목록 (progress 포함)
  const [existingFiles, setExistingFiles] = useState<FileWithProgress[]>(
    initialFiles.map((file) => ({
      ...file,
      progress: 100,
      status: "completed",
    }))
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArr = Array.from(files);
      const pdfFiles = fileArr.filter(
        (file) => file.type === "application/pdf"
      );
      const nonPdfFiles = fileArr.filter(
        (file) => file.type !== "application/pdf"
      );

      if (nonPdfFiles.length > 0) {
        alert("PDF 파일만 업로드 가능합니다.");
      }

      if (pdfFiles.length > 0 && recruitmentId) {
        // 파일을 리스트에 추가하고 바로 업로드 실행
        addFilesToList(pdfFiles);
        setIsUploading(true);
        // 즉시 업로드 실행
        uploadMultipleFiles(pdfFiles, recruitmentId, handleUploadProgress, 3)
          .then((results) => {
            setUploadedFiles((prev) => [
              ...prev,
              ...results.filter((r) => r.success),
            ]);
          })
          .finally(() => setIsUploading(false));
      }
    }
  };

  const addFilesToList = (files: File[]) => {
    const newFiles: FileWithProgress[] = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      progress: 0,
      size: file.size,
      status: "pending",
    }));
    setExistingFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const allFiles = Array.from(files);
      const pdfFiles = allFiles.filter(
        (file) => file.type === "application/pdf"
      );
      const nonPdfFiles = allFiles.filter(
        (file) => file.type !== "application/pdf"
      );
      if (nonPdfFiles.length > 0) {
        alert("PDF 파일만 업로드 가능합니다.");
      }
      if (pdfFiles.length > 0 && recruitmentId) {
        addFilesToList(pdfFiles);
        setIsUploading(true);
        uploadMultipleFiles(pdfFiles, recruitmentId, handleUploadProgress, 3)
          .then((results) => {
            setUploadedFiles((prev) => [
              ...prev,
              ...results.filter((r) => r.success),
            ]);
          })
          .finally(() => setIsUploading(false));
      }
    }
  };

  // 파일 크기를 포맷하는 함수
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // 진행 상황 업데이트 콜백
  const handleUploadProgress = (progressList: FileUploadProgress[]) => {
    setExistingFiles((prev) =>
      prev.map((file) => {
        const progress = progressList.find((p) => p.fileName === file.name);
        if (progress) {
          return {
            ...file,
            progress: progress.progress,
            status: progress.status,
            error: progress.error,
          };
        }
        return file;
      })
    );
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setOpen(false);
    setUploadedFiles([]);
    setExistingFiles(
      initialFiles.map((file) => ({
        ...file,
        progress: 100,
        status: "completed",
      }))
    );
    setIsUploading(false);
    if (onCancel) onCancel();
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) =>
      prev.filter((file) => file.file.name !== fileName)
    );
    setExistingFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSave = async () => {
    if (!recruitmentId) {
      console.error("recruitmentId가 필요합니다");
      return;
    }
    if (uploadedFiles.length === 0) {
      setOpen(false);
      return;
    }
    setIsUploading(true);
    try {
      // 업로드 완료된 파일 정보만 DB에 하나씩 저장
      for (const f of uploadedFiles) {
        if (!f.objectUrl) continue;
        const body = {
          originalFileName: f.file.name.replace(/\s+/g, ""),
          objectUrl: f.objectUrl,
          recruitmentId,
        };
        console.log("[saveFileApi] body:", body);
        await saveFileAsync(body);
      }
      // 콜백 호출
      if (onFileUpload) onFileUpload(uploadedFiles.map((f) => f.file));
      if (onUploadComplete) onUploadComplete(uploadedFiles);
      if (onSave) onSave();
      setUploadedFiles([]);
      setExistingFiles(
        // 업로드 목록도 초기화
        initialFiles.map((file) => ({
          ...file,
          progress: 100,
          status: "completed",
        }))
      );
      setOpen(false);
    } catch (error) {
      console.error("파일 DB 저장 중 오류:", error);
      alert("파일 DB 저장 중 오류가 발생했습니다.");
    } finally {
      alert("파일이 저장되었습니다.");
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent
        className="w-[400px] max-w-100 border-0 bg-transparent p-0 shadow-none"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="flex w-full max-w-[400px] flex-col items-start gap-6 rounded-xl border border-[#F1F5F9] bg-white p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.04),0_0_12px_0_rgba(0,0,0,0.04)]">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-16-600 text-text-secondary leading-6">
              {number ? `${number}번` : "01번"} 파일 업로드
            </DialogTitle>
            <div className="text-12-500 text-text-tertiary leading-4">
              500MB의 제한이 있어요. 최대 5개 파일 업로드 가능.
            </div>
          </div>

          {/* File Drop Area */}
          <div
            className={`flex h-[120px] w-full flex-col items-center justify-center gap-3 rounded-[12px] border-[1.6px] border-dashed px-0 py-8 ${
              isDragOver
                ? "border-[#9326D9] bg-[#F8F4FD]"
                : "border-border-tertiary"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FilePlus
              size={20}
              color="#686D79"
              className="flex-shrink-0 cursor-pointer"
              onClick={!isUploading ? handleFileSelectClick : undefined}
            />
            <div className="flex items-start gap-1">
              <span className="text-12-500 text-text-tertiary leading-4">
                파일을 이곳에 드래그하거나
              </span>
              <div className="flex items-center">
                <button
                  onClick={!isUploading ? handleFileSelectClick : undefined}
                  disabled={isUploading}
                  className="text-12-500 text-text-info cursor-pointer leading-4 underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  파일 선택
                </button>
                <span className="text-12-500 text-text-tertiary leading-4">
                  을 눌러서 업로드하세요.
                </span>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          <AnimatePresence>
            {existingFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-14-500 text-text-tertiary leading-5">
                    파일 목록
                  </div>
                  <CustomScrollbar variant="fileUpload">
                    <div
                      className={`flex w-full flex-col gap-2 bg-white ${existingFiles.length <= 4 ? "pr-3" : "pr-0"}`}
                    >
                      {existingFiles.map((file) => (
                        <UploadedFile
                          key={file.name}
                          name={file.name}
                          url={file.url}
                          progress={file.progress}
                          fileSize={formatFileSize(file.size || 0)}
                          onRemove={() =>
                            !isUploading && handleRemoveFile(file.name)
                          }
                        />
                      ))}
                    </div>
                  </CustomScrollbar>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex w-full items-start gap-2">
            <Button
              variant="outlined"
              size="md"
              className="text-14-500 flex h-11 flex-1 items-center justify-center rounded-[8px] px-4 py-4"
              onClick={handleCancel}
              disabled={isUploading}
            >
              취소하기
            </Button>
            <Button
              variant="filled"
              size="md"
              className="text-14-500 flex h-11 flex-1 items-center justify-center rounded-[8px] px-4 py-4"
              onClick={handleSave}
              disabled={isUploading}
            >
              {isUploading ? "업로드 중..." : "저장하기"}
            </Button>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          accept="application/pdf"
          multiple
          disabled={isUploading}
        />
      </DialogContent>
    </Dialog>
  );
}
