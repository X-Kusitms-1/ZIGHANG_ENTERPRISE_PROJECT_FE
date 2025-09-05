import Image from "next/image";
import { socialConfig } from "./LoginSocialList";

type SocialType = "kakao" | "naver" | "google";

interface LoginSocialProps {
  type: SocialType;
  onClick?: () => void;
}

export default function LoginSocial({ type, onClick }: LoginSocialProps) {
  const config = socialConfig[type];

  return (
    <div
      className={`flex h-12 w-100 cursor-pointer flex-row items-center justify-center rounded-lg hover:bg-zinc-100/60 active:bg-zinc-100 ${config.bgColor} ${config.borderColor}`}
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
