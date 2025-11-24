import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from './components/MainLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Builder & Service",
  description: "Jasa Rakit dan Servis PC Terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}