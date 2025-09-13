import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";
import SuccessSubTitle from "./SuccessSubTitle";
import SuccessButton from "./SuccessButton";

export default function OnBoardingSuccessPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white px-5 pb-5">
      <MobileHeader showCloseButton={false} />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="mobile:my-15 flex w-full flex-col gap-2 text-left">
            <MobileLoginTitle text="회원가입을 축하해요!" />
            <MobileSubTitle text={<SuccessSubTitle />} />
          </div>
          <div className="h-40 w-50 bg-[#D9D9D9]" />
        </div>
        <SuccessButton />
      </div>
    </div>
  );
}
