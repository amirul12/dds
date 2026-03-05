import React from "react";
import { getCommitteeMembers } from "@/data/loaders";
import Image from "next/image";

export default async function CommitteePage() {
  const committeeTypes = ["Executive", "Advisory", "Smaranika", "Ad-hoc"];
  const sections = await Promise.all(
    committeeTypes.map(async (type) => ({
      type,
      members: (await getCommitteeMembers(type)).data,
    }))
  );

  return (
    <div className="container py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">আমাদের কমিটিসমূহ</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          ঢাকাস্থ দেবহাটা উপজেলা সমিতির কার্যক্রম পরিচালনার দায়িত্বে নিয়োজিত বিজ্ঞ ব্যক্তিবর্গ।
        </p>
      </div>

      <div className="space-y-20">
        {sections.map((section) => (
          section.members.length > 0 && (
            <div key={section.type}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-serif font-bold text-primary whitespace-nowrap">
                  {section.type === "Executive" ? "কার্যনির্বাহী কমিটি" : 
                   section.type === "Advisory" ? "উপদেষ্টা মন্ডলী" :
                   section.type === "Smaranika" ? "স্মরণিকা উপ-কমিটি" : "অন্যান্য কমিটি"}
                </h2>
                <div className="h-[2px] bg-primary/20 w-full" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {section.members.map((member: any) => (
                  <div key={member.id} className="text-center group">
                    <div className="relative size-40 md:size-48 lg:size-56 mx-auto mb-6 overflow-hidden rounded-full ring-4 ring-offset-4 ring-primary/10 transition-all group-hover:ring-primary/40">
                      {member.photo ? (
                        <Image 
                          src={process.env.STRAPI_BASE_URL + member.photo.url} 
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                          {member.name[0]}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-sm font-semibold text-primary mb-2">{member.designation}</p>
                    {member.union && <p className="text-xs text-muted-foreground">{member.union}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
