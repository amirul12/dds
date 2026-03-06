
import { draftMode } from "next/headers";
import { getAllPagesSlugs, getPageBySlug } from "@/data/loaders";
import { BlockRenderer } from "@/components/block-renderer";

export async function generateStaticParams() {
  try {
    const pages = await getAllPagesSlugs();
    if (!pages?.data) return [];
    return pages.data.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error fetching page slugs for build:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PageBySlugRoute({ params }: PageProps) {
  const resolveParams = await params;
  const slug = await resolveParams?.slug;

  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? "draft" : "published";
  
  const data = await getPageBySlug(slug, status);
  const blocks = data?.data[0]?.blocks;
  if (!blocks) return null;
  return <div>{blocks ? <BlockRenderer blocks={blocks} /> : null}</div>;
}
