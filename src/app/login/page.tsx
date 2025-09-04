import LoginFooter from "@/components/join/LoginFooter";
import LoginSocialList from "@/components/join/LoginSocialList";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <MobileHeader />
      <div className="px-5 tablet:px-8 pc:mx-auto pc:max-w-[1024px]">
        <div className="flex flex-col gap-3 mb-[16.4dvh]">
            <MobileLoginTitle />
            <MobileSubTitle />
        </div>
        <LoginSocialList w="w-full"/>
        <div className="mt-6"><LoginFooter/></div>
      </div>
    </div>
  );
}
