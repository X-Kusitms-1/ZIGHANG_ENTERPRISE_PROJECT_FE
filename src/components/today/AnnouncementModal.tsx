"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import AnnouncementCard from "./AnnouncementCard";

interface Announcement {
  id: string;
  companyName: string;
  companyThumbnailUrl: string;
  description: string;
  companyTypeLabel: string[];
}

const announcementsData: Announcement[] = [
  {
    id: "naver",
    companyName: "네이버",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "신입 개발자 채용",
    companyTypeLabel: ["신입", "정규직", "4년제", "경기도 성남시"],
  },
  {
    id: "kakao",
    companyName: "카카오",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "프론트엔드 개발자",
    companyTypeLabel: ["신입", "계약직", "4년제", "경기도 성남시"],
  },
  {
    id: "samsung",
    companyName: "삼성전자",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "소프트웨어 엔지니어",
    companyTypeLabel: ["신입", "정규직", "4년제", "경기도 용인시"],
  },
  {
    id: "lg",
    companyName: "LG전자",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "백엔드 개발자",
    companyTypeLabel: ["신입", "계약직", "4년제", "경기도 용인시"],
  },
  {
    id: "sk",
    companyName: "SK하이닉스",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "데이터 분석가",
    companyTypeLabel: ["신입", "정규직", "4년제", "경기도 용인시"],
  },
  {
    id: "hyundai",
    companyName: "현대자동차",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    description: "AI 개발자",
    companyTypeLabel: ["신입", "계약직", "4년제", "경기도 용인시"],
  },
];

function AnnouncementModal() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="filled" size="lg">
          공고 추천받기
        </Button>
      </DialogTrigger>
      <DialogContent className="flex min-h-[620px] min-w-[1000px] flex-col gap-8 bg-white p-11">
        <DialogHeader>
          <DialogTitle className="!text-32-700 text-text-secondary">
            00 님을 위해 선택지를 여유있게 준비했어요!
          </DialogTitle>
          <DialogDescription className="!text-16-500 text-text-tertiary">
            앞에서 입력한 개수와는 상관 없이 리스트에 담을 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <div className="custom-scrollbar bg-bg-neutral flex min-h-[340px] gap-5 overflow-x-auto p-5">
          {announcementsData.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              {...announcement}
              onSelect={() => handleToggleSelection(announcement.id)}
              selected={selectedIds.includes(announcement.id)}
            />
          ))}
        </div>
        <DialogFooter className="flex w-full items-center justify-end gap-6">
          <Button variant="outlined" size="lg">
            정확도 올리기
          </Button>
          <Button
            variant="filled"
            size="lg"
            disabled={selectedIds.length === 0}
            className="w-[320px]"
          >
            공고 리스트업 하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AnnouncementModal;
