"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function CompanySidebar() {
  const [activeSection, setActiveSection] = useState("all-news");

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "all-news") {
      // 전체 소식 버튼을 누르면 페이지 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 다른 섹션은 해당 섹션으로 스크롤
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 전체 소식 섹션 (페이지 상단 근처)
      if (scrollY < 200) {
        setActiveSection("all-news");
      }
      // 유사 기업 섹션
      else {
        const similarSection = document.getElementById("similar-companies");
        if (similarSection) {
          const rect = similarSection.getBoundingClientRect();
          if (rect.top <= windowHeight / 2) {
            setActiveSection("similar-companies");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Button
        variant="inversed"
        size="lg"
        className={`w-full justify-start ${
          activeSection === "all-news" ? "bg-gray-100 text-gray-900" : ""
        }`}
        onClick={() => scrollToSection("all-news")}
      >
        전체 소식
      </Button>
      <Button
        variant="inversed"
        size="lg"
        className={`w-full justify-start space-x-2 ${
          activeSection === "similar-companies"
            ? "bg-gray-100 text-gray-900"
            : ""
        }`}
        onClick={() => scrollToSection("similar-companies")}
      >
        같은 직군 기업의 소식
      </Button>
    </>
  );
}
