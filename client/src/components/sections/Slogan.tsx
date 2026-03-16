import React from "react";

export function Slogan() {
  return (
    <section className="py-10 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-y border-primary/10 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-1 w-20 bg-primary rounded-full opacity-30" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 dark:text-white italic tracking-wide">
            "সম্প্রীতি-ভালোবাসার কর্মনীতিতে হোক ঐক্যতান"
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full opacity-30" />
        </div>
      </div>
    </section>
  );
}
