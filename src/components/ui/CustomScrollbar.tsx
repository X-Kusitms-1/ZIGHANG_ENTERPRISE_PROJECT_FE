"use client";
import { Scrollbar } from "react-scrollbars-custom";

interface CustomScrollbarProps {
  children: React.ReactNode;
  height?: string;
  variant?: "job" | "location";
  className?: string;
}

export default function CustomScrollbar({
  children,
  height,
  variant = "location",
  className = "",
}: CustomScrollbarProps) {
  // 스크롤바 trackY 높이 계산 (variant에 따라 다른 높이)
  const getTrackYHeight = () => {
    if (height) return height;

    if (typeof window !== "undefined") {
      if (variant === "job") {
        // JobCategoryGrid 높이 (원래와 동일)
        if (window.innerWidth >= 1024)
          return "324px"; // 340px - 16px (padding)
        else if (window.innerWidth >= 768) return "60.53dvh"; // 원래 JobCategoryGrid와 동일
        return "53.78dvh"; // 원래 JobCategoryGrid와 동일
      } else {
        // LocationGrid 높이
        if (window.innerWidth >= 1024)
          return "364px"; // 380px - 16px (padding)
        else if (window.innerWidth >= 768) return "65.78dvh"; // 56.78dvh + 3dvh (모바일보다 3dvh 크게)
        return "57.78dvh"; // 60.78dvh - 4dvh (padding)
      }
    }
    return variant === "job" ? "324px" : "364px";
  };

  const trackYHeight = getTrackYHeight();

  return (
    <div className={`h-full w-full ${className}`}>
      <Scrollbar
        style={{ width: "100%", height: "100%" }}
        thumbXProps={{
          style: {
            display: "none",
          },
        }}
        thumbYProps={{
          style: {
            height: "76px",
            background: "#E0E5F0",
            width: "4px",
            borderRadius: "9999px",
            margin: "0 auto",
            minHeight: "76px",
            top: "0",
          },
        }}
        trackYProps={{
          style: {
            background: "transparent",
            width: "20px",
            right:
              typeof window !== "undefined" && window.innerWidth >= 1024
                ? "-20px"
                : "-10px",
            top: "0",
            height: trackYHeight,
            paddingTop: "0",
          },
        }}
        trackXProps={{
          style: {
            display: "none",
          },
        }}
      >
        {children}
      </Scrollbar>
    </div>
  );
}
