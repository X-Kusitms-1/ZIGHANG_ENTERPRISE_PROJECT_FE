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
  onSubmit: () => void;
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
    onSubmit(); // 페이지에서 받은 전송 함수 실행
  };

  return (
    <div className="mobile:flex-1 flex h-full flex-col items-center justify-between">
      <LocationGrid
        locationList={locationList}
        setLocationList={setLocationList}
      />
      <div className="mobile:w-full mobile:px-2 pc:w-auto flex gap-3">
        <Button
          variant="outlined"
          size="lg"
          className="mobile:flex-1 h-[56px] w-[170.5px]"
          onClick={handlePrevious}
        >
          이전으로
        </Button>
        <Button
          variant="filled"
          size="lg"
          className="mobile:flex-1 h-[56px] w-[170.5px]"
          onClick={handleNext}
          disabled={locationList.length === 0}
        >
          다 했어요!
        </Button>
      </div>
    </div>
  );
}
