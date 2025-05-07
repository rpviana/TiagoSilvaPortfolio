import { useTranslation } from 'react-i18next';
import MediaGallery from '../components/MediaGallery';
import { motion } from 'framer-motion';

const Gallery = () => {
  const { t } = useTranslation();

  // Gallery images
  const images = [
    {
      src: "/attached_assets/Tiago-Violino-52.JPG",
      alt: "Tiago Soares Silva portrait with violin"
    },
    {
      src: "/attached_assets/Tiago-Violino-54.JPG",
      alt: "Tiago Soares Silva with violin"
    },
    {
      src: "/attached_assets/Tiago-Violino-68.JPG",
      alt: "Black and white portrait of Tiago Soares Silva performing"
    },
    {
      src: "/attached_assets/Tiago-Violino-87.JPG",
      alt: "Tiago Soares Silva performing"
    },
    {
      src: "/attached_assets/Tiago-Violino-99.JPG",
      alt: "Outdoor portrait of Tiago Soares Silva with violin"
    },
    {
      src: "/attached_assets/Tiago-Violino-100.JPG",
      alt: "Black and white outdoor portrait of Tiago Soares Silva with violin"
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
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
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
