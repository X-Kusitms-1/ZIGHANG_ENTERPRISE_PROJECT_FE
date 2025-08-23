import Link from "next/link";
import Header from "@/components/widgets/Header";
import SearchInput from "@/components/widgets/SearchInput";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <div className="my-10 flex w-full flex-col items-center">
        <h1 className="text-[22px] font-bold">
          대기업 및 유니콘 채용 공고를
          <span className="text-[#6F00B6]"> 빠짐없이 모두</span>
          모았어요
        </h1>
        <SearchInput />
        <div className="flex items-center gap-4">
          <Link href="/" className="text-primary">
            <span className="text-[#6F00B6]">33,764개 기업</span> 전체 보기 &gt;
          </Link>
          <Link href="/" className="text-primary">
            <span className="text-[#6F00B6]">999,973개 공고</span> 전체보기 &gt;
          </Link>
        </div>
      </div>
    </main>
  );
}
