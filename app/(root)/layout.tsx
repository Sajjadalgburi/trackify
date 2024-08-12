import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";
import SessionWrappper from "@/components/SessionWrappper";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: "/icon.ico",
  title: "Trackify.me - Job application tracker",
  description:
    "Trackify.me is a job search tracker that helps you stay on top of your job search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrappper>
      <html lang="en">
        <body className={bricolage.className}>{children}</body>
      </html>
    </SessionWrappper>
  );
}
