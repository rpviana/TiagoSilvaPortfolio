import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const [location] = useLocation();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  // Fetch dynamic content
  const { data: content } = useQuery({
    queryKey: ['/api/site-content'],
    queryFn: async () => {
      const res = await fetch('/api/site-content');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const map: Record<string, any> = {};
      data.forEach((item: any) => { map[item.key] = item });
      return map;
    },
    staleTime: 0,
    refetchOnMount: "always"
  });

  const getText = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return isPt ? content[key].valuePt : content[key].valueEn;
  };

  const getColor = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { path: "/about", label: getText("header_nav_about", t("nav.about")) },
    { path: "/gallery", label: getText("header_nav_gallery", t("nav.gallery")) },
    { path: "/discography", label: getText("header_nav_discography", t("nav.discography")) },
    { path: "/projects", label: getText("header_nav_projects", t("nav.projects")) },
    { path: "/events", label: getText("header_nav_events", t("nav.events")) },
    { path: "/contact", label: getText("header_nav_contact", t("nav.contact")) },
  ];

  const bgColor = getColor("header_bg_color", "#ffffff");
  const textColor = getColor("header_text_color", "#6B2D3A");
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-sm' : 'bg-transparent'}`}
      style={{ backgroundColor: scrolled ? `${bgColor}f2` : 'transparent' }}
    >
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            onClick={closeMenu} 
            className="text-xl md:text-2xl font-playfair font-bold transition-colors"
            style={{ color: textColor }}
          >
            {getText("header_logo_text", "Tiago Soares Silva")}
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path} 
                  className="nav-link transition-colors"
                  style={{ color: location === link.path ? textColor : `${textColor}cc` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <LanguageSwitcher />
          </div>
          
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            style={{ color: textColor }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden shadow-md"
            style={{ backgroundColor: bgColor }}
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    href={link.path} 
                    className="py-2"
                    style={{ color: location === link.path ? textColor : `${textColor}cc` }}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex items-center pt-2 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
