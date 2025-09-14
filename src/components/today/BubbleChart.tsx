"use client";

import React, { useState, useEffect, useRef } from "react";

interface BubbleData {
  id: string;
  content: string;
  priority: number; // 1-6 (1이 가장 높은 우선순위)
}

function BubbleChart() {
  // 애니메이션 상태 관리
  const [visibleBubbles, setVisibleBubbles] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // 우선순위별 색상 배열 (총 6가지)
  const colors = [
    "#A74DDF", // 우선순위 1 - 보라색
    "#94A5F7", // 우선순위 2 - 연한 보라색
    "#89EAF2", // 우선순위 3 - 파란색
    "#A5EFB3", // 우선순위 4 - 초록색
    "#CDD1E0", // 우선순위 5 - 주황색
    "#CDD1E0", // 우선순위 6 - 빨간색
  ];

  // 우선순위에 따른 색상 할당 함수
  const getColorByPriority = (priority: number) => {
    return colors[(priority - 1) % colors.length];
  };

  // 버블 차트 데이터
  const data: BubbleData[] = [
    {
      id: "1",
      content: "운전면허 소지자",
      priority: 1, // 가장 높은 우선순위
    },
    {
      id: "2",
      content: "3년차",
      priority: 2,
    },
    {
      id: "3",
      content: "중소기업",
      priority: 3,
    },
    {
      id: "4",
      content: "언어 자격증",
      priority: 4,
    },
    {
      id: "5",
      content: "언어 자격증",
      priority: 5,
    },
    {
      id: "6",
      content: "언어 자격증",
      priority: 6,
    },
  ];

  const title = "이런 공고에서 많이 합격했어요.";
  const subtitle = "합격 공고의 공통점을 분석한 결과예요.";
  const conclusion =
    "우대사항의 '운전면허 소지자', 경력 '3년차' 공고에서의 합격률이 높은 걸로 보여요.";

  // 우선순위 순으로 정렬된 데이터
  const sortedData = [...data].sort((a, b) => a.priority - b.priority);

  // Intersection Observer로 차트가 보이는지 확인
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 트리거
    );

    const currentChartRef = chartRef.current;
    if (currentChartRef) {
      observer.observe(currentChartRef);
    }

    return () => {
      if (currentChartRef) {
        observer.unobserve(currentChartRef);
      }
    };
  }, []);

  // 애니메이션 효과 (차트가 보일 때만 시작)
  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      if (currentIndex < sortedData.length) {
        setVisibleBubbles(
          (prev) => new Set([...prev, sortedData[currentIndex].id])
        );
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 200); // 200ms 간격으로 애니메이션

    return () => clearInterval(timer);
  }, [currentIndex, sortedData, isInView]);

  // 우선순위에 따른 원 크기 계산 (1이 가장 큰 원)
  const getBubbleSize = (priority: number) => {
    const sizes = {
      1: 180, // 가장 큰 원
      2: 140,
      3: 110,
      4: 80,
      5: 60,
      6: 60, // 가장 작은 원
    };
    return sizes[priority as keyof typeof sizes] || 60;
  };

  // 우선순위에 따른 폰트 크기 계산
  const getFontSize = (priority: number) => {
    const sizes = {
      1: "text-18-600",
      2: "text-18-600",
      3: "text-18-500",
      4: "text-14-600",
      5: "text-12-500",
      6: "text-12-500",
    };
    return sizes[priority as keyof typeof sizes] || "text-12-400";
  };

  // 원들의 위치를 계산하는 함수 (겹치지 않도록 배치)
  const getBubblePosition = (index: number) => {
    const positions = [
      { x: 150, y: 100 },
      { x: 240, y: 250 },
      { x: 90, y: 250 },
      { x: 290, y: 120 },
      { x: 30, y: 160 },
      { x: 270, y: 40 },
    ];
    return positions[index] || { x: 100, y: 100 };
  };

  return (
    <div className="border-border-line flex flex-col border-t pt-9">
      <h3 className="text-24-600 text-text-secondary">{title}</h3>
      <p className="text-16-500 text-text-tertiary mt-2">{subtitle}</p>

      {/* 버블 차트 */}
      <div ref={chartRef} className="relative mx-auto mt-9 h-80 w-80">
        {data.map((item, index) => {
          const size = getBubbleSize(item.priority);
          const position = getBubblePosition(index);
          const fontSize = getFontSize(item.priority);
          const color = getColorByPriority(item.priority);
          const isVisible = visibleBubbles.has(item.id);

          return (
            <div
              key={item.id}
              className={`absolute flex items-center justify-center rounded-full transition-all duration-700 ease-out ${
                isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{
                left: position.x - size / 2,
                top: position.y - size / 2,
                width: size,
                height: size,
                backgroundColor: color,
                fontSize: size < 80 ? "10px" : size < 100 ? "12px" : "14px",
                fontWeight:
                  item.priority <= 2
                    ? "600"
                    : item.priority <= 3
                      ? "500"
                      : "400",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 6 - item.priority, // 우선순위가 높을수록 위에
              }}
            >
              <span
                className={`text-center leading-tight ${fontSize} px-2 text-white`}
              >
                {item.content}
              </span>
            </div>
          );
        })}
      </div>

      {/* 결론 박스 */}
      <div className="bg-bg-neutral mx-auto mt-8 max-w-md rounded-lg px-4 py-3">
        <p className="text-16-500 text-text-tertiary leading-relaxed">
          {conclusion}
        </p>
      </div>
    </div>
  );
}

export default BubbleChart;
