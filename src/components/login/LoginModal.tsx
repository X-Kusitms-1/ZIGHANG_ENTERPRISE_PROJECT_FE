import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MobileSubTitle from "../mobileLogin/MobileSubTitle";
import MobileLoginTitle from "../mobileLogin/MobileLoginTitle";
import LoginSocialList from "./LoginSocialList";
import LoginFooter from "./LoginFooter";

interface LoginModalProps {
  children: React.ReactNode;
}

export default function LoginModal({ children }: LoginModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[536px] !w-[680px] !max-w-[680px] flex-col items-center gap-0 bg-white pt-[72px] pb-[52px]">
        <Image
          src="/header-logo.svg"
          alt="직행 로고"
          width={73.2}
          height={36}
          priority
          className="mb-11"
        />
        <DialogTitle>
          <MobileLoginTitle
            text="내 직군의 채용 공고를 매일 받아 보세요!"
            className="text-28-600 mb-3 leading-9"
          />
        </DialogTitle>
        <MobileSubTitle
          text="당일 올라온 채용 공고 10개를 매일 아침 이메일로 보내드려요!"
          className="text-16-500 mb-11 leading-6"
        />
        <LoginSocialList w="w-100" />
        <LoginFooter />
      </DialogContent>
    </Dialog>
  );
}
