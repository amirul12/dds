import { getAboutPageData } from "@/data/loaders";
import { StrapiImage } from "@/components/custom/strapi-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, MapPin, Building2, Info, ScrollText, Users } from "lucide-react";

export default async function AboutPage() {
  const data = await getAboutPageData();
  const about = data?.data;

  if (!about) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">তথ্য পাওয়া যায়নি</h1>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {about.image ? (
          <StrapiImage
            src={about.image.url}
            alt={about.title}
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-primary/90" />
        )}
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-10 duration-700">
            {about.title || "সমিতি পরিচিতি"}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-lg font-medium opacity-90">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-secondary" />
              <span>স্থাপিত: {about.establishedYear || "২০২২"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-secondary" />
              <span>কার্যালয়: {about.officeLocation || "ঢাকা"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-card border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-4 mb-10 text-primary">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ScrollText className="size-6" />
              </div>
              <h2 className="text-3xl font-serif font-bold">সমিতির আদর্শ ও লক্ষ্যসমূহ</h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert prose-primary max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-bold
              prose-li:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {about.content || "তথ্য হালনাগাদ করা হচ্ছে..."}
              </ReactMarkdown>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-primary hover:text-white transition-all duration-300">
              <Users className="size-10 text-primary group-hover:text-white mb-4" />
              <h3 className="font-bold text-lg mb-2">সদস্য এলাকা</h3>
              <p className="text-sm opacity-80 font-medium">বৃহত্তর ঢাকা ও দেবহাটার ৫টি ইউনিয়ন</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-primary hover:text-white transition-all duration-300">
              <Building2 className="size-10 text-primary group-hover:text-white mb-4" />
              <h3 className="font-bold text-lg mb-2">কেন্দ্রীয় কার্যালয়</h3>
              <p className="text-sm opacity-80 font-medium font-serif italic">ঢাকা মহানগরী</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:bg-primary hover:text-white transition-all duration-300">
              <Info className="size-10 text-primary group-hover:text-white mb-4" />
              <h3 className="font-bold text-lg mb-2">সংগঠনের প্রকৃতি</h3>
              <p className="text-sm opacity-80 font-medium italic">অরাজনৈতিক ও সেবামূলক</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
