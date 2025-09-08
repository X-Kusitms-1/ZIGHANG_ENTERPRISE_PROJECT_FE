import * as React from "react";

const TooltipArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={7}
    viewBox="0 0 8 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0H8L4 7L0 0Z" fill="currentColor" fillOpacity={0.75} />
  </svg>
);

export default TooltipArrow;
