import ApplyCountInput from "@/components/today/ApplyCountInput";
import { TodaysGoalStatus } from "@/components/today/TodaysGoalStatus";

export default function TodaysApply(){
    return(
        <div className="bg-bg-neutral h-100dvh w-full pt-12 px-30 mx-auto">
            <div className="flex gap-3">
                <ApplyCountInput/>
                <div className="w-[402px]">
                    <TodaysGoalStatus />
                </div>
            </div>
        </div>
    );
}
