"use client";
import LoginSocial from "./LoginSocial";

export default function LoginSocialList() {
  const socials = [
      { social: "카카오", imageSrc: "https://zighang.com/mail/kakao.png" },
      { social: "네이버", imageSrc: "https://zighang.com/naver.png" },
    { social: "구글", imageSrc: "https://zighang.com/google.png" },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-2 px-7 tablet:gap-3 table:px-24">
      {socials.map(({ social, imageSrc }) => (
        <LoginSocial key={social} social={social} imageSrc={imageSrc} />
      ))}
    </div>
  );
}
