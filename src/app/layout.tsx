import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Online Amatör Telsizcilik Sınavı',
  description: 'Amatör telsizcilik sınavına hazırlananlar için ücretsiz online test platformu. A-B sınıfı teknik, işletme ve düzenlemeler konularında kendinizi test edin. Gerçek sınav formatında sorularla pratik yapın.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
