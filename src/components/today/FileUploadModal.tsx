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
import UploadedFile from "./UploadedFile";

interface FileUploadModalProps {
  children: React.ReactNode;
  onFileUpload?: (_files: File[]) => void;
  onCancel?: () => void;
  onSave?: () => void;
  number?: string;
  initialFiles?: { name: string; url: string }[];
}

interface FileWithProgress {
  name: string;
  url: string;
  progress?: number;
  size?: number;
}

export default function FileUploadModal({
  children,
  onFileUpload,
  onCancel,
  onSave,
  number,
  initialFiles = [],
}: FileUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 목록 (progress 포함)
  const [existingFiles, setExistingFiles] = useState<FileWithProgress[]>(
    initialFiles.map((file) => ({ ...file, progress: 100 }))
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArr = Array.from(files);
      setSelectedFiles((prev) => [...prev, ...fileArr]);
      fileArr.forEach((file) => startUploadSimulation(file));
    }
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
      if (pdfFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...pdfFiles]);
        pdfFiles.forEach((file) => startUploadSimulation(file));
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

  // 파일 업로드 진행 상황 시뮬레이션
  const startUploadSimulation = (file: File) => {
    // 파일을 즉시 리스트에 추가 (progress 0으로 시작)
    const newFile: FileWithProgress = {
      name: file.name,
      url: URL.createObjectURL(file),
      progress: 0,
      size: file.size,
    };
    setExistingFiles((prev) => [...prev, newFile]);

    // 진행률 시뮬레이션
    const interval = setInterval(() => {
      setExistingFiles((prev) =>
        prev.map((item) =>
          item.name === file.name &&
          item.progress !== undefined &&
          item.progress < 100
            ? { ...item, progress: Math.min(item.progress + 1, 100) }
            : item
        )
      );
    }, 10);

    // 2초 후 완료
    setTimeout(() => {
      clearInterval(interval);
      setExistingFiles((prev) =>
        prev.map((item) =>
          item.name === file.name ? { ...item, progress: 100 } : item
        )
      );
    }, 2000);
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedFiles([]);
    setExistingFiles(initialFiles.map((file) => ({ ...file, progress: 100 })));
    if (onCancel) onCancel();
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
    setExistingFiles((prev) => prev.filter((file) => file.name !== fileName));
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
              onClick={handleFileSelectClick}
            />
            <div className="flex items-start gap-1">
              <span className="text-12-500 text-text-tertiary leading-4">
                파일을 이곳에 드래그하거나
              </span>
              <div className="flex items-center">
                <button
                  onClick={handleFileSelectClick}
                  className="text-12-500 text-text-info cursor-pointer leading-4 underline"
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
                    업로드된 파일
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
                          onRemove={() => handleRemoveFile(file.name)}
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
            >
              취소하기
            </Button>
            <Button
              variant="filled"
              size="md"
              className="text-14-500 flex h-11 flex-1 items-center justify-center rounded-[8px] px-4 py-4"
              onClick={() => {
                if (onFileUpload) onFileUpload(selectedFiles);
                if (onSave) onSave();
                setSelectedFiles([]);
                setExistingFiles(
                  initialFiles.map((file) => ({ ...file, progress: 100 }))
                );
                setOpen(false);
              }}
            >
              저장하기
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
        />
      </DialogContent>
    </Dialog>
  );
}
