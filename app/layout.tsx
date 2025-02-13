import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepseek每日推送",
  description: "自动化生成Deepseek新闻，尽最大可能解放人力",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
