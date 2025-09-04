"use client";
import { useRouter } from "next/navigation";
import LoginSocial from "./LoginSocial";

interface LoginSocialListProps {
  onSocialLogin?: () => void;
  w?: string;
}

export const socialConfig = {
  kakao: {
    name: "카카오",
    imageSrc: "/join/kakao.svg",
    bgColor: "bg-[#FEE500]",
    textColor: "text-[rgba(0,0,0,0.85)]",
    borderColor: "",
  },
  naver: {
    name: "네이버",
    imageSrc: "/join/naver.svg",
    bgColor: "bg-[#03C75A]",
    textColor: "text-white",
    borderColor: "",
  },
  google: {
    name: "Google",
    imageSrc: "/join/google.svg",
    bgColor: "bg-white",
    textColor: "text-[rgba(31,31,31,0.85)]",
    borderColor: "border border-[#E0E5F0]",
  },
};

export default function LoginSocialList(props: LoginSocialListProps) {
  const { onSocialLogin, w = "w-full" } = props;
  const router = useRouter();
  const handleSocialLogin = onSocialLogin ?? (() => router.push("/onBoarding"));
  const socials = Object.keys(socialConfig) as Array<keyof typeof socialConfig>;

  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      {socials.map((type) => (
        <LoginSocial key={type} type={type} onClick={handleSocialLogin} w={w} />
      ))}
    </div>
  );
}
