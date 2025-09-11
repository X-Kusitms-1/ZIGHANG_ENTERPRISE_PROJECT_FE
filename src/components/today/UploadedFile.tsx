import React from "react";

interface UploadedFileProps {
  name: string;
  url: string;
  onRemove: () => void;
}

export default function UploadedFile({
  name,
  url,
  onRemove,
}: UploadedFileProps) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-12-500 text-text-info flex-1 truncate underline"
      >
        {name}
      </a>
      <button onClick={onRemove} className="text-12-500 text-red-500">
        삭제
      </button>
    </div>
  );
}
