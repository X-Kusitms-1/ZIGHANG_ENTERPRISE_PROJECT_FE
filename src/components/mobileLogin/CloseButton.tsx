"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function CloseButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="닫기"
      className="cursor-pointer flex items-center justify-center p-0 bg-transparent border-none"
      onClick={() => router.back()}
    >
      <X size={24} />
    </button>
  );
}
