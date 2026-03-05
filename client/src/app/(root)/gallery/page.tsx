import { getGalleries } from "@/data/loaders";
import { StrapiImage } from "@/components/custom/strapi-image";
import { Card, CardContent } from "@/components/ui/card";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.map((item: any) => (
            <Card key={item.id} className="overflow-hidden group cursor-pointer border-border hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                {item.image ? (
                  <StrapiImage
                    src={item.image.url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  {item.date && (
                    <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {new Date(item.date).toLocaleDateString("bn-BD", { year: 'numeric', month: 'long', day: 'numeric'})}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
