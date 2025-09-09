import LoginFooter from "@/components/login/LoginFooter";
import LoginSocialList from "@/components/login/LoginSocialList";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <MobileHeader />
      <div className="tablet:px-8 pc:mx-auto pc:max-w-[1024px] px-5">
        <div className="mt-[71px] mb-[140px] flex flex-col gap-3">
          <MobileLoginTitle />
          <MobileSubTitle />
        </div>
        <LoginSocialList w="w-full" />
        <div className="mt-6">
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
