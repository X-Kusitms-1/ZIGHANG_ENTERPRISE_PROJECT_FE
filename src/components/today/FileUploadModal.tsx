"use client";

import React, { useState, useRef } from "react";

import { FilePlus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";

interface FileUploadModalProps {
  children: React.ReactNode;
  onFileUpload?: (file: File) => void;
  onCancel?: () => void;
  onSave?: () => void;
  number?: string;
}

export default function FileUploadModal({
  children,
  onFileUpload,
  onCancel,
  onSave,
  number,
}: FileUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
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
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent
        className="file-upload-modal w-[400px] border-0 bg-transparent p-0 shadow-none"
        showCloseButton={false}
      >
        <div className="file-upload-container flex w-full flex-col items-start gap-6 rounded-xl border border-[#F1F5F9] bg-white p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.04),0_0_12px_0_rgba(0,0,0,0.04)]">
          {/* Header */}
          <div className="file-upload-header flex w-full items-start justify-between">
            <div className="header-content flex flex-col items-start justify-center gap-1">
              <div className="title-row flex items-start gap-1">
                <div className="step-number font-pretendard text-base leading-6 font-semibold text-[#2D3139]">
                  {number ? `${number}번` : "01번"}
                </div>
                <div className="upload-title font-pretendard text-base leading-6 font-semibold text-[#2D3139]">
                  파일 업로드
                </div>
              </div>
              <div className="description font-pretendard text-xs leading-4 font-medium text-[#686D79]">
                500MB의 제한이 있어요 어쩌구
              </div>
            </div>
          </div>

          {/* File Drop Area */}
          <div
            className={`drop-area flex h-[120px] w-full flex-col items-center justify-center gap-3 rounded-xl border-[1.6px] border-dashed px-0 py-8 ${
              isDragOver ? "border-[#9326D9] bg-[#F8F4FD]" : "border-[#E0E5F0]"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* File Icon (lucide) */}
            <FilePlus
              size={20}
              color="#686D79"
              className="file-icon flex-shrink-0"
            />

            {/* File Drop Text */}
            <div className="drop-text flex items-start gap-1">
              <span className="drag-text font-pretendard text-xs leading-4 font-medium text-[#686D79]">
                파일을 이곳에 드래그하거나
              </span>
              <div className="file-select-wrapper flex items-center">
                <button
                  onClick={handleFileSelectClick}
                  className="file-select-button font-pretendard text-xs leading-4 font-medium text-[#9326D9] underline"
                >
                  파일 선택
                </button>
                <span className="upload-instruction font-pretendard text-xs leading-4 font-medium text-[#686D79]">
                  을 눌러서 업로드하세요.
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons flex w-full items-start gap-2">
            <Button
              variant="outlined"
              size="md"
              className="cancel-button flex h-11 flex-1 items-center justify-center gap-2.5 rounded-lg border border-[#C2CCDB] bg-white px-3 py-3"
              onClick={handleCancel}
            >
              취소하기
            </Button>
            <Button
              variant="disabled"
              size="md"
              className="save-button flex h-11 flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#F1F5F9] px-3 py-3"
              disabled
              onClick={onSave}
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
          accept="*/*"
        />
      </DialogContent>
    </Dialog>
  );
}
