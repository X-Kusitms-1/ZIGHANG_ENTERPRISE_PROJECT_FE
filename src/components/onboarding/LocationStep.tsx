import { Button } from "../ui/Button";
import LocationGrid from "./LocationGrid";

type LocationItem = {
  city: string;
  district: string;
};

interface LocationStepProps {
  locationList: LocationItem[];
  setLocationList: React.Dispatch<React.SetStateAction<LocationItem[]>>;
  isUndecided: boolean;
  setIsUndecided: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function LocationStep({
  locationList,
  setLocationList,
  isUndecided,
  setIsUndecided,
  setCurrentStep,
}: LocationStepProps) {
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1); // 이전 단계로
  };

  const handleNext = () => {
    // 온보딩 완료 또는 다음 단계로
    console.log("온보딩 완료!");
  };

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <LocationGrid
        locationList={locationList}
        setLocationList={setLocationList}
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
        >
          완료
        </Button>
      </div>
    </div>
  );
}
