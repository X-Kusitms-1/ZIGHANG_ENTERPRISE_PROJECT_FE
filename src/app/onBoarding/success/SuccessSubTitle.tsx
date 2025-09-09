"use client";
import { useEffect, useState } from "react";

export default function SuccessSubTitle() {
  const [displayName, setDisplayName] = useState("사용자");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setDisplayName(userName ?? "사용자");
  }, []);

  return (
    <>
      {displayName}님에게 맞는 맞춤형 공고들을 앞으로
      <br className="mobile:block tablet:hidden" />
      추천해드릴게요!
    </>
  );
}
