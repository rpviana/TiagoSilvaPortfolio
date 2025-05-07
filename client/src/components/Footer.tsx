import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: "facebook-f", url: "https://www.facebook.com/tiago.soaressilva.arts", label: "Facebook" },
    { icon: "instagram", url: "https://www.instagram.com/tiagosilva_violin/", label: "Instagram" },
    { icon: "linkedin-in", url: "https://www.linkedin.com/in/tiago-soares-silva-violin", label: "LinkedIn" },
    { icon: "youtube", url: "https://www.youtube.com/@tiagosoaressilva7056", label: "YouTube" },
  ];
  
  const quickLinks = [
    { path: "/about", label: t("nav.about") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/discography", label: t("nav.discography") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/events", label: t("nav.events") },
    { path: "/contact", label: t("nav.contact") },
  ];
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-playfair font-bold mb-4">Tiago Soares Silva</h3>
              <p className="text-gray-400 mb-6">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={link.label}
                  >
                    <i className={`fab fa-${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">{t("footer.contact")}</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-envelope text-gray-400 mt-1 mr-3"></i>
                  <a 
                    href="mailto:tiagosilva.05.2000@gmail.com" 
                    className="text-gray-400 hover:text-white transition-colors break-all"
                  >
                    tiagosilva.05.2000@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="fab fa-whatsapp text-gray-400 mt-1 mr-3"></i>
                  <a 
                    href="https://wa.me/447784730680" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +44 (0) 778 473 0680
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Tiago Soares Silva. {t("footer.copyright")}
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="text-gray-400 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
