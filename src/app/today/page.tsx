import ApplyCountInput from "@/components/today/ApplyCountInput";
import ApplyList from "@/components/today/ApplyList";
import MainSqureGroup from "@/components/today/MainSqureGroup";
import SideGroup from "@/components/today/SideComponent";
import { TodaysGoalStatus } from "@/components/today/TodaysGoalStatus";

export default function TodaysApply(){
    return(
        <div className="bg-bg-neutral h-100dvh w-full pt-12 px-30 mx-auto flex gap-3 justify-center">
            <div className="flex flex-col gap-11">
                <div className="flex gap-3">
                    <ApplyCountInput/>
                    <div className="w-[402px] flex flex-col gap-3">
                        <TodaysGoalStatus />
                        <MainSqureGroup/>
                    </div>
                </div>
                <ApplyList/>
            </div>
            <SideGroup/>
        </div>
    );
}
