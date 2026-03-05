import Link from "next/link";
import Image from "next/image";

interface SocialLink {
  href: string;
  text: string;
}

interface FooterProps {
  data: {
    text: string;
    socialLinks: SocialLink[];
  };
}

export function Footer({ data }: Readonly<FooterProps>) {
  if (!data) return null;
  const { text, socialLinks } = data;

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-12 bg-white rounded-full flex items-center justify-center p-2">
                <svg viewBox="0 0 238 238" fill="none" className="text-primary size-full">
                  <path d="M236.738 121.995C236.743 125.448 236.415 128.865 235.749 132.25C235.077 135.635 234.082 138.922 232.764 142.109C231.441 145.297 229.822 148.328 227.9 151.193C225.978 154.063 223.796 156.708 221.348 159.146L162.816 217.651C161.816 216.88 160.874 216.052 159.978 215.161L211.41 119.203L159.988 67.7656C160.712 24.3125 161.655 25.151 162.546 26.0469L221.348 84.849C223.796 87.2813 227.905 92.7969 236.738 121.995Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">ঢাকাস্থ দেবহাটা <br/>উপজেলা সমিতি</span>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm">
              ঢাকাস্থ দেবহাটা উপজেলা সমিতি একটি অলাভজনক ও সেবামূলক সংগঠন। আমাদের মূল লক্ষ্য ঢাকাস্থ দেবহাটা প্রবাসীদের মধ্যে ভ্রাতৃত্বের বন্ধন সুদৃঢ় করা।
            </p>
            <div className="flex gap-4">
              {socialLinks?.map((link) => (
                <a 
                  key={link.text} 
                  href={link.href} 
                  target="_blank" 
                  className="size-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all"
                >
                  <span className="sr-only">{link.text}</span>
                  {/* Icon based on text, fallback to a generic social icon */}
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.146 6.839 9.465.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.003.07s1.3 1.03 1.3 1.03c.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.639.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.137 20.141 22 16.409 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-6 lg:ml-12">
            <h4 className="text-xl font-bold font-serif border-b-2 border-secondary inline-block pb-1">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/directory" className="hover:text-secondary hover:pl-2 transition-all">সদস্য ডিরেক্টরি</Link></li>
              <li><Link href="/notices" className="hover:text-secondary hover:pl-2 transition-all">বিজ্ঞপ্তি বোর্ড</Link></li>
              <li><Link href="/events" className="hover:text-secondary hover:pl-2 transition-all">আসন্ন ইভেন্ট</Link></li>
              <li><Link href="/committee" className="hover:text-secondary hover:pl-2 transition-all">কার্যনির্বাহী কমিটি</Link></li>
              <li><Link href="/smaranika" className="hover:text-secondary hover:pl-2 transition-all">স্মরণিকা প্রকল্প</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 lg:ml-8">
             <h4 className="text-xl font-bold font-serif border-b-2 border-secondary inline-block pb-1">সহযোগিতা</h4>
             <ul className="space-y-3 text-sm">
               <li><Link href="/contact" className="hover:text-secondary hover:pl-2 transition-all">যোগাযোগ করুন</Link></li>
               <li><Link href="/contact#faq" className="hover:text-secondary hover:pl-2 transition-all">সাধারণ জিজ্ঞাসা</Link></li>
               <li><Link href="/directory?type=correction" className="hover:text-secondary hover:pl-2 transition-all">তথ্য সংশোধন</Link></li>
               <li><a href="#" className="hover:text-secondary hover:pl-2 transition-all">ডাউনলোড ফরম</a></li>
             </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold font-serif border-b-2 border-secondary inline-block pb-1">সরাসরি যোগাযোগ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                 <svg className="size-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 </svg>
                 <span>হাউস #১০, রোড #০৫, ব্লক #এ, বনশ্রী, রামপুরা, ঢাকা-১২১৯।</span>
              </div>
              <div className="flex gap-3">
                 <svg className="size-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
                 <span>01711-000000, 01711-111111</span>
              </div>
              <div className="flex gap-3">
                 <svg className="size-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <span>info@debhatasamiti.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} {text}. অল রাইটস রিজার্ভড।</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</a>
            <a href="#" className="hover:text-white transition-colors">টার্মস এন্ড কন্ডিশন</a>
          </div>
          <p>Created with ❤️ for Debhata</p>
        </div>
      </div>
    </footer>
  );
}
