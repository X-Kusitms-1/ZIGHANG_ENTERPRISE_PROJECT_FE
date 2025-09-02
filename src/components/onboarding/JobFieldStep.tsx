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
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <JobCategoryGrid
        jobList={jobList}
        setJobList={setJobList}
        isUndecided={isUndecided}
        setIsUndecided={setIsUndecided}
      />
    </div>
  );
}
