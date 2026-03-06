import React from "react";
import { getEvents } from "@/data/loaders";
import { RSVPForm } from "@/components/custom/RSVPForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/custom/markdown-text";

export default async function EventsPage() {
  const response = await getEvents();
  const events = response.data;

  // For this demo, we'll show the most recent active event with its RSVP form
  const mainEvent = events.find((e: any) => e.isActive);

  return (
    <div className="container py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">অনুষ্ঠান ও মিলনমেলা</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          আমাদের পরবর্তী সকল আয়োজন এবং মিলনমেলার বিস্তারিত তথ্য এখানে পাবেন।
        </p>
      </div>

      {mainEvent ? (
        <div className={`grid grid-cols-1 ${mainEvent.showRegistration ? 'lg:grid-cols-2' : ''} gap-12 items-start`}>
          <div className="space-y-8">
            {mainEvent.image && (
              <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src={process.env.STRAPI_BASE_URL + mainEvent.image.url} 
                  alt={mainEvent.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary mb-4">{mainEvent.title}</h2>
              <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Intl.DateTimeFormat('bn-BD', { dateStyle: 'full' }).format(new Date(mainEvent.dateTime))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{mainEvent.location}</span>
                </div>
              </div>
              <div className="rich-text prose prose-indigo dark:prose-invert max-w-none">
                <MarkdownText content={mainEvent.description || ""} />
              </div>
              {mainEvent.mapLink && (
                <div className="mt-8">
                  <Button variant="outline" asChild>
                    <a href={mainEvent.mapLink} target="_blank">গুগল ম্যাপে দেখুন</a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {mainEvent.showRegistration && (
            <div>
              <RSVPForm eventId={mainEvent.id} eventTitle={mainEvent.title} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted rounded-2xl border-2 border-dashed">
          <p className="text-xl text-muted-foreground italic font-serif">বর্তমানে কোন বিশেষ অনুষ্ঠান নির্ধারিত নেই। নিয়মিত চোখ রাখুন।</p>
        </div>
      )}

      {/* Past events or other list could go here */}
    </div>
  );
}
