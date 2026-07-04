import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Kuan",
  description:
    "Biomedical Engineering & Applied Math student at Stony Brook University — research, software, and everything in between.",
  openGraph: {
    title: "Matthew Kuan",
    description: "Biomedical Engineering & Applied Math · Stony Brook University",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
