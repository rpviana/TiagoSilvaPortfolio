import { useQuery } from "@tanstack/react-query";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

type SiteContent = { key: string; valuePt: string; valueEn: string; type: string };

const Contact = () => {
  const { language } = useLanguage();
  const isPt = language === "pt";

  const { data: raw = [] } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cm: Record<string, SiteContent> = {};
  (Array.isArray(raw) ? raw : []).forEach(item => { cm[item.key] = item; });

  const get = (key: string, fb: string) => isPt ? (cm[key]?.valuePt || fb) : (cm[key]?.valueEn || fb);

  const socialLinks = [
    { icon: "fab fa-facebook-f", url: get("contact_facebook_url", "https://www.facebook.com/tiago.soaressilva.arts"), label: "Facebook" },
    { icon: "fab fa-instagram", url: get("contact_instagram_url", "https://www.instagram.com/tiagosilva_violin/"), label: "Instagram" },
    { icon: "fab fa-linkedin-in", url: get("contact_linkedin_url", "https://www.linkedin.com/in/tiago-soares-silva-violin"), label: "LinkedIn" },
    { icon: "fab fa-youtube", url: get("contact_youtube_url", "https://www.youtube.com/@tiagosoaressilva7056"), label: "YouTube" },
  ].filter(s => s.url);

  const titleColor = cm["contact_title_color"]?.valuePt || "#6B2D3A";
  const bgColor = cm["contact_bg_color"]?.valuePt || "#ffffff";

  return (
    <div className="pt-24" style={{ backgroundColor: bgColor }}>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-center"
              style={{ color: titleColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {get("contact_title", isPt ? "Contacto" : "Contact")}
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-playfair font-bold mb-6" style={{ color: titleColor }}>
                  {get("contact_get_in_touch_title", isPt ? "Entre em Contacto" : "Get in Touch")}
                </h3>

                <p className="text-gray-700 mb-8">
                  {get("contact_intro_text", isPt
                    ? "Estou disponível para apresentações a solo, colaborações em câmara e projetos especiais."
                    : "I am available for solo performances, chamber collaborations and special projects.")}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4" style={{ color: titleColor }}><i className="fas fa-envelope" /></div>
                    <div>
                      <div className="font-medium">Email</div>
                      <a
                        href={`mailto:${get("contact_email", "tiagosilva.05.2000@gmail.com")}`}
                        className="text-gray-600 hover:text-primary transition-colors break-all"
                      >
                        {get("contact_email", "tiagosilva.05.2000@gmail.com")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4" style={{ color: titleColor }}><i className="fab fa-whatsapp" /></div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <a
                        href={get("contact_whatsapp_link", "https://wa.me/447784730680")}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {get("contact_whatsapp_display", "+44 (0) 778 473 0680")}
                      </a>
                    </div>
                  </div>

                  {socialLinks.length > 0 && (
                    <div className="flex items-start">
                      <div className="mr-4" style={{ color: titleColor }}><i className="fas fa-share-alt" /></div>
                      <div>
                        <div className="font-medium">{isPt ? "Redes Sociais" : "Social Media"}</div>
                        <div className="flex space-x-4 mt-2">
                          {socialLinks.map(link => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-70 transition-opacity"
                              style={{ color: titleColor }}
                              aria-label={link.label}
                            >
                              <i className={link.icon} />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ContactForm content={cm} isPt={isPt} titleColor={titleColor} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
