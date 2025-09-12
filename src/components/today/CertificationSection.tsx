import React from "react";
import { FilterButton } from "../ui/FilterButton";

const certificationOptions = [
  { id: "none", label: "없음" },
  { id: "driver", label: "운전면허" },
  { id: "toeic", label: "토익 800+" },
  { id: "computer", label: "컴활 2급" },
  { id: "korean-history", label: "한국사" },
  { id: "other", label: "기타" },
];

interface CertificationSectionProps {
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (values: string[]) => void;
}

function CertificationSection({
  selectedValues,
  onSelectionChange,
}: CertificationSectionProps) {
  const handleToggle = (id: string) => {
    if (selectedValues.includes(id)) {
      onSelectionChange(selectedValues.filter((value) => value !== id));
    } else {
      onSelectionChange([...selectedValues, id]);
    }
  };

  return (
    <div className="mx-auto flex w-[560px] flex-col gap-5">
      <h3 className="text-24-600 text-text-primary">
        보유 자격 / 어학을 선택해주세요!
      </h3>
      <div className="grid grid-cols-2 grid-rows-[55px_55px_55px] gap-3">
        {certificationOptions.map((option) => (
          <FilterButton
            key={option.id}
            variant="today"
            size="lg"
            onClick={() => handleToggle(option.id)}
            selected={selectedValues.includes(option.id)}
            className="h-full"
          >
            {option.label}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

export default CertificationSection;
