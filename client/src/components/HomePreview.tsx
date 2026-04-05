import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

interface HomePreviewProps {
  content: Record<string, SiteContent>;
  language: "pt" | "en";
}

export function HomePreview({ content, language }: HomePreviewProps) {
  const { t } = useTranslation();
  const isPt = language === "pt";

  const getDynamicText = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return isPt ? content[key].valuePt : content[key].valueEn;
  };

  const getDynamicImage = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  return (
    <div className="bg-black text-white overflow-auto h-full">
      {/* Hero Section - scaled down */}
      <section className="relative h-[300px] bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-70">
          <img
            src={getDynamicImage("home_hero_image", "/attached_assets/Tiago-Violino-87.JPG")}
            alt="Hero"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <motion.h1
            className="text-2xl font-playfair font-bold mb-2 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={getDynamicText("home_hero_title", "")}
          >
            {getDynamicText("home_hero_title", "Tiago Soares Silva")}
          </motion.h1>

          <motion.p
            className="text-sm font-light opacity-90 mb-4 whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={getDynamicText("home_hero_subtitle", "")}
          >
            {getDynamicText("home_hero_subtitle", t("home.tagline"))}
          </motion.p>

          <span 
            className="inline-block text-white text-xs px-4 py-2 rounded"
            style={{ backgroundColor: content["home_hero_cta_color"]?.valuePt || "#6B2D3A" }}
          >
            {getDynamicText("home_hero_cta_text", t("home.cta"))}
          </span>
        </div>
      </section>

      {/* About Section Preview - scaled down */}
      <section className="py-8 bg-white text-black">
        <div className="px-6">
          <h2 className="text-lg font-playfair font-bold text-primary mb-4 border-b-2 border-primary/30 pb-2 inline-block">
            {t("nav.about")}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-xs text-gray-700 whitespace-pre-line line-clamp-4">
                {getDynamicText("home_about_p1", t("home.aboutPreview.paragraph1"))}
              </p>
              <p className="text-xs text-gray-700 whitespace-pre-line line-clamp-3">
                {getDynamicText("home_about_p2", t("home.aboutPreview.paragraph2"))}
              </p>

              <span className="text-primary text-xs flex items-center">
                {t("home.readMore")}
                <ArrowRight className="ml-1" size={12} />
              </span>
            </div>

            <div className="relative">
              <img
                src={getDynamicImage("home_about_image", "/attached_assets/Tiago-Violino-68.JPG")}
                alt="About"
                className="w-full h-32 rounded object-cover shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section Placeholder - minimal */}
      <section className="py-6 bg-gray-50">
        <div className="px-6">
          <h2 className="text-sm font-playfair font-bold text-primary text-center mb-4">
            {t("home.featuredProjects")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded shadow p-3">
              <div className="w-full h-16 bg-gray-200 rounded mb-2"></div>
              <div className="text-xs font-bold text-primary">97 Ensemble</div>
            </div>
            <div className="bg-white rounded shadow p-3">
              <div className="text-xs font-bold text-primary mb-2">{t("home.upcomingEvents")}</div>
              <div className="space-y-1">
                <div className="border-l border-primary/50 pl-2">
                  <div className="text-[10px] text-gray-500">15 Out 2023</div>
                  <div className="text-[10px] font-medium truncate">{t("events.event1.title")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
