import { Button } from "../ui/Button";
import LocationGrid from "./LocationGrid";

type LocationItem = {
  city: string;
  district: string;
};

interface LocationStepProps {
  locationList: LocationItem[];
  setLocationList: React.Dispatch<React.SetStateAction<LocationItem[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: () => void;
}

export default function LocationStep({
  locationList,
  setLocationList,
  setCurrentStep,
  onSubmit,
}: LocationStepProps) {
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1); // 이전 단계로
  };

  const handleNext = () => {
    if (onSubmit) {
      onSubmit(); // 온보딩 데이터 전송
    }
  };

  return (
    <div className="flex h-full flex-col items-center gap-[21px]">
      <LocationGrid
        locationList={locationList}
        setLocationList={setLocationList}
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
          disabled={locationList.length === 0}
        >
          다 했어요!
        </Button>
      </div>
    </div>
  );
}
