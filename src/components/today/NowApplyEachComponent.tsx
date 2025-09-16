import { Checkbox } from "@/components/ui/checkbox";
import { ApiApplyItem } from "@/api/today/getTodayApplyList";

interface NowApplyEachComponentProps {
  item: ApiApplyItem;
  onApplicationStatusChange: (
    _recruitmentId: number,
    _isApplied: boolean
  ) => void;
}

export default function NowApplyEachComponent({
  item,
  onApplicationStatusChange,
}: NowApplyEachComponentProps) {
  return (
    <div className={"flex items-center justify-between px-5 py-2"}>
      <div className="flex items-center gap-2">
        <div className="flex w-[41px] items-center justify-center px-2.5">
          <span className="text-12-500 text-text-secondary text-center leading-4">
            {item.number}
          </span>
        </div>
        <div className="flex w-[180px] items-center pl-2.5">
          <span className="text-12-500 text-text-secondary w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {item.companyName}
          </span>
        </div>
        <div className="flex w-[180px] items-center pl-2.5">
          <span className="text-12-500 text-text-secondary w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {Array.isArray(item.depthTwo)
              ? item.depthTwo.join(", ")
              : item.depthTwo}
          </span>
        </div>
        <div className="flex w-[180px] items-center pl-2.5">
          <span className="text-12-500 text-text-secondary w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {item.workSummary}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-20 items-center justify-center">
          <button
            className="text-12-500 text-text-tertiary bg-bg-neutral h-8 w-[66px] cursor-pointer rounded-[4px] px-3 py-2"
            onClick={() => {
              if (item.recruitmentOriginUrl) {
                window.open(item.recruitmentOriginUrl, "_blank");
              } else {
                console.log("지원 URL이 없습니다:", item);
              }
            }}
          >
            지원하기
          </button>
        </div>
        <div className="flex h-8 w-20 items-center justify-center">
          <Checkbox
            checked={item.isApplied}
            onCheckedChange={() =>
              onApplicationStatusChange(item.recruitmentId, item.isApplied)
            }
            bgColor="default"
          />
        </div>
      </div>
    </div>
  );
}
