import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "PS1",
  description: "PS1 Site",
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
