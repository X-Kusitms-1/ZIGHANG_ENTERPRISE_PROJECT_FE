"use client";

interface LoginSocialProps {
  social: string;
  imageSrc: string;
}

export default function LoginSocial({ social, imageSrc }: LoginSocialProps) {
  return (
    <div className="flex h-14 w-full cursor-pointer flex-row items-center justify-center rounded-lg border border-[#D5D7DA] bg-white hover:bg-zinc-100/60 active:bg-zinc-100">
      <div className="mr-4 h-7 w-7">
        <img
          src={imageSrc}
          alt={`${social} logo`}
          loading="lazy"
          width={28}
          height={28}
          decoding="async"
          className="rounded-[4px]"
        />
      </div>
      <div className="text-[16px] font-medium text-[#414651]">
        {social} 계정으로 계속하기
      </div>
    </div>
  );
}
