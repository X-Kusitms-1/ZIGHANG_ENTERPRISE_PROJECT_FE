import { useState } from "react";

export const useToggle = (initial = false) => {
  const [isToggle, setIsToggle] = useState(initial);
  const onOpenToggle = () => setIsToggle(true);
  const onCloseToggle = () => setIsToggle(false);
  const onToggle = () => setIsToggle((prev) => !prev);

  return {
    isToggle,
    onOpenToggle,
    onCloseToggle,
    onToggle,
    setIsToggle,
  };
};
