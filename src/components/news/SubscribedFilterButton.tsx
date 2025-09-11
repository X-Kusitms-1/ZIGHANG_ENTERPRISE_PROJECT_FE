"use client";

import React, { useCallback } from "react";
import { FilterButton } from "@/components/ui/FilterButton";
import { useNewsFilterContext } from "@/context/NewsFilterContext";

interface SubscribedFilterButtonProps {
  className?: string;
  onClick?: () => void;
}

function SubscribedFilterButton({
  className,
  onClick,
}: SubscribedFilterButtonProps) {
  const { showSubscribedOnly, toggleSubscribedOnly } = useNewsFilterContext();

  const handleClick = useCallback(() => {
    toggleSubscribedOnly();
    onClick?.();
  }, [toggleSubscribedOnly, onClick]);

  return (
    <FilterButton
      className={className}
      size="sm"
      selected={showSubscribedOnly}
      onClick={handleClick}
    >
      소식 받고 있는 기업
    </FilterButton>
  );
}

export default SubscribedFilterButton;
