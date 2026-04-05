import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
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

  const getUrl = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  const socialLinks = [
    { icon: "facebook-f", url: getUrl("footer_facebook_url", "https://www.facebook.com/tiago.soaressilva.arts"), label: "Facebook" },
    { icon: "instagram", url: getUrl("footer_instagram_url", "https://www.instagram.com/tiagosilva_violin/"), label: "Instagram" },
    { icon: "linkedin-in", url: getUrl("footer_linkedin_url", "https://www.linkedin.com/in/tiago-soares-silva-violin"), label: "LinkedIn" },
    { icon: "youtube", url: getUrl("footer_youtube_url", "https://www.youtube.com/@tiagosoaressilva7056"), label: "YouTube" },
  ].filter(link => link.url); // Filter out empty URLs
  
  const quickLinks = [
    { path: "/about", label: t("nav.about") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/discography", label: t("nav.discography") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/events", label: t("nav.events") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const bgColor = getColor("footer_bg_color", "#111827");
  const textColor = getColor("footer_text_color", "#ffffff");
  const textSecondaryColor = getColor("footer_text_secondary_color", "#9CA3AF");
  
  return (
    <footer className="py-12" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-playfair font-bold mb-4" style={{ color: textColor }}>
                {getText("footer_title", "Tiago Soares Silva")}
              </h3>
              <p className="mb-6" style={{ color: textSecondaryColor }}>
                {getText("footer_description", t("footer.description"))}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-colors hover:opacity-80"
                    style={{ color: textSecondaryColor }}
                    aria-label={link.label}
                  >
                    <i className={`fab fa-${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      href={link.path} 
                      className="transition-colors hover:opacity-80"
                      style={{ color: textSecondaryColor }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                {t("footer.contact")}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-3" style={{ color: textSecondaryColor }}></i>
                  <a 
                    href={`mailto:${getText("footer_email", "tiagosilva.05.2000@gmail.com")}`} 
                    className="transition-colors hover:opacity-80 break-all"
                    style={{ color: textSecondaryColor }}
                  >
                    {getText("footer_email", "tiagosilva.05.2000@gmail.com")}
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="fab fa-whatsapp mt-1 mr-3" style={{ color: textSecondaryColor }}></i>
                  <a 
                    href={getUrl("footer_whatsapp_url", "https://wa.me/447784730680")} 
                    className="transition-colors hover:opacity-80"
                    style={{ color: textSecondaryColor }}
                  >
                    {getText("footer_phone", "+44 (0) 778 473 0680")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div 
            className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"
            style={{ borderColor: `${textSecondaryColor}40` }}
          >
            <div className="text-sm mb-4 md:mb-0" style={{ color: textSecondaryColor }}>
              &copy; {currentYear} {getText("footer_title", "Tiago Soares Silva")}. {getText("footer_copyright", t("footer.copyright"))}
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="hover:opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
