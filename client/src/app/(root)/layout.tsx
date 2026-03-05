
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { getGlobalPageData, getUrgentNotices } from "@/data/loaders";
import { NoticeTicker } from "@/components/custom/NoticeTicker";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGlobalPageData();
  const urgentNotices = await getUrgentNotices();

  const topNav = data?.data?.topNav || {};
  const footer = data?.data?.footer || {};

  // Flatten notices for ticker
  const tickerNotices = urgentNotices.data.map((n: any) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <NoticeTicker notices={tickerNotices} />
      <Header data={topNav} />
      <main className="flex-1">
        {children}
      </main>
      <Footer data={footer} />
    </div>
  );
}
