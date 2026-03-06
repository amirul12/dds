import type { NavLink } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNavbar } from "@/components/custom/mobile-navbar";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface HeaderProps {
  data: {
    logoText: string;
    navItems: NavLink[];
    cta: NavLink;
  };
}

export function Header({ data }: Readonly<HeaderProps>) {  
  // Use organization defaults if Strapi data is not yet configured or generic
  const logoText = data?.logoText || "ঢাকাস্থ দেবহাটা উপজেলা সমিতি";
  const navItems = data?.navItems?.length ? data.navItems : [
    { text: "হোম", href: "/", isExternal: false },
    { text: "সদস্য তালিকা", href: "/directory", isExternal: false },
    { text: "বিজ্ঞপ্তি", href: "/notices", isExternal: false },
    { text: "ইভেন্ট", href: "/events", isExternal: false },
    { text: "কমিটি", href: "/committee", isExternal: false },
    { text: "গ্যালারি", href: "/gallery", isExternal: false },
    { text: "স্মরণিকা", href: "/smaranika", isExternal: false },
    { text: "যোগাযোগ", href: "/contact", isExternal: false },
  ];
  const cta = data?.cta || { text: "সদস্য আবেদন", href: "/contact#form", isExternal: false };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="container flex items-center justify-between gap-10 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="দেবহাটা উপজেলা সমিতি লোগো"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-heading text-xl font-bold text-primary">{logoText}</span>
        </Link>
        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-10 md:flex justify-end">
            {navItems?.map((item) => (
              <Link
                href={item.href}
                className="flex cursor-pointer items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                key={item.text}
                target={item.isExternal ? "_blank" : "_self"}
              >
                {item.text}
              </Link>
            ))}
          </nav>
          {cta && (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
                <Link
                  href={cta.href}
                  className="cursor-pointer"
                  target={cta.isExternal ? "_blank" : "_self"}
                >
                  {cta.text}
                </Link>
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
        <MobileNavbar>
          <div className="rounded-b-lg bg-background py-4 container text-foreground shadow-xl">
            <nav className="flex flex-col gap-1 pt-2">
              {navItems?.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="flex w-full cursor-pointer items-center rounded-md p-2 font-medium text-muted-foreground hover:text-primary"
                >
                  {item.text}
                </Link>
              ))}

              {cta && (
                <Button asChild size="lg" className="mt-2 w-full rounded-full">
                  <Link
                    href={cta.href}
                    className="cursor-pointer"
                    target={cta.isExternal ? "_blank" : "_self"}
                  >
                    {cta.text}
                  </Link>
                </Button>
              )}
              <ThemeToggle />
            </nav>
          </div>
        </MobileNavbar>
      </div>
    </header>
  );
}
