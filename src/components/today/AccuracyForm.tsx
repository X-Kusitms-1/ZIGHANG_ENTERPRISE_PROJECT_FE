"use client";

import React, { useState, useEffect } from "react";
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
import { stepData } from "@/constants/accuracyFormData";
import {
  usePostUserAccuracy,
  useGetUserAccuracy,
  usePutUserAccuracy,
} from "@/hooks/today/useUserAccuracy";
import { getUserName } from "@/utils/localStorage";
import CertificationSection from "./CertificationSection";

interface AccuracyFormProps {
  onSave: () => void;
  onCancel: () => void;
}

function AccuracyForm({ onSave, onCancel }: AccuracyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [allSelections, setAllSelections] = useState<string[][]>(
    Array(10).fill([])
  );
  const [hasExistingData, setHasExistingData] = useState(false);
  const { data: userAccuracy } = useGetUserAccuracy();

  const { mutate: postUserAccuracy } = usePostUserAccuracy();
  const { mutate: putUserAccuracy } = usePutUserAccuracy();

  // userAccuracy 데이터가 있을 때 초기값 설정
  useEffect(() => {
    if (userAccuracy) {
      const initialSelections = [
        userAccuracy.question1 || [],
        userAccuracy.question2 || [],
        userAccuracy.question3 || [],
        userAccuracy.question4 || [],
        userAccuracy.question5 || [],
        userAccuracy.question6 || [],
        userAccuracy.question7 || [],
        userAccuracy.question8 || [],
        userAccuracy.question9 || [],
        userAccuracy.question10 || [],
      ];
      setAllSelections(initialSelections);
      setHasExistingData(true);
    } else {
      setHasExistingData(false);
    }
  }, [userAccuracy]);

  const handlePostUserAccuracy = () => {
    const requestBody = {
      question1: allSelections[0] || [],
      question2: allSelections[1] || [],
      question3: allSelections[2] || [],
      question4: allSelections[3] || [],
      question5: allSelections[4] || [],
      question6: allSelections[5] || [],
      question7: allSelections[6] || [],
      question8: allSelections[7] || [],
      question9: allSelections[8] || [],
      question10: allSelections[9] || [],
    };
    if (hasExistingData) {
      putUserAccuracy(requestBody);
    } else {
      postUserAccuracy(requestBody);
    }
    onSave();
  };

  const handleSelectionChange = (stepIndex: number, selections: string[]) => {
    const newSelections = [...allSelections];
    newSelections[stepIndex] = selections;
    setAllSelections(newSelections);
  };

  const resetForm = () => {
    if (hasExistingData) {
      return;
    }
    setAllSelections(Array(10).fill([]));
    setCurrentStep(0);
  };

  const handleCancel = () => {
    // 선택된 항목들 초기화
    setAllSelections(Array(10).fill([]));
    setCurrentStep(0);
    // 모달 닫기
    onCancel();
  };

  const handleCarouselApi = (api: any) => {
    if (!api) return;

    api.on("select", () => {
      setCurrentStep(api.selectedScrollSnap());
    });
  };

  return (
    <DialogContent
      className="flex min-h-[620px] min-w-[1000px] flex-col bg-white p-0"
      onOpenAutoFocus={() => {
        resetForm();
      }}
    >
      <DialogHeader className="border-border-line w-full border-b px-11 pt-11 pb-6 text-center">
        <DialogTitle className="!text-32-700 text-text-secondary text-center">
          {getUserName()}님의 공고의 정확도를 올려드릴게요!
        </DialogTitle>
        <DialogDescription className="!text-16-500 text-text-tertiary mt-2 text-center">
          원하는 항목을 선택해 주세요! 답변은 정확도 탭에서 언제든지 수정할 수
          있어요.
        </DialogDescription>
        {/* 진행 단계 표시 */}
        <div className="text-14-500 text-text-tertiary mt-6">
          {currentStep + 1} / {stepData.length}
        </div>
      </DialogHeader>

      <div className="flex-1 px-11 py-8">
        <Carousel className="w-full" setApi={handleCarouselApi}>
          <CarouselContent>
            {stepData.map((step, index) => (
              <CarouselItem key={index}>
                <CertificationSection
                  title={step.title}
                  options={step.options}
                  selectedValues={allSelections[index]}
                  onSelectionChange={(selections) =>
                    handleSelectionChange(index, selections)
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <DialogFooter className="w-ful px-11 py-6">
        <div className="flex w-full items-center justify-end gap-6">
          <Button variant="outlined" size="lg" onClick={handleCancel}>
            저장 없이 돌아가기
          </Button>
          <Button
            variant="filled"
            size="lg"
            className="w-[320px]"
            onClick={handlePostUserAccuracy}
            disabled={allSelections.some(
              (selections) => selections.length === 0
            )}
          >
            저장하기
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}

export default AccuracyForm;
