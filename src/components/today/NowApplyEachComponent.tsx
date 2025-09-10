import { Checkbox } from "@/components/ui/checkbox";
import { ApplyListItem } from "./NowApplyList";

interface NowApplyEachComponentProps {
  item: ApplyListItem;
  onApplyClick: (_item: ApplyListItem) => void;
  onApplicationStatusChange: (_id: string, _checked: boolean) => void;
}

export default function NowApplyEachComponent({
  item,
  onApplyClick,
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
        <div className="flex w-[120px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {item.companyName}
          </span>
        </div>
        <div className="flex w-[120px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary block">
            {item.companyType}
          </span>
        </div>
        <div className="flex w-[120px] items-center px-2.5">
          <span className="text-12-500 text-text-secondary">
            {item.jobTitle}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-20 items-center justify-center">
          <button
            className="text-12-500 text-text-tertiary bg-bg-neutral h-8 w-[66px] cursor-pointer rounded-[4px] px-3 py-2"
            onClick={() => onApplyClick(item)}
          >
            지원하기
          </button>
        </div>
        <div className="flex h-8 w-20 items-center justify-center">
          <Checkbox
            checked={item.isApplied}
            onCheckedChange={(checked) =>
              onApplicationStatusChange(item.id, checked === true)
            }
            bgColor="default"
          />
        </div>
      </div>
    </div>
  );
}
