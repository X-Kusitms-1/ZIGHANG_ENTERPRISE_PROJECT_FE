"use client";
function ApplyTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-14-500 flex items-center justify-center rounded-[6px] px-3 py-1.5 transition-all cursor-pointer ${
        active
          ? "bg-bg-base text-text-primary"
          : "bg-bg-neutral-hovered text-text-tertiary"
      }`}
      style={
        active
          ? {
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 12px rgba(0, 0, 0, 0.04)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

interface ApplyListMenuProps {
  activeTab: "today" | "past";
  onTabChange: React.Dispatch<React.SetStateAction<"today" | "past">>;
  className?: string;
}

export default function ApplyListMenu({
  activeTab,
  onTabChange,
  className,
}: ApplyListMenuProps) {
  return (
    <div
      className={`bg-bg-neutral-hovered flex w-fit items-center gap-3 rounded-[12px] p-2 ${className || ""}`}
    >
      <ApplyTabButton
        active={activeTab === "today"}
        onClick={() => onTabChange("today")}
      >
        오늘의 지원 리스트
      </ApplyTabButton>
      <ApplyTabButton
        active={activeTab === "past"}
        onClick={() => onTabChange("past")}
      >
        지난 지원 리스트
      </ApplyTabButton>
    </div>
  );
}
