import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import GalleryLightbox from "@/components/ui/gallery-lightbox";

type GalleryImage = {
  src: string;
  alt: string;
  thumbnail: string;
};

export default function Gallery() {
  const { language } = useLanguage();
  const t = translations[language];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages: GalleryImage[] = [
    {
      src: "/attached_assets/Tiago-Violino-52.JPG",
      alt: "Portrait with violin scroll",
      thumbnail: "/attached_assets/Tiago-Violino-52.JPG",
    },
    {
      src: "/attached_assets/Tiago-Violino-54.JPG",
      alt: "Looking down at violin",
      thumbnail: "/attached_assets/Tiago-Violino-54.JPG",
    },
    {
      src: "/attached_assets/Tiago-Violino-68.JPG",
      alt: "Black and white performance",
      thumbnail: "/attached_assets/Tiago-Violino-68.JPG",
    },
    {
      src: "/attached_assets/Tiago-Violino-87.JPG",
      alt: "Outdoor performance",
      thumbnail: "/attached_assets/Tiago-Violino-87.JPG",
    },
    {
      src: "/attached_assets/Tiago-Violino-99.JPG",
      alt: "Portrait against stone wall",
      thumbnail: "/attached_assets/Tiago-Violino-99.JPG",
    },
    {
      src: "/attached_assets/Tiago-Violino-100.JPG",
      alt: "Black and white portrait against stone wall",
      thumbnail: "/attached_assets/Tiago-Violino-100.JPG",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="pt-24 pb-16 bg-cream-dark">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.gallery.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.gallery.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item h-80 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <GalleryLightbox
          images={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          initialIndex={currentImageIndex}
        />
      </div>
    </section>
  );
}
