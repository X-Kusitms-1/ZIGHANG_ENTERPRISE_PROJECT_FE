// app/layout.tsx
import localFont from "next/font/local";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout"; // 새 컴포넌트
import type { Metadata } from "next";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "직행",
  description: "직행",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <ReactQueryProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
