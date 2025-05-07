import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/biography", label: t.nav.about },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/recordings", label: t.nav.recordings },
    { href: "/calendar", label: t.nav.calendar },
    { href: "/contact", label: t.nav.contact },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/tiago.soaressilva.arts",
      icon: <Facebook className="h-5 w-5" />,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/tiagosilva_violin/",
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
    },
    {
      href: "http://www.youtube.com/@tiagosoaressilva7056",
      icon: <Youtube className="h-5 w-5" />,
      label: "Youtube",
    },
    {
      href: "http://www.linkedin.com/in/tiago-soares-silva-violin",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-playfair font-bold mb-2">
              Tiago Soares Silva
            </h2>
            <p className="text-gray-400">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-0">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-gray-300 hover:text-white transition-all">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Tiago Soares Silva. {t.footer.rights}
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy">
              <a className="text-gray-400 text-sm hover:text-white transition-all">
                {t.footer.privacy}
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-gray-400 text-sm hover:text-white transition-all">
                {t.footer.terms}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
