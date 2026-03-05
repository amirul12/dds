import { getGalleries } from "@/data/loaders";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryGrid } from "@/components/custom/gallery-grid";

export const metadata = {
  title: "ফটো গ্যালারি | ঢাকাস্থ দেবহাটা উপজেলা সমিতি",
  description: "ঢাকাস্থ দেবহাটা উপজেলা সমিতির বিভিন্ন কার্যক্রম ও মিলনমেলার ছবি",
};

export default async function GalleryPage() {
  const galleriesResponse = await getGalleries();
  const galleries = galleriesResponse?.data || [];

  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">ফটো গ্যালারি</h1>
        <div className="mx-auto h-1.5 w-24 rounded-full bg-secondary" />
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          আমাদের সমিতির বিভিন্ন অনুষ্ঠান, মিলনমেলা এবং সামাজিক কার্যক্রমের স্মৃতিময় মুহূর্তগুলো
        </p>
      </div>

      {galleries.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <p className="text-xl text-muted-foreground">কোন ছবি পাওয়া যায়নি</p>
        </Card>
      ) : (
        <GalleryGrid items={galleries} />
      )}
    </div>
  );
}
