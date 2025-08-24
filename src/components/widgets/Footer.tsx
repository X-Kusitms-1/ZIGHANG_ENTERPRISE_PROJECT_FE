import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-1 flex-col justify-end">
      <div className="h-[400px] w-full bg-[#F6F6FA] md:h-[300px]">
        <div className="relative w-full overflow-visible md:mx-auto md:max-w-screen-xl md:px-10">
          <div className="flex w-full flex-col gap-5 px-5 py-6 md:gap-5 md:px-[60px] md:py-12">
            <div className="relative h-[24px] w-[65px] md:h-[24px] md:w-[65px]">
              <Image
                alt="직행 로고"
                fill
                className="object-cover"
                src="https://zighang.com/header_logo_new.svg"
              />
            </div>
            <address className="text-xs text-[#71717A] not-italic">
              <div className="flex flex-wrap items-center gap-2 font-medium">
                <span>주식회사 직행</span>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <span>서울특별시 성동구 왕십리로 222</span>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <span>대표 : 이재헌</span>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <a href="mailto:paca@zighang.com">이메일 : paca@zighang.com</a>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <a href="tel:010-9862-5855">연락처 : 010-9862-5855</a>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <span>사업자등록 : 684-81-03629</span>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <span>직업정보제공사업 신고번호: J1202020240011</span>
                <div
                  className="h-3 w-[1px] bg-[#B3B3BA]"
                  role="separator"
                  aria-hidden="true"
                />
                <span>
                  <Link
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://quasar-guava-e9f.notion.site/1f5144e6653280fe9217f4a46a343de0"
                  >
                    이용약관
                  </Link>
                </span>
              </div>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
