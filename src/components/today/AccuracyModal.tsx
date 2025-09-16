"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AccuracyForm from "./AccuracyForm";
import AccuracySuccess from "./AccuracySuccess";

interface AccuracyModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

function AccuracyModal({ children, onClose }: AccuracyModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    onClose?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
    setIsSuccess(false);
    onClose?.();
  };

  const handleEdit = () => {
    setIsSuccess(false); // 성공 화면에서 폼으로 돌아가기
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // X 버튼으로 닫을 때도 초기화
      handleCancel();
    } else {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {isSuccess ? (
        <AccuracySuccess onClose={handleClose} onEdit={handleEdit} />
      ) : (
        <AccuracyForm onSave={handleSave} onCancel={handleCancel} />
      )}
    </Dialog>
  );
}

export default AccuracyModal;
