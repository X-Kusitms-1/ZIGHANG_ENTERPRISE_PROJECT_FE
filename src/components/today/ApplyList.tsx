"use client";
import { useState } from "react";
import ApplyListMenu from "./ApplyListMenu";
import NowApplyList from "./NowApplyList";
import PastApplyList from "./PastApplyList";

export default function ApplyList() {
  const [activeTab, setActiveTab] = useState<"today" | "past">("today");

  return (
    <div className="flex flex-col gap-5">
      <ApplyListMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "today" && <NowApplyList />}
      {activeTab === "past" && <PastApplyList />}
    </div>
  );
}
