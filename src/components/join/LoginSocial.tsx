import Image from "next/image";

interface LoginSocialProps {
  social: string;
  imageSrc: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function LoginSocial(props: LoginSocialProps) {
  const { social, imageSrc, bgColor, borderColor, textColor, onClick } = props;
  return (
    <div
      className={
        "flex h-12 w-100 cursor-pointer flex-row items-center justify-center rounded-lg hover:bg-zinc-100/60 active:bg-zinc-100"
      }
      style={{
        backgroundColor: bgColor || undefined,
        border: borderColor ? `1px solid ${borderColor}` : "",
      }}
      onClick={onClick}
    >
      <div className="mr-4 h-4 w-4">
        <Image
          src={imageSrc}
          alt={`${social} logo`}
          loading="lazy"
          width={28}
          height={28}
          decoding="async"
          className="rounded-[4px]"
        />
      </div>
      <div
        className="text-[16px] font-medium"
        style={textColor ? { color: textColor } : { color: "#414651" }}
      >
        {social}로 계속하기
      </div>
    </div>
  );
}
