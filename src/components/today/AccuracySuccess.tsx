import React from "react";
import Lottie from "lottie-react";
import { getUserName } from "@/utils/localStorage";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/Button";
import accuracyAnimation from "../../../public/animation/accuracy.json";

interface AccuracySuccessProps {
  onClose?: () => void;
  onEdit?: () => void;
}

function AccuracySuccess({ onClose, onEdit }: AccuracySuccessProps) {
  return (
    <DialogContent className="flex min-h-[620px] min-w-[1000px] flex-col justify-between bg-white">
      <DialogHeader className="border-border-line w-full border-b px-11 pt-11 pb-6 text-center">
        <DialogTitle className="!text-40-700 text-text-secondary text-center">
          {getUserName()}님의 답변을 성공적으로 저장했어요!
        </DialogTitle>
        <DialogDescription className="!text-18-500 text-text-tertiary mt-2 text-center">
          입력하신 답변을 바탕으로 더 적합한 공고를 보여드릴게요.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-1 items-center justify-center">
        <Lottie
          animationData={accuracyAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 280, height: 280 }}
        />
      </div>

      <DialogFooter className="w-ful mt-[70px] flex flex-row !justify-center gap-6">
        <Button
          variant="outlined"
          size="lg"
          className="w-[280px]"
          onClick={onEdit}
        >
          답변 수정하기
        </Button>
        <Button
          variant="filled"
          size="lg"
          className="w-[280px]"
          onClick={onClose}
        >
          더 적합한 추천 공고 보러가기
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default AccuracySuccess;
