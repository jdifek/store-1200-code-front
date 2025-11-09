import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MiniChat from "@/components/MiniChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "SkladTech — інтернет-магазин техніки та електроніки",
  description:
    "SkladTech — надійний інтернет-магазин техніки, електроніки та аксесуарів. Швидка доставка, гарантія якості та вигідні ціни.",
  keywords: [
    "інтернет-магазин техніки",
    "електроніка",
    "SkladTech",
    "купити ноутбук",
    "смартфон",
    "побутова техніка",
  ],
  authors: [{ name: "SkladTech" }],
  openGraph: {
    title: "SkladTech — інтернет-магазин техніки та електроніки",
    description:
      "Купуйте надійну техніку з гарантією та швидкою доставкою по всій Україні.",
    url: "https://skladtech.com",
    siteName: "SkladTech",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <Header />

        {children}
        <MiniChat />
     <Footer />

      </body>
    </html>
  );
}
