import { Button } from "../ui/Button";
import JobCategoryGrid from "./JobCategoryGrid";

type JobItem = {
  jobFamily: string;
  role: string;
};

interface JobFieldStepProps {
  jobList: JobItem[];
  setJobList: React.Dispatch<React.SetStateAction<JobItem[]>>;
  isUndecided: boolean;
  setIsUndecided: React.Dispatch<React.SetStateAction<boolean>>;
  career: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function JobFieldStep({
  jobList,
  setJobList,
  isUndecided,
  setIsUndecided,
  career,
  setCurrentStep,
}: JobFieldStepProps) {
  const handlePrevious = () => {
    // career가 1 이상이면 1단계 이전(경력연수 선택), 0이면 2단계 이전(경력 선택)
    if (career == -1) {
      setCurrentStep((prev)=>prev-1); // 경력연수 선택 단계
    } else {
      setCurrentStep((prev)=>prev-2); // 경력 선택 단계
    }
  };

  const handleNext = () => {
    setCurrentStep(3); // 다음 단계로
  };

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <JobCategoryGrid
        jobList={jobList}
        setJobList={setJobList}
        isUndecided={isUndecided}
        setIsUndecided={setIsUndecided}
      />
      <div className="flex gap-3">
        <Button
          variant="outlined"
          size="lg"
          className="h-[56px] w-[170.5px]"
          onClick={handlePrevious}
        >
          이전으로
        </Button>
        <Button
          variant="filled"
          size="lg"
          className="h-[56px] w-[170.5px]"
          onClick={handleNext}
          disabled={jobList.length===0 && !isUndecided}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}
