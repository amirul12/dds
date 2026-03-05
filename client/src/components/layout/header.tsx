import type { NavLink } from "@/types";
import Link from "next/link";
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
          <svg viewBox="0 0 238 238" fill="none" className="size-8 text-primary">
            <path
              d="M236.738 121.995C236.743 125.448 236.415 128.865 235.749 132.25C235.077 135.635 234.082 138.922 232.764 142.109C231.441 145.297 229.822 148.328 227.9 151.193L162.816 217.651L211.41 119.203L159.988 67.7656L221.348 84.849C227.905 92.7969 236.738 101.88 236.738 121.995Z"
              fill="currentColor"
            />
            <path
              d="M2.13501 116.621C2.12459 113.173 3.12459 106.366L76.0517 20.9648L27.4631 119.418L78.8798 170.855L17.5204 153.767C10.9683 145.819 2.13501 136.736 2.13501 116.621Z"
              fill="currentColor"
            />
          </svg>
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
