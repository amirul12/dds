import "./globals.css";

import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const fontSans = Hind_Siliguri({
  variable: "--font-sans",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fontSerif = Noto_Serif_Bengali({
  variable: "--font-serif",
  subsets: ["bengali", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ঢাকাস্থ দেবহাটা উপজেলা সমিতি",
  description: "ঢাকাস্থ দেবহাটা উপজেলা সমিতির অফিসিয়াল ওয়েবসাইট",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "ঢাকাস্থ দেবহাটা উপজেলা সমিতি",
    description: "ঢাকাস্থ দেবহাটা উপজেলা সমিতির অফিসিয়াল ওয়েবসাইট",
    images: ["/images/logo.png"],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
