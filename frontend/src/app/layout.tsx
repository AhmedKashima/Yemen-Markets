import type { Metadata } from "next";
import { Cairo } from "next/font/google"; // Best font for modern Arabic UI
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "سوق اليمن | Yemen Market",
  description: "أكبر سوق إلكتروني في اليمن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
