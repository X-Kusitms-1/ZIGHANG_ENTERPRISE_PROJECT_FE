import React from "react";
import { useGetPastApplyList } from "@/hooks/today/useGetApplyList";
import { changePendingStatus } from "@/api/today/changePendingStatus";

interface StatusSelectorProps {
  currentStatus: "대기중" | "합격" | "불합격" | "탈락";
  recruitmentId: number;
  onClose: () => void;
}

export default function StatusSelector({
  currentStatus,
  recruitmentId,
  onClose,
}: StatusSelectorProps) {
  const statusOptions = [
    { value: "대기중", label: "대기중" },
    { value: "합격", label: "합격" },
    { value: "불합격", label: "불합격" },
  ];

  const { refreshPastApplyList } = useGetPastApplyList();
  const handleStatusClick = async (status: string) => {
    console.log("Selected status:", status);
    let statusCode: "pending" | "passed" | "rejected";
    switch (status) {
      case "대기중":
        statusCode = "pending";
        break;
      case "합격":
        statusCode = "passed";
        break;
      case "불합격":
        statusCode = "rejected";
        break;
      default:
        statusCode = "pending";
    }

    try {
      await changePendingStatus(recruitmentId, statusCode);
      refreshPastApplyList();
    } catch (err) {
      console.error("지원 상태 변경 에러:", err);
    } finally {
      onClose();
    }
  };

  return (
    <div
      className="bg-bg-base flex w-[76px] flex-col gap-1 rounded-[4px] p-1 shadow-[0_4px_8px_0_rgba(0,0,0,0.04),0_0_12px_0_rgba(0,0,0,0.04)]"
      onMouseDown={(e) => {
        e.stopPropagation(); // 부모의 handleClickOutside 차단
      }}
    >
      {statusOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onMouseDown={() => {
            handleStatusClick(option.value);
          }}
          className={`flex cursor-pointer items-center self-stretch rounded-[4px] px-2 py-[6px] text-left ${
            currentStatus === option.value
              ? "bg-bg-base-hovered text-text-primary"
              : "bg-bg-base text-text-tertiary hover:bg-bg-base-hovered hover:text-text-primary"
          }`}
        >
          <span className="text-12-500 pointer-events-none leading-4">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
