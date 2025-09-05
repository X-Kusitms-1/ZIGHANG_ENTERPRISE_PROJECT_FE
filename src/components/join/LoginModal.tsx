import Image from "next/image";
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog";
import LoginTitle from "./LoginTitle";
import LoginSubTitle from "./LoginSubTitle";
import LoginSocialList from "./LoginSocialList";
import LoginFooter from "./LoginFooter";
interface LoginModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleSocialLogin?: () => void;
}

export default function LoginModal({
  open,
  onOpenChange,
  handleSocialLogin,
}: LoginModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex h-[536px] !w-[680px] !max-w-[680px] flex-col items-center gap-0 bg-white pt-[72px] pb-[52px]">
        <Image
          src="/join/header-logo.svg"
          alt="직행 로고"
          width={73.2}
          height={36}
          priority
          className="mb-11"
        />
        <DialogTitle>
          <LoginTitle />
        </DialogTitle>
        <LoginSubTitle />
        <LoginSocialList onSocialLogin={handleSocialLogin} />
        <LoginFooter />
      </DialogContent>
    </Dialog>
  );
}
