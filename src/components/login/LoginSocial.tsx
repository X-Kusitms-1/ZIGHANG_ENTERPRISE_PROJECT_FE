import Image from "next/image";
import { socialConfig } from "./LoginSocialList";

type SocialType = "kakao" | "naver" | "google";

interface LoginSocialProps {
  type: SocialType;
  onClick?: () => void;
  w?: string;
}

export default function LoginSocial({
  type,
  onClick,
  w = "w-full",
}: LoginSocialProps) {
  const config = socialConfig[type];

  return (
    <div
      className={`flex h-12 ${w} cursor-pointer flex-row items-center justify-center rounded-lg ${config.bgColor} ${config.borderColor}`}
      onClick={onClick}
    >
      <div className="mr-4 h-4 w-4">
        <Image
          src={config.imageSrc}
          alt={`${config.name} logo`}
          loading="lazy"
          width={28}
          height={28}
          decoding="async"
          className="rounded-[4px]"
        />
      </div>
      <div className={`text-16-600 ${config.textColor}`}>
        {config.name}로 계속하기
      </div>
    </div>
  );
}
