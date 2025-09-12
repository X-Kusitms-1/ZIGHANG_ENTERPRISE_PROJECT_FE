"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WorkTypeSection from "./WorkTypeSection";
import CertificationSection from "./CertificationSection";

interface AccuracyFormProps {
  onSave: () => void;
}

function AccuracyForm({ onSave }: AccuracyFormProps) {
  const [workTypeSelections, setWorkTypeSelections] = useState<string[]>([]);
  const [certificationSelections, setCertificationSelections] = useState<
    string[]
  >([]);

  return (
    <DialogContent className="flex min-h-[620px] min-w-[1000px] flex-col bg-white p-0">
      <DialogHeader className="border-border-line w-full border-b px-11 pt-11 pb-6 text-center">
        <DialogTitle className="!text-32-700 text-text-secondary text-center">
          소현님의 공고의 정확도를 올려드릴게요!
        </DialogTitle>
        <DialogDescription className="!text-16-500 text-text-tertiary mt-2 text-center">
          원하는 항목을 선택해 주세요! 답변은 정확도 탭에서 언제든지 수정할 수
          있어요.
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 px-11 py-8">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <WorkTypeSection
                selectedValues={workTypeSelections}
                onSelectionChange={setWorkTypeSelections}
              />
            </CarouselItem>
            <CarouselItem>
              <CertificationSection
                selectedValues={certificationSelections}
                onSelectionChange={setCertificationSelections}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <DialogFooter className="w-ful px-11 py-6">
        <div className="flex w-full items-center justify-end gap-6">
          <Button variant="outlined" size="lg">
            저장 없이 돌아가기
          </Button>
          <Button
            variant="filled"
            size="lg"
            className="w-[320px]"
            onClick={onSave}
          >
            저장하기
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}

export default AccuracyForm;
