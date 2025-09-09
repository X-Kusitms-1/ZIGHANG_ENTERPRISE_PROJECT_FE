import Image from "next/image";

export default function MainSqureGroup() {
  function MainSqureComponent({ number }: { number: number }) {
    return (
      <div className="bg-bg-base flex h-[126px] w-[126px] flex-col gap-2 p-4 rounded-[12px]">
        <div className="h-6 w-6 rounded-full bg-[#F9F2FD] flex justify-center items-center">
          <Image
            src="/today/page.svg"
            alt="페이지 아이콘"
            width={10}
            height={22}
            style={{ display: "block" }}
          />
        </div>
        <p className="text-14-600 text-text-tertiary leading-5">
          오늘 지원한 곳
        </p>
        <p className="text-18-600 text-text-primary leadin-7">{number}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <MainSqureComponent number={1} />
      <MainSqureComponent number={2} />
      <MainSqureComponent number={3} />
    </div>
  );
}
