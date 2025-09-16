import Image from "next/image";
import { Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PastApplyItem } from "@/api/today/getPastApplyList";
// import { FileUploadResult } from "@/utils/multiFileUploader"; // 파일 관리 로직 주석 처리로 인해 미사용
import StatusSelector from "./StatusSelector";
import FileUploadModalEnhanced from "./FileUploadModalEnhanced";

interface PastApplyEachComponentProps {
  item: PastApplyItem;
}

export default function PastApplyEachComponent({
  item,
}: PastApplyEachComponentProps) {
  // 파일 상태를 별도로 관리 (주석 처리: 백엔드에서 파일 데이터를 내려주지 않음)
  // const [files, setFiles] = useState<File[]>([]);
  // const [uploadResults, setUploadResults] = useState<FileUploadResult[]>([]);
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusChipRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close status selector
  // 상태 선택 드롭다운이 열려 있을 때, 바깥 영역을 클릭하면 드롭다운을 닫아주는 역할
  useEffect(() => {
    // 바깥 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      // statusChipRef 영역 바깥을 클릭하면 닫힘
      if (
        statusChipRef.current &&
        !statusChipRef.current.contains(event.target as Node)
      ) {
        setIsStatusSelectorOpen(false);
      }
    };

    // 드롭다운이 열려 있을 때만 이벤트 리스너 등록
    if (isStatusSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 언마운트 또는 닫힐 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isStatusSelectorOpen]);

  const handleStatusChipClick = () => {
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "합격":
        return {
          bgClass: "bg-[#E7F8E4]",
          textClass: "text-[#16A800]",
          label: "합격",
        };
      case "탈락":
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

  const statusConfig = getStatusConfig(item.applyStatus);

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
                currentStatus={
                  item.applyStatus as "대기중" | "합격" | "불합격" | "탈락"
                }
                recruitmentId={item.recruitmentId}
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
        <div className="flex w-[180px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.companyName}
          </span>
        </div>

        {/* Job Title */}
        <div className="flex w-[180px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.recruitmentOriginUrl}
          </span>
        </div>

        {/* Application Date */}
        <div className="flex w-[150px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary leading-4">
            {item.createdAt}
          </span>
        </div>
      </div>

      {/* File Upload/Management - 파일 관리 로직 주석 처리 (백엔드에서 파일 데이터를 내려주지 않음) */}
      <div className="flex items-center">
        <div className="flex w-[100px] flex-col items-center justify-center">
          {/* 파일이 있을 때와 없을 때 조건부 렌더링 주석 처리 */}
          {/* {files.length > 0 ? (
            <button className="bg-bg-neutral text-12-500 text-text-tertiary flex h-8 w-[74px] cursor-pointer items-center justify-center rounded-[4px] px-3 py-2">
              파일 관리
            </button>
          ) : ( */}
          <FileUploadModalEnhanced
            number={item.number}
            recruitmentId={item.recruitmentId}
            // onFileUpload={(newFiles: File[]) => {
            //   // 파일 선택 시 처리
            //   setFiles(newFiles);
            // }}
            // onUploadComplete={(results: FileUploadResult[]) => {
            //   // 업로드 완료 시 처리
            //   setUploadResults(results);
            //   const successFiles = results
            //     .filter((r) => r.success)
            //     .map((r) => r.file);
            //   setFiles(successFiles);
            //   console.log("업로드 완료:", results);
            // }}
            onCancel={() => {
              // 취소 시에는 아무 작업도 하지 않고 모달만 닫음
              console.log("Upload cancelled - no changes made");
            }}
          >
            <button className="text-12-500 text-text-tertiary border-border-tertiary bg-bg-base flex h-8 w-[74px] cursor-pointer items-center justify-center gap-[2px] rounded-[4px] border px-3 py-2 leading-4">
              업로드
              <div className="flex h-3 w-3 items-center justify-center">
                <Upload size={10.8} color="#686D79" />
              </div>
            </button>
          </FileUploadModalEnhanced>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
