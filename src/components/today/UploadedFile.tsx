import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface UploadedFileProps {
  name: string;
  url: string;
  onRemove: () => void;
  fileSize: string;
  progress?: number;
}

export default function UploadedFile({
  name,
  url,
  onRemove,
  fileSize,
  progress,
}: UploadedFileProps) {
  return (
    <div className="bg-bg-tertiary flex py-[6px] items-center rounded-[8px] pr-4 pl-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-12-500 text-text-tertiary truncate leading-4 underline"
        >
          {name}
        </a>
        <span className="text-12-500 text-text-disabled leading-4">
          {fileSize}
        </span>
        {progress !== undefined && progress < 100 && (
          <Progress
            value={progress}
            className="bg-border-tertiary mt-1 h-0.5 w-[316px] mt-[2px]"
            indicatorClassName="bg-border-primary"
          />
        )}
      </div>
      <button onClick={onRemove} className="ml-auto cursor-pointer">
        <Image src="/today/x-file.svg" alt="삭제" width={16} height={16} />
      </button>
    </div>
  );
}
