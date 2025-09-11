import Image from "next/image";
import { Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PastApplyListItem } from "./PastApplyList";
import StatusSelector from "./StatusSelector";
import FileUploadModal from "./FileUploadModal";

interface PastApplyEachComponentProps {
  item: PastApplyListItem;
  onUploadClick: (item: PastApplyListItem) => void;
  onFileManageClick: (item: PastApplyListItem) => void;
  onStatusChange?: (item: PastApplyListItem, newStatus: string) => void;
}

export default function PastApplyEachComponent({
  item,
  onUploadClick,
  onFileManageClick,
  onStatusChange,
}: PastApplyEachComponentProps) {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusChipRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close status selector
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusChipRef.current &&
        !statusChipRef.current.contains(event.target as Node)
      ) {
        setIsStatusSelectorOpen(false);
      }
    };

    if (isStatusSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStatusSelectorOpen]);

  const handleStatusChipClick = () => {
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(item, newStatus);
    }
    setIsStatusSelectorOpen(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "합격":
        return {
          bgClass: "bg-[#E7F8E4]",
          textClass: "text-[#16A800]",
          label: "합격",
        };
      case "불합격":
        return {
          bgClass: "bg-[#FAE1E1]",
          textClass: "text-[#DC3838]",
          label: "불합격",
        };
      case "대기중":
      default:
        return {
          bgClass: "bg-[#F1F5F9]",
          textClass: "text-[#2D3139]",
          label: "대기중",
        };
    }
  };

  const statusConfig = getStatusConfig(item.status);

  return (
    <div
      className={`flex h-12 items-center justify-between px-5 py-2 ${isStatusSelectorOpen ? "relative z-50" : "z-10"}`}
    >
      <div className="flex items-center gap-2">
        {/* Status Chip */}
        <div className="relative">
          <button
            ref={statusChipRef}
            onClick={handleStatusChipClick}
            className={`flex w-[68px] cursor-pointer items-center rounded-full px-2.5 py-[6px] transition-opacity hover:opacity-80 ${statusConfig.bgClass}`}
          >
            <span
              className={`text-12-500 flex-1 px-[2px] text-left leading-4 ${statusConfig.textClass}`}
            >
              {statusConfig.label}
            </span>
            <div className="flex h-3 w-3 items-center justify-center">
              <Image
                src="/today/rounded-triangle.svg"
                alt="triangle"
                width={5}
                height={4}
              />
            </div>
          </button>
          {isStatusSelectorOpen && (
            <div className="absolute top-[-6px] left-[-4px] z-50 mt-1 w-full">
              <StatusSelector
                currentStatus={item.status}
                onStatusChange={handleStatusChange}
                onClose={() => setIsStatusSelectorOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Number */}
        <div className="flex w-[60px] items-center justify-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.number}
          </span>
        </div>

        {/* Company Name */}
        <div className="flex w-[100px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.companyName}
          </span>
        </div>

        {/* Job Title */}
        <div className="flex w-[100px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.jobTitle}
          </span>
        </div>

        {/* Application Date */}
        <div className="flex w-[100px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.applicationDate}
          </span>
        </div>
      </div>

      {/* File Upload/Management */}
      <div className="flex items-center">
        <div className="flex w-[100px] flex-col items-center justify-center">
          {item.hasUploadedFile ? (
            <button
              className="bg-bg-neutral text-12-500 text-text-tertiary flex h-8 w-[74px] cursor-pointer items-center justify-center rounded-[4px] px-3 py-2"
              onClick={() => onFileManageClick(item)}
            >
              파일 관리
            </button>
          ) : (
            <FileUploadModal
              number={item.number}
              onFileUpload={(file) => {
                console.log("File uploaded:", file);
              }}
              onCancel={() => {
                console.log("File upload cancelled");
              }}
              onSave={() => {
                console.log("File saved");
              }}
            >
              <button className="text-12-500 text-text-tertiary border-border-tertiary bg-bg-base flex h-8 w-[74px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border px-3 py-2 leading-4">
                업로드
                <div className="flex h-3 w-3 items-center justify-center">
                  <Upload size={10.8} color="#686D79" />
                </div>
              </button>
            </FileUploadModal>
          )}
        </div>
      </div>
    </div>
  );
}
