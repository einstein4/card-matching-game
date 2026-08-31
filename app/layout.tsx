import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "체세포분열 카드 매칭",
  description: "체세포분열 5단계를 빠르게 구분하는 반응속도 카드 매칭 게임",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
