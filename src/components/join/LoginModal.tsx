import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginTitle from "./LoginTitle";
import LoginSubTitle from "./LoginSubTitle";
import LoginSocialList from "./LoginSocialList";
import LoginFooter from "./LoginFooter";
export default function LoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex h-[536px] !w-[680px] !max-w-[680px] flex-col items-center gap-0 bg-white pt-[72px] pb-[52px]">
        <Image
          src="/join/header-logo.svg"
          alt="직행 로고"
          width={73.2} // 원하는 너비(px)
          height={36} // 원하는 높이(px)
          priority
          className="mb-11"
        />
        <LoginTitle />
        <LoginSubTitle />
        <LoginSocialList />
        <LoginFooter />
      </DialogContent>
    </Dialog>
  );
}
