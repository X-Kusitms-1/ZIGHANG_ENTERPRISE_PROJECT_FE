"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();
  return (
    <Image
      src="/x-button.svg"
      alt="닫기"
      width={24}
      height={24}
      className="cursor-pointer"
      onClick={() => router.back()}
    />
  );
}
