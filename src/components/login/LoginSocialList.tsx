"use client";
import LoginSocial from "./LoginSocial";

function handleKakaoLogin() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/kakao`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
  window.location.href = kakaoUrl;
}
interface LoginSocialListProps {
  w?: string;
}

export const socialConfig = {
  kakao: {
    name: "카카오",
    imageSrc: "/join/kakao.svg",
    bgColor: "bg-[#FEE500]",
    textColor: "text-[rgba(0,0,0,0.85)]",
    borderColor: "",
    onClick: handleKakaoLogin,
  },
  naver: {
    name: "네이버",
    imageSrc: "/join/naver.svg",
    bgColor: "bg-[#03C75A]",
    textColor: "text-white",
    borderColor: "",
    onClick: () => {
      // 네이버 로그인 로직 (예시)
      alert("네이버 로그인은 아직 구현되지 않았습니다.");
    },
  },
  google: {
    name: "Google",
    imageSrc: "/join/google.svg",
    bgColor: "bg-white",
    textColor: "text-[rgba(31,31,31,0.85)]",
    borderColor: "border border-[#E0E5F0]",
    onClick: () => {
      // 구글 로그인 로직 (예시)
      alert("구글 로그인은 아직 구현되지 않았습니다.");
    },
  },
};

export default function LoginSocialList(props: LoginSocialListProps) {
  const { w = "w-full" } = props;
  const socials = Object.keys(socialConfig) as Array<keyof typeof socialConfig>;

  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      {socials.map((type) => (
        <LoginSocial
          key={type}
          type={type}
          onClick={socialConfig[type].onClick}
          w={w}
        />
      ))}
    </div>
  );
}
