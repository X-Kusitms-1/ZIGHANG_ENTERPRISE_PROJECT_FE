"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useUserTodayApply,
  usePostUserTodayApply,
} from "@/hooks/today/useUserToadayApply";
import { getUserName } from "@/utils/localStorage";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/Button";
import AnnouncementCard from "./AnnouncementCard";
import AccuracyModal from "./AccuracyModal";

function AnnouncementModal() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const { data: userTodayApply } = useUserTodayApply();
  const { mutate: postUserTodayApply } = usePostUserTodayApply();

  // 하이드레이션 오류 방지를 위해 useEffect에서 userName 설정
  useEffect(() => {
    const name = getUserName();
    setUserName(name || "");
  }, []);

  const handlePostUserTodayApply = () => {
    postUserTodayApply(selectedIds, {
      onSuccess: () => {
        setIsOpen(false);
        setSelectedIds([]); // 선택된 항목들 초기화
      },
    });
  };

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "filled", size: "lg" }),
            "h-[52px] w-[92px] cursor-pointer rounded-[10px]"
          )}
        >
          <span className="text-base">공고 확인</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex min-h-[620px] min-w-[1000px] flex-col gap-8 bg-white p-11">
        <DialogHeader>
          <DialogTitle className="!text-32-700 text-text-secondary">
            {userName
              ? `${userName} 님을 위해 선택지를 여유있게 준비했어요!`
              : "선택지를 여유있게 준비했어요!"}
          </DialogTitle>
          <DialogDescription className="!text-16-500 text-text-tertiary">
            앞에서 입력한 개수와는 상관 없이 리스트에 담을 수 있어요.
          </DialogDescription>
        </DialogHeader>

        {userTodayApply && (
          <div className="custom-scrollbar bg-bg-neutral flex min-h-[340px] gap-5 overflow-x-auto p-5">
            {userTodayApply.map((announcement) => (
              <AnnouncementCard
                key={announcement.recruitmentId}
                userTodayApply={announcement}
                onSelect={() =>
                  handleToggleSelection(announcement.recruitmentId)
                }
                selected={selectedIds.includes(announcement.recruitmentId)}
              />
            ))}
          </div>
        )}
        <DialogFooter className="flex w-full items-center justify-end gap-6">
          <AccuracyModal onClose={() => setIsOpen(false)}>
            <Button variant="outlined" size="lg">
              정확도 올리기
            </Button>
          </AccuracyModal>
          <Button
            variant="filled"
            size="lg"
            disabled={selectedIds.length === 0}
            className="w-[320px]"
            type="submit"
            onClick={handlePostUserTodayApply}
          >
            공고 리스트업 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AnnouncementModal;
