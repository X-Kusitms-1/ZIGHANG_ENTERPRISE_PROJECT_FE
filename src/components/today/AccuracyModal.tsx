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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      {isSuccess ? (
        <AccuracySuccess onClose={handleClose} />
      ) : (
        <AccuracyForm onSave={handleSave} />
      )}
    </Dialog>
  );
}

export default AccuracyModal;
