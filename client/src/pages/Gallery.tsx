import { useTranslation } from 'react-i18next';
import MediaGallery from '../components/MediaGallery';
import { motion } from 'framer-motion';

const Gallery = () => {
  const { t } = useTranslation();

  // Gallery images
  const images = [
    {
      src: "/attached_assets/Tiago-Violino-52.JPG",
      alt: "img1"
    },
    {
      src: "/attached_assets/Tiago-Violino-54.JPG",
      alt: "img2"
    },
    {
      src: "/attached_assets/Tiago-Violino-68.JPG",
      alt: "img3"
    },
    {
      src: "/attached_assets/Tiago-Violino-87.JPG",
      alt: "img4"
    },
    {
      src: "/attached_assets/Tiago-Violino-100.JPG",
      alt: "img5"
    },
    {
      src: "/attached_assets/Tiago-Violino-36.JPG",
      alt: "img6"
    },
    {
      src: "/attached_assets/FB_IMG_1729796581756.JPG",
      alt: "img7"
    },
    {
      src: "/attached_assets/FB_IMG_1729796535466.JPG",
      alt: "img8"
    }
  ];
  
  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-primary">
                {t('gallery.title')}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('gallery.description')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MediaGallery images={images} />
            </motion.div>
            
            {/* Videos Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-playfair font-bold mb-8 text-primary">
                {t('gallery.videos')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bartok 44 */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/twONMNOCuyc"
                      title={t('gallery.videosDetails.bartok44.title')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">{t('gallery.videosDetails.bartok44.title')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{t('gallery.videosDetails.bartok44.description')}</p>
                  </div>
                </div>
                {/* Bartok 32 */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/JZEUUuhajDk"
                      title={t('gallery.videosDetails.bartok32.title')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">{t('gallery.videosDetails.bartok32.title')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{t('gallery.videosDetails.bartok32.description')}</p>
                  </div>
                </div>
                {/* Kurtag */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/WwhcVKM-Ghs"
                      title={t('gallery.videosDetails.kurtag.title')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">{t('gallery.videosDetails.kurtag.title')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{t('gallery.videosDetails.kurtag.description')}</p>
                  </div>
                </div>
                {/* Palazzo */}
                <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/iMsOmzrZCRI"
                      title={t('gallery.videosDetails.palazzo.title')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">{t('gallery.videosDetails.palazzo.title')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{t('gallery.videosDetails.palazzo.description')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
