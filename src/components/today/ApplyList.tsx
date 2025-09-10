"use client";
import { useState } from "react";
import ApplyListMenu from "./ApplyListMenu";

export default function ApplyList() {
  const [activeTab, setActiveTab] = useState<"today" | "past">("today");
  return (
    <div className="flex flex-col gap-5">
      <ApplyListMenu activeTab={activeTab} onTabChange={setActiveTab} />
      {/* 여기서 activeTab에 따라 리스트를 보여주면 됩니다 */}
      {/* {activeTab === "today" ? <TodayList /> : <PastList />} */}
    </div>
  );
}
