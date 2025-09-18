// components/ConditionalLayout.tsx
"use client"; // 클라이언트 컴포넌트로 설정
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  // 특정 경로에서 Header와 Footer를 제외할 경로 배열
  const excludePaths = ["/login", "/onBoarding", "/onBoarding/success"];

  useEffect(() => {
    setShowHeaderFooter(!excludePaths.includes(pathname));
  }, [pathname]);

  return (
    <>
      {showHeaderFooter ? (
        <>
          <Header />
          <main className="tablet:px-6 flex flex-col items-center justify-center px-4 pt-16">
            {children}
          </main>
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
