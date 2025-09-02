"use client";
import LoginSocial from "./LoginSocial";

interface LoginSocialListProps {
  onSocialLogin?: () => void;
}

export default function LoginSocialList({
  onSocialLogin,
}: LoginSocialListProps) {
  const socials = [
    {
      social: "카카오",
      imageSrc: "/join/kakao.svg",
      bgColor: "#FEE500",
      textColor: "rgba(0,0,0,0.85)",
    },
    {
      social: "네이버",
      imageSrc: "/join/naver.svg",
      bgColor: "#03C75A",
      textColor: "#FFFFFF",
    },
    {
      social: "Google",
      imageSrc: "/join/google.svg",
      bgColor: "#FFFFFF",
      borderColor: "#E0E5F0",
      textColor: "rgba(31,31,31,0.85)",
    },
  ];

  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      {socials.map(({ social, imageSrc, bgColor, borderColor, textColor }) => (
        <LoginSocial
          key={social}
          social={social}
          imageSrc={imageSrc}
          bgColor={bgColor}
          borderColor={borderColor}
          textColor={textColor}
          onClick={onSocialLogin}
        />
      ))}
    </div>
  );
}
