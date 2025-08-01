import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-70">
          <img 
            src="/attached_assets/Tiago-Violino-100.JPG" 
            alt="Tiago Soares Silva Violin Performance" 
            className="object-cover w-full h-full" 
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-end pb-28 md:pb-40 relative z-10">
          <div className="max-w-3xl text-white">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Tiago Soares Silva
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl font-light opacity-90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('home.tagline')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded tracking-wide transition-colors">
                {t('home.cta')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section Preview */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <h2 className="section-title">
                  {t('nav.about')}
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {t('home.aboutPreview.paragraph1')}
                  </p>
                  <p>
                    {t('home.aboutPreview.paragraph2')}
                  </p>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Link href="/about" className="text-primary hover:text-primary-dark font-medium flex items-center">
                    <span>{t('home.readMore')}</span>
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/attached_assets/Tiago-Violino-99.JPG" 
                  alt="Tiago Soares Silva" 
                  className="w-full h-auto rounded-lg shadow-xl" 
                />
                
                <div className="absolute -bottom-6 -right-6 bg-primary-light p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <p className="font-playfair italic text-primary">
                    "{t('home.quote')}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-primary text-center">
              {t('home.featuredProjects')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 97 Ensemble */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="97 Ensemble" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold mb-3 text-primary">97 Ensemble</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    {t('projects.97ensemble.shortDescription')}
                  </p>
                  
                  <Link href="/projects" className="inline-block bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    {t('home.learnMore')}
                  </Link>
                </div>
              </div>
              
              {/* Upcoming Events Preview */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-playfair font-bold mb-6 text-primary">
                  {t('home.upcomingEvents')}
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="border-l-2 border-primary/50 pl-4">
                    <div className="text-sm text-gray-500 mb-1">15 {t('events.months.october')} 2023</div>
                    <div className="font-medium">{t('events.event1.title')}</div>
                    <div className="text-sm text-gray-600">{t('events.event1.venue')}</div>
                  </div>
                  
                  <div className="border-l-2 border-primary/50 pl-4">
                    <div className="text-sm text-gray-500 mb-1">03 {t('events.months.november')} 2023</div>
                    <div className="font-medium">{t('events.event2.title')}</div>
                    <div className="text-sm text-gray-600">{t('events.event2.venue')}</div>
                  </div>
                </div>
                
                <Link href="/events" className="inline-block text-primary hover:text-primary-dark flex items-center">
                  <span>{t('home.viewAllEvents')}</span>
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
