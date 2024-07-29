import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Created by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
