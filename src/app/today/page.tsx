import ApplyCountInput from "@/components/today/ApplyCountInput";
import ApplyList from "@/components/today/ApplyList";
import MainSqureGroup from "@/components/today/MainSqureGroup";
import SideGroup from "@/components/today/SideComponent";
import { TodaysGoalStatus } from "@/components/today/TodaysGoalStatus";

export default function TodaysApply() {
  return (
    <div className="bg-bg-neutral tablet:px-6 flex min-h-screen w-screen justify-center gap-3 px-4 pt-12">
      <div className="flex flex-col gap-11">
        <div className="flex gap-3">
          <ApplyCountInput />
          <div className="flex w-[402px] flex-col gap-3">
            <TodaysGoalStatus />
            <MainSqureGroup />
          </div>
        </div>
        <div className="mr-[10px]">
          <ApplyList />
        </div>
      </div>
      <SideGroup />
    </div>
  );
}
