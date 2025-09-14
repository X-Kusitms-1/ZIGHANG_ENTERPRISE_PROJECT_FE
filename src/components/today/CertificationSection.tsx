import React from "react";
import { FilterButton } from "../ui/FilterButton";

interface CertificationSectionProps {
  title: string;
  options: string[];
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: (values: string[]) => void;
}

function CertificationSection({
  title,
  options,
  selectedValues,
  onSelectionChange,
}: CertificationSectionProps) {
  const handleToggle = (option: string) => {
    if (selectedValues.includes(option)) {
      onSelectionChange(selectedValues.filter((value) => value !== option));
    } else {
      onSelectionChange([...selectedValues, option]);
    }
  };

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-5">
      <h3 className="text-24-600 text-text-primary">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <FilterButton
            key={index}
            variant="today"
            size="lg"
            onClick={() => handleToggle(option)}
            selected={selectedValues.includes(option)}
            className="h-[55px]"
          >
            {option}
          </FilterButton>
        ))}
      </div>
    </div>
  );
}

export default CertificationSection;
