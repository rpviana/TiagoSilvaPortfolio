import { useTranslation } from 'react-i18next';
import AlbumCard, { Album } from '../components/AlbumCard';
import { motion } from 'framer-motion';

const Discography = () => {
  const { t } = useTranslation();
  
  // Album data
  const albums: Album[] = [
    {
      title: "Brett Dean: Eclipse (String Quartet No. 1)",
      label: "Luminate Records",
      year: "2023",
      coverUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      sampleUrl: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
      links: [
        {
          platform: "official",
          url: "https://luminaterecords.com/product/brett-dean-eclipse-string-quartet-no-1/"
        },
        {
          platform: "spotify",
          url: "#"
        },
        {
          platform: "apple",
          url: "#"
        },
        {
          platform: "amazon",
          url: "#"
        }
      ]
    },
    {
      title: "Justin Connolly: Music for Strings (plus...)",
      label: "Divine Art Records",
      year: "2022",
      coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      sampleUrl: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
      links: [
        {
          platform: "official",
          url: "https://divineartrecords.com/recording/justin-connolly-music-for-strings-plus/"
        },
        {
          platform: "spotify",
          url: "#"
        },
        {
          platform: "apple",
          url: "#"
        },
        {
          platform: "amazon",
          url: "#"
        }
      ]
    }
  ];
  
  // Reviews
  const reviews = [
    {
      text: "Silva's interpretation brings a remarkable sensitivity to Dean's complex textures, revealing layers of meaning that might otherwise remain hidden.",
      source: "Gramophone Magazine"
    },
    {
      text: "The technical mastery on display is impressive, but what truly distinguishes this recording is the emotional depth and intellectual commitment.",
      source: "BBC Music Magazine"
    },
    {
      text: "In Connolly's challenging score, Silva navigates the complexities with extraordinary precision while maintaining a lyrical, singing quality.",
      source: "The Strad"
    },
    {
      text: "This is contemporary classical music performance at its finest—intellectually stimulating yet profoundly moving.",
      source: "Classical Music Review"
    }
  ];
  
  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('discography.title')}
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {albums.map((album, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AlbumCard album={album} />
                </motion.div>
              ))}
              
              {/* Album Reviews */}
              <motion.div 
                className="md:col-span-2 bg-white rounded-lg shadow-md p-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-playfair font-bold mb-6 text-primary">{t('discography.criticalAcclaim')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-start">
                        <i className="fas fa-quote-left text-2xl text-primary/30 mr-4"></i>
                        <div>
                          <p className="italic text-gray-700 mb-4">
                            "{review.text}"
                          </p>
                          <div className="text-sm font-medium text-primary">— {review.source}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discography;
