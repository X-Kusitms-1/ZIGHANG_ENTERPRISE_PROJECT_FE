"use client";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion for animations
import React, { useState, useRef } from "react";
import { FilePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/progress"; // Assuming you have a Progress component
import UploadedFile from "./UploadedFile";

interface FileUploadModalProps {
  children: React.ReactNode;
  onFileUpload?: (files: File[]) => void;
  onCancel?: () => void;
  onSave?: () => void;
  number?: string;
  initialFiles?: { name: string; url: string }[]; // 백엔드에서 받은 초기 파일 목록
}

interface UploadProgress {
  file: File;
  progress: number;
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
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기 파일을 상태에 반영 (백엔드에서 받은 파일)
  const [existingFiles, setExistingFiles] =
    useState<{ name: string; url: string }[]>(initialFiles);

  const handleFileSelect = (file: File) => {
    setSelectedFiles((prev) => [...prev, file]);
    startUploadSimulation(file); // 업로드 진행 상황 시뮬레이션
  };

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

  // 파일 업로드 진행 상황 시뮬레이션 (실제 업로드 로직으로 대체 가능)
  const startUploadSimulation = (file: File) => {
    setUploadProgress((prev) => [...prev, { file, progress: 0 }]);

    // Web Streams API를 사용한 가상 업로드
    const stream = new ReadableStream({
      start(controller) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress((prev) =>
            prev.map((item) =>
              item.file === file ? { ...item, progress } : item
            )
          );
          if (progress >= 100) {
            clearInterval(interval);
            controller.close();
            // 업로드 완료 후 파일 목록에 추가
            setExistingFiles((prev) => [
              ...prev,
              { name: file.name, url: URL.createObjectURL(file) },
            ]);
            setUploadProgress((prev) =>
              prev.filter((item) => item.file !== file)
            );
          }
        }, 500);
      },
    });

    const reader = stream.getReader();
    reader.read();
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedFiles([]);
    setUploadProgress([]);
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
        className="w-[400px] border-0 bg-transparent p-0 shadow-none"
        showCloseButton={false}
      >
        <div className="flex w-full flex-col items-start gap-6 rounded-xl border border-[#F1F5F9] bg-white p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.04),0_0_12px_0_rgba(0,0,0,0.04)]">
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
            {(existingFiles.length > 0 || uploadProgress.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full"
              >
                <div className="flex flex-col gap-2">
                  {uploadProgress.map((item) => (
                    <div
                      key={item.file.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-12-500 text-text-secondary flex-1 truncate">
                        {item.file.name}
                      </span>
                      <Progress value={item.progress} className="w-[100px]" />
                    </div>
                  ))}
                  {existingFiles.map((file) => (
                    <UploadedFile
                      key={file.name}
                      name={file.name}
                      url={file.url}
                      onRemove={() => handleRemoveFile(file.name)}
                    />
                  ))}
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
                setUploadProgress([]);
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
