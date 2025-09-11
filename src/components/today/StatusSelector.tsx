import React from "react";

interface StatusSelectorProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  onClose: () => void;
}

export default function StatusSelector({
  currentStatus,
  onStatusChange,
  onClose,
}: StatusSelectorProps) {
  const statusOptions = [
    { value: "대기중", label: "대기중" },
    { value: "합격", label: "합격" },
    { value: "불합격", label: "불합격" },
  ];

  const handleStatusClick = (status: string) => {
    onStatusChange(status);
    onClose();
  };

  return (
    <div className="flex w-[76px] flex-col gap-1 rounded-[4px] bg-bg-base p-1 shadow-[0_4px_8px_0_rgba(0,0,0,0.04),0_0_12px_0_rgba(0,0,0,0.04)]">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleStatusClick(option.value)}
          className={`flex items-center self-stretch rounded-[4px] px-2 py-[6px] text-left ${
            currentStatus === option.value
              ? "bg-bg-base-hovered text-text-primary"
              : "bg-bg-base text-text-tertiary hover:bg-bg-base-hovered hover:text-text-primary"
          }`}
        >
          <span className="text-12-500 leading-4">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
