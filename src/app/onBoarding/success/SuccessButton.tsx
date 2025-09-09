"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function SuccessButton() {
  const router = useRouter();

  const handleGoToMain = () => {
    router.push("/");
  };

  return (
    <Button
      variant="filled"
      size="lg"
      className="h-[56px] w-full"
      onClick={handleGoToMain}
    >
      나한테 꼭 맞는 공고 보러가기
    </Button>
  );
}
