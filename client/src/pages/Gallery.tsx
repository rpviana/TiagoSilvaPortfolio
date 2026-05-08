import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

type SiteContent = { key: string; valuePt: string; valueEn: string; type: string };

const DEFAULT_PHOTOS = [
  "/attached_assets/Tiago-Violino-52.JPG",
  "/attached_assets/Tiago-Violino-54.JPG",
  "/attached_assets/Tiago-Violino-68.JPG",
  "/attached_assets/Tiago-Violino-87.JPG",
  "/attached_assets/Tiago-Violino-100.JPG",
  "/attached_assets/Tiago-Violino-36.JPG",
  "/attached_assets/Tiago-Violino-1.JPG",
  "/attached_assets/Tiago-Violino-2.JPG",
];

const DEFAULT_VIDEOS = [
  { url: "https://www.youtube.com/embed/twONMNOCuyc", titlePt: "Bartók 44 Duos", titleEn: "Bartók 44 Duos" },
  { url: "https://www.youtube.com/embed/JZEUUuhajDk", titlePt: "Bartók Violin Concerto No.2", titleEn: "Bartók Violin Concerto No.2" },
  { url: "https://www.youtube.com/embed/WwhcVKM-Ghs", titlePt: "Kurtág Segnale, Canzone e Fuga", titleEn: "Kurtág Segnale, Canzone e Fuga" },
  { url: "https://www.youtube.com/embed/iMsOmzrZCRI", titlePt: "Palazzo Violin Sonata", titleEn: "Palazzo Violin Sonata" },
];

function extractEmbedUrl(url: string): string {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/\s]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

const Gallery = () => {
  const { language } = useLanguage();
  const isPt = language === "pt";
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data: siteContentData = [] } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cm: Record<string, SiteContent> = {};
  (Array.isArray(siteContentData) ? siteContentData : []).forEach(item => { cm[item.key] = item; });

  const get = (key: string, fb: string) => isPt ? (cm[key]?.valuePt || fb) : (cm[key]?.valueEn || fb);

  // Build photos from siteContent, fall back to defaults
  const photos: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const val = cm[`gallery_photo_${i}`]?.valuePt;
    if (val) photos.push(val);
  }
  const displayPhotos = photos.length > 0 ? photos : DEFAULT_PHOTOS;

  // Build videos from siteContent, fall back to defaults
  const videos: { url: string; titlePt: string; titleEn: string }[] = [];
  for (let i = 1; i <= 8; i++) {
    const url = cm[`gallery_video_${i}_url`]?.valuePt;
    if (url) {
      videos.push({
        url: extractEmbedUrl(url),
        titlePt: cm[`gallery_video_${i}_title_pt`]?.valuePt || "",
        titleEn: cm[`gallery_video_${i}_title_en`]?.valuePt || "",
      });
    }
  }
  const displayVideos = videos.length > 0 ? videos : DEFAULT_VIDEOS;

  const bgColor = cm["gallery_bg_color"]?.valuePt || "#f9fafb";
  const titleColor = cm["gallery_title_color"]?.valuePt || "#6B2D3A";

  return (
    <div className="pt-24" style={{ backgroundColor: bgColor }}>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{ color: titleColor }}>
                {get("gallery_title", isPt ? "Galeria" : "Gallery")}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {get("gallery_description", isPt ? "Fotografias e vídeos de concertos e performances." : "Photos and videos from concerts and performances.")}
              </p>
            </motion.div>

            {/* Photos */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-2xl font-playfair font-semibold mb-6" style={{ color: titleColor }}>
                {get("gallery_photos_section_title", isPt ? "Fotografias" : "Photos")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
                {displayPhotos.map((src, i) => (
                  <motion.div key={i} className="aspect-square rounded overflow-hidden cursor-pointer bg-gray-100"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setLightbox(src)}>
                    <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Videos */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <h2 className="text-2xl font-playfair font-semibold mb-6" style={{ color: titleColor }}>
                {get("gallery_videos_section_title", isPt ? "Vídeos" : "Videos")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayVideos.map((v, i) => (
                  <div key={i} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="aspect-video">
                      <iframe className="w-full h-full" src={v.url} title={isPt ? v.titlePt : v.titleEn}
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: titleColor }}>{isPt ? v.titlePt : v.titleEn}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.div className="relative max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}>
              <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain" />
              <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors" onClick={() => setLightbox(null)}>
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
