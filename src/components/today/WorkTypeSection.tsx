import React from "react";
import { FilterButton } from "../ui/FilterButton";

const workTypeOptions = [
  { id: "any", label: "무관" },
  { id: "office", label: "상주 근무" },
  { id: "hybrid", label: "하이브리드" },
  { id: "remote", label: "재택" },
];

interface WorkTypeSectionProps {
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (values: string[]) => void;
}

function WorkTypeSection({
  selectedValues,
  onSelectionChange,
}: WorkTypeSectionProps) {
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
        어떤 근무 형태를 선호하시나요?
      </h3>
      <div className="grid grid-cols-2 grid-rows-[100px_100px] gap-3">
        {workTypeOptions.map((option) => (
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

export default WorkTypeSection;
