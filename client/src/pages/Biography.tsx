import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, Music, MapPin, Calendar } from 'lucide-react';

export default function Biography() {
  const { t } = useTranslation();
  const [showFullBio, setShowFullBio] = useState(false);

  // Dados de educação estruturados
  const educationData = [
    {
      institution: "Royal Academy of Music",
      location: "London, UK",
      degree: "Master of Arts in Performance",
      period: "2020-2022",
      details: "Studied under Professor Simon Fischer"
    },
    {
      institution: "Escola Superior de Música de Lisboa",
      location: "Lisboa, Portugal",
      degree: "Licenciatura em Música - Violino",
      period: "2016-2020",
      details: "Studied under Professor Helena Sá e Costa"
    },
    {
      institution: "Conservatório de Música do Porto",
      location: "Porto, Portugal",
      degree: "Curso Básico e Secundário de Música",
      period: "2010-2016",
      details: "Foundational violin studies"
    }
  ];

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('nav.biography')}
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Photo */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/attached_assets/Tiago-Violino-52.JPG"
                  alt="Tiago Soares Silva"
                  className="rounded-lg shadow-xl w-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-light p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-playfair italic text-primary text-sm">
                    "A música é a linguagem universal que transcende todas as barreiras"
                  </p>
                </div>
              </motion.div>

              {/* Biography Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Short Bio */}
                <div>
                  <h2 className="text-2xl font-playfair font-bold mb-4 text-primary">
                    {t('biography.title')}
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Tiago Soares Silva é um violinista português reconhecido pela sua versatilidade 
                      artística e paixão pela música contemporânea. Formado pela Royal Academy of Music 
                      em Londres, desenvolve uma carreira internacional que combina performance solo, 
                      música de câmara e projetos colaborativos inovadores.
                    </p>
                    <p>
                      A sua abordagem musical caracteriza-se pela exploração de repertórios que 
                      dialogam entre o clássico e o contemporâneo, sempre com uma perspetiva 
                      interpretativa única e tecnicamente refinada.
                    </p>
                  </div>

                  {/* See More Button */}
                  <Button 
                    onClick={() => setShowFullBio(!showFullBio)}
                    variant="outline"
                    className="mt-4"
                  >
                    {showFullBio ? t('common.seeLess') : t('common.seeMore')}
                  </Button>

                  {/* Full Bio - Expandable */}
                  {showFullBio && (
                    <motion.div 
                      className="mt-6 space-y-4 text-gray-700 leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5 }}
                    >
                      <p>
                        Nascido no Porto em 1998, Tiago iniciou os seus estudos musicais aos 6 anos 
                        no Conservatório de Música do Porto. Destacou-se rapidamente pela sua 
                        dedicação e talento natural, tendo conquistado diversos prémios em 
                        competições nacionais e internacionais durante a sua formação.
                      </p>
                      <p>
                        Após completar a sua licenciatura na Escola Superior de Música de Lisboa 
                        com distinção, foi aceite na prestigiada Royal Academy of Music em Londres, 
                        onde estudou com o professor Simon Fischer, aprofundando a sua técnica e 
                        desenvolvendo uma perspetiva internacional da performance.
                      </p>
                      <p>
                        Durante os seus estudos em Londres, Tiago teve a oportunidade de colaborar 
                        com diversos ensemble contemporâneos e participar em masterclasses com 
                        alguns dos mais reconhecidos violinistas da atualidade. Esta experiência 
                        moldou profundamente a sua visão artística e abriu portas para 
                        colaborações que se mantêm até hoje.
                      </p>
                      <p>
                        Atualmente, divide o seu tempo entre Portugal e o Reino Unido, 
                        desenvolvendo projetos que exploram as fronteiras entre géneros musicais 
                        e promovem o diálogo intercultural através da música. É membro fundador 
                        do 97 Ensemble e mantém uma intensa atividade concertística a solo.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Education Section - Redesigned */}
            <motion.section 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-12 text-primary text-center">
                {t('biography.education.title')}
              </h2>
              
              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="text-primary" size={24} />
                        <h3 className="text-xl font-playfair font-bold text-primary">
                          {edu.institution}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 mt-2 md:mt-0">
                        <Calendar size={16} />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mb-2">
                      <MapPin className="text-gray-500 mt-1" size={16} />
                      <span className="text-gray-600 text-sm">{edu.location}</span>
                    </div>
                    
                    <div className="flex items-start space-x-2 mb-3">
                      <Award className="text-primary mt-1" size={16} />
                      <span className="font-medium text-gray-800">{edu.degree}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm italic">{edu.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Performance Highlights */}
            <motion.section 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-12 text-primary text-center">
                {t('biography.highlights.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                  <Music className="text-primary mb-4" size={32} />
                  <h3 className="font-playfair font-bold mb-2 text-primary">Solo Recitals</h3>
                  <p className="text-gray-700 text-sm">
                    Performances at prestigious venues including Wigmore Hall, Kings Place, and Royal Academy of Music
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                  <Award className="text-primary mb-4" size={32} />
                  <h3 className="font-playfair font-bold mb-2 text-primary">Awards</h3>
                  <p className="text-gray-700 text-sm">
                    Winner of multiple national and international violin competitions during formative years
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                  <GraduationCap className="text-primary mb-4" size={32} />
                  <h3 className="font-playfair font-bold mb-2 text-primary">Masterclasses</h3>
                  <p className="text-gray-700 text-sm">
                    Participated in masterclasses with world-renowned violinists and pedagogues
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
