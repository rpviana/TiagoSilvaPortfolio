import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/lib/translations";
import LanguageToggle from "./ui/language-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language } = useLanguage();

  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const t = translations[language];

  const navLinks = [
    { href: "/biography", label: t.nav.about },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/recordings", label: t.nav.recordings },
    { href: "/repertoire", label: t.nav.repertoire },
    { href: "/discography", label: t.nav.discography },
    { href: "/calendar", label: t.nav.calendar },
    { href: "/projects", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? "bg-white shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <Link href="/">
            <a className="text-2xl font-playfair font-bold text-purple hover:text-gold transition-all">
              Tiago Soares Silva
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`px-3 py-2 rounded hover:bg-purple hover:text-white transition-all ${
                  location === link.href ? "text-purple font-medium" : ""
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="border-l border-gray-300 h-5 mx-2"></div>
          <LanguageToggle />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-purple"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full border-t border-gray-100">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`px-3 py-2 rounded hover:bg-purple hover:text-white transition-all ${
                    location === link.href ? "text-purple font-medium" : ""
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="flex space-x-2 border-t border-gray-200 pt-2 mt-2">
              <LanguageToggle isMobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
