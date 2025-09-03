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
}

export default function JobFieldStep({
  jobList,
  setJobList,
  isUndecided,
  setIsUndecided,
}: JobFieldStepProps) {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <JobCategoryGrid
        jobList={jobList}
        setJobList={setJobList}
        isUndecided={isUndecided}
        setIsUndecided={setIsUndecided}
      />
      <div className="flex gap-3">
        <Button variant="outlined" size="lg" className="w-[170.5px] h-[56px]">이전으로</Button>
        <Button variant="filled" size="lg"  className="w-[170.5px] h-[56px]">다음으로</Button>
      </div>
    </div>
  );
}
