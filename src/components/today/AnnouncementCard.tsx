import React from "react";
import Image from "next/image";
import { RotateCwIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";

interface AnnouncementCardProps {
  id: string;
  companyName: string;
  companyThumbnailUrl: string;
  description: string;
  companyTypeLabel: string[];
  onSelect: () => void;
  selected: boolean;
}

function AnnouncementCard({
  companyName,
  companyThumbnailUrl,
  description,
  companyTypeLabel,
  onSelect,
  selected,
}: AnnouncementCardProps) {
  return (
    <div className="h-[270px] w-[220px] flex-shrink-0 rounded-[12px] bg-white p-4">
      <Image
        src={companyThumbnailUrl}
        alt={companyName}
        width={28}
        height={28}
        className="h-[28px] w-[28px] rounded-[4.5px]"
      />
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-16-600 text-text-primary"> {companyName}</p>
        <p className="text-12-500 text-text-tertiary">{description}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {companyTypeLabel.map((label) => (
          <Chip key={label} variant="today">
            {label}
          </Chip>
        ))}
      </div>
      <div className="mt-12 flex items-center justify-center gap-2">
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
