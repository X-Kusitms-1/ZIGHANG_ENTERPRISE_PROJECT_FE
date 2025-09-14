import React from "react";
import Image from "next/image";
import { RotateCwIcon } from "lucide-react";
import { UserTodayApply } from "@/api/type/today";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";

interface AnnouncementCardProps {
  userTodayApply: UserTodayApply;
  onSelect: () => void;
  selected: boolean;
}

function AnnouncementCard({
  userTodayApply,
  onSelect,
  selected,
}: AnnouncementCardProps) {
  const companyName = userTodayApply.companyName || "회사명 없음";
  const workSummary = userTodayApply.workSummary || "업무 내용 없음";
  const depthTwo = userTodayApply.depthTwo || [];

  return (
    <div className="flex min-h-[270px] w-[220px] flex-shrink-0 flex-col rounded-[12px] bg-white p-4">
      {userTodayApply.companyLogoUrl ? (
        <Image
          src={userTodayApply.companyLogoUrl}
          alt={companyName}
          width={28}
          height={28}
          className="h-[28px] w-[28px] flex-shrink-0 rounded-[4.5px]"
        />
      ) : (
        <div className="border-border-tertiary text-14-500 text-bold h-[28px] w-[28px] flex-shrink-0 rounded-[4.5px] border bg-[#BA74E6] py-[2px] text-center text-white">
          {companyName.charAt(0)}
        </div>
      )}
      <div className="mt-3 flex flex-shrink-0 flex-col gap-1">
        <p className="text-16-600 text-text-primary min-h-[20px]">
          {companyName}
        </p>
        <p className="text-12-500 text-text-tertiary line-clamp-2 min-h-[16px]">
          {workSummary}
        </p>
      </div>
      <div className="mt-6 flex min-h-[24px] flex-shrink-0 flex-wrap gap-2.5">
        {depthTwo.length > 0 ? (
          depthTwo.map((label) => (
            <Chip key={label} variant="today">
              {label}
            </Chip>
          ))
        ) : (
          <div className="text-12-500 text-text-tertiary">태그 없음</div>
        )}
      </div>
      <div className="mt-auto flex flex-shrink-0 items-center justify-center gap-2">
        {selected ? (
          <Button
            variant="neutral"
            size="sm"
            className="h-8 w-full text-[12px]"
            onClick={onSelect}
          >
            리스트에서 빼기
          </Button>
        ) : (
          <>
            <Button variant="neutral" size="sm" className="h-8 w-8 p-2">
              <RotateCwIcon className="size-4" />
            </Button>
            <Button
              variant="subtle"
              size="sm"
              className="h-8 w-full text-[12px]"
              onClick={onSelect}
            >
              리스트에 담기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default AnnouncementCard;
