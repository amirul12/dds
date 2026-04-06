import { getSocialWorkGalleries } from "@/data/loaders";
import { Card } from "@/components/ui/card";
import { GalleryGrid } from "@/components/custom/gallery-grid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "সোশ্যাল কাজ ফটো গ্যালারি | দেবহাটা উপজেলা সমিতি, ঢাকা",
  description: "দেবহাটা উপজেলা সমিতি, ঢাকা-এর বিভিন্ন সামাজিক সেবামূলক কার্যক্রমের ছবি",
};

export default async function SocialWorkGalleryPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category;

  if (selectedCategory) {
    const galleriesResponse = await getSocialWorkGalleries(selectedCategory);
    const galleries = galleriesResponse?.data || [];
    return (
      <div className="container py-16">
        <div className="mb-12">
          <Link href="/social-work" className="text-primary hover:underline mb-4 inline-block">
            ← সোশ্যাল গ্যালারিতে ফিরে যান
          </Link>
          <h1 className="font-serif text-4xl font-bold text-primary mb-4">{selectedCategory}</h1>
          <div className="h-1.5 w-24 rounded-full bg-secondary" />
        </div>
        {galleries.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p className="text-xl text-muted-foreground">এই ক্যাটাগরিতে কোন ছবি পাওয়া যায়নি</p>
          </Card>
        ) : (
          <GalleryGrid items={galleries} />
        )}
      </div>
    );
  }

  const sections = [
    { id: "Help People", label: "মানুষের সেবা" },
    { id: "Medical Support", label: "চিকিৎসা সহায়তা" },
    { id: "Education Support", label: "শিক্ষা সহায়তা" },
    { id: "Disaster Relief", label: "দুর্যোগ ত্রাণ" },
  ];

  const gallerySections = await Promise.all(
    sections.map(async (section) => {
      const response = await getSocialWorkGalleries(section.id, 10);
      return {
        ...section,
        items: response?.data || [],
      };
    })
  );

  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">সোশ্যাল কাজ ফটো গ্যালারি</h1>
        <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          আমাদের সমিতির মাধ্যমে পরিচালিত বিভিন্ন সামাজিক ও মানবিক সেবামূলক কার্যক্রমের স্থিরচিত্র
        </p>
      </div>

      <div className="space-y-20">
        {gallerySections.map((section) => (
          section.items.length > 0 && (
            <div key={section.id}>
              <div className="flex items-center justify-between mb-8 border-b pb-4">
                <h2 className="font-serif text-2xl font-bold text-primary">
                  {section.label}
                </h2>
                <Link
                  href={`/social-work?category=${encodeURIComponent(section.id)}`}
                  className="group flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                >
                  আরও দেখুন
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <GalleryGrid items={section.items} />
            </div>
          )
        ))}
        
        {gallerySections.every(s => s.items.length === 0) && (
          <Card className="p-12 text-center border-dashed">
            <p className="text-xl text-muted-foreground">এখনও কোনো ছবি আপলোড করা হয়নি</p>
            <p className="text-sm text-muted-foreground mt-2">ব্যাকএন্ড থেকে সোশ্যাল কাজ গ্যালারিতে ছবি যোগ করুন</p>
          </Card>
        )}
      </div>
    </div>
  );
}
