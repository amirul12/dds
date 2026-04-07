import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_BASE_URL || "";
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Union name mapping from English to Bangla
export function getUnionNameInBangla(union: string): string {
  const unionMap: Record<string, string> = {
    "Debhata": "দেবহাটা",
    "Kulya": "কুলিয়া",
    "Parulia": "পারুলিয়া",
    "Sakhipur": "সখিপুর",
    "Nawapara": "নওয়াপাড়া"
  };
  return unionMap[union] || union;
}

