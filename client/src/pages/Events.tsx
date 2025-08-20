import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLanguageManager } from '../hooks/useLanguageManager';

// Define the event type with translations
interface EventTranslation {
  id: number;
  eventId: number;
  languageCode: string;
  title: string;
  description: string;
}

interface EventWithTranslations {
  id: number;
  date: string;
  time: string;
  venue: string;
  isPast: boolean;
  bookingLink?: string;
  programLink?: string;
  translations: EventTranslation[];
}

// Copie o array de eventos para este arquivo (ou importe de um arquivo separado, mas não de EventCard)
const events: EventWithTranslations[] = [
  {
    id: 3,
    date: '2023-05-10T19:00:00',
    time: '7:00 PM',
    venue: 'Royal Academy of Music, London, UK',
    isPast: true,
    translations: [
      {
        id: 5,
        eventId: 3,
        languageCode: 'en',
        title: "Tiago Soares Silva: Solo Recital",
        description: "A solo program featuring works by Bach, Ysaÿe, and contemporary composers."
      },
      {
        id: 6,
        eventId: 3,
        languageCode: 'pt',
        title: "Tiago Soares Silva: Recital a Solo",
        description: "Um programa a solo apresentando obras de Bach, Ysaÿe e compositores contemporâneos."
      }
    ]
  },
  // Edimburgh International Festival – Rising Stars: Classical Jam
  {
    id: 4,
    date: '2025-08-15T19:00:00',
    time: '7:00 PM',
    venue: 'The Hub, Edimburgh (UK)',
    isPast: false,
    bookingLink: 'https://www.eif.co.uk/events/rising-stars-classical-jam#dates-and-times',
    programLink: undefined,
    translations: [
      {
        id: 7,
        eventId: 4,
        languageCode: 'en',
        title: 'Edimburgh International Festival – Rising Stars: Classical Jam',
        description: `Nicola Benedetti joins our Rising Stars on stage in this unrehearsed performance where you choose the repertoire.
Rising Stars gives the world’s most promising young musicians a chance to shine on an international stage. In this experimental edition of our Rising Stars concerts, catch a glimpse into the future of classical music.
Inspired by the spirit of jazz, emerging musicians play side-by-side with Festival Director Nicola Benedetti. Blending the precision of the composed score with the relaxed atmosphere of friends playing together, this unrehearsed performance harnesses the power of instinct and spontaneity. And you – the audience – get to choose what you want to hear.`
      },
      {
        id: 8,
        eventId: 4,
        languageCode: 'pt',
        title: 'Edimburgh International Festival – Rising Stars: Classical Jam',
        description: `Nicola Benedetti junta-se aos nossos Rising Stars num concerto único e sem ensaios, onde o público escolhe o que quer ouvir.
O programa Rising Stars dá palco aos jovens músicos mais promissores do mundo, oferecendo-lhes a oportunidade de brilhar a nível internacional. Nesta edição especial e experimental, convidamos-te a espreitar o futuro da música clássica.
Inspirados pela liberdade do jazz, músicos emergentes tocam lado a lado com a diretora do festival, Nicola Benedetti. O resultado é uma atuação espontânea e cheia de energia, que combina a precisão da partitura com a leveza de amigos a tocarem juntos. Nada foi ensaiado — tudo acontece no momento. E o repertório? És tu quem decide.`
      }
    ]
  },
  // Royal Academy of Music, Final Recital
  {
    id: 5,
    date: '2025-09-04T15:30:00',
    time: '3:30 PM',
    venue: 'Angela Burgess Recital Hall, Royal Academy of Music (UK)',
    isPast: false,
    bookingLink: undefined,
    programLink: undefined,
    translations: [
      {
        id: 9,
        eventId: 5,
        languageCode: 'en',
        title: 'Royal Academy of Music, Final Recital',
        description: `Works by Claude Debussy, Richar Wagner / August Whilhemj, Fritz Kreisler / Manuel de Falla and George Enescu.`
      },
      {
        id: 10,
        eventId: 5,
        languageCode: 'pt',
        title: 'Royal Academy of Music, Recital Final',
        description: `Obras de Claude Debussy, Richar Wagner / August Whilhemj, Fritz Kreisler / Manuel de Falla e George Enescu.`
      }
    ]
  },
  // 97 Ensemble – Seaside and Sunshine
  {
    id: 6,
    date: '2025-09-06T13:10:00',
    time: '1:10 PM',
    venue: "St. James’s Piccadilly, London (UK)",
    isPast: false,
    bookingLink: 'https://www.sjp.org.uk/whats-on/97-ensemble-seaside-and-sunshine/',
    programLink: undefined,
    translations: [
      {
        id: 11,
        eventId: 6,
        languageCode: 'en',
        title: '97 Ensemble – Seaside and Sunshine',
        description: `Works by Judith Wier, Jessie Montgomery and Ethel Smyth

97 Ensemble is a group of musicians aiming to raise awareness to the statistic that 97% of women aged 18-24 experience sexual harassment in the UK. They work closely with the charity Solace Women’s Aid and give performances in their women and children’s shelters as part of their mission to bring classical music to everyone. In April 2025, 97 Ensemble performed at the Houses of Parliament as part of Solace Women’s Aid’s 50th Anniversary.
97 Ensemble champions music by women composers and has performed at venues such as the Elgar Room, Fidelio Café and the St Pancras Clock Tower. Their collaborations include working with Dr Leah Broad on her ‘Quartet’ book tour, giving performances by Ethel Smyth, Rebecca Clarke, Dorothy Howell and Doreen Carwithen.
They also champion works by living composers, including British-Iranian composers Shiva Feshareki and Soosan Lolovar who were part of 97 Ensembles sold-out concert at Fidelio Café in September 2023, marking one year of the ‘Woman, Life, Freedom’ movement in Iran.
97 Ensemble was founded in 2022 by cellist Niki Moosavi and is grateful for the generous support of The Marchus Trust.`
      },
      {
        id: 12,
        eventId: 6,
        languageCode: 'pt',
        title: '97 Ensemble – Seaside and Sunshine',
        description: `Obras de Judith Wier, Jessie Montgomery e Ethel Smyth

O 97 Ensemble é um grupo de músicos dedicado a sensibilizar o público para a alarmante estatística de que 97% das mulheres entre os 18 e os 24 anos no Reino Unido já foram vítimas de assédio sexual. Em estreita colaboração com a organização Solace Women’s Aid, o grupo realiza concertos nos abrigos da instituição para mulheres e crianças, integrando esta atividade na sua missão de tornar a música clássica acessível a todos.
Em abril de 2025, o 97 Ensemble apresentou-se nas Casas do Parlamento em Londres, no âmbito das comemorações do 50.o aniversário da Solace Women’s Aid.
O grupo tem como foco a valorização da música composta por mulheres e já atuou em salas prestigiadas como a Elgar Room, o Fidelio Café e a Torre do Relógio de St Pancras.
Entre os seus projetos destaca-se a colaboração com a Dra. Leah Broad, na digressão do seu livro Quartet, com interpretações de obras de Ethel Smyth, Rebecca Clarke, Dorothy Howell e Doreen Carwithen.
O 97 Ensemble colabora regularmente com compositoras contemporâneas, como as britânico-iranianas Shiva Feshareki e Soosan Lolovar, apresentando obras das mesmas num concerto esgotado no Fidelio Café, em setembro de 2023, realizado para assinalar um ano do movimento “Mulher, Vida, Liberdade” no Irão.
Fundado em 2022 pela violoncelista Niki Moosavi, o 97 Ensemble é apoiado pelo The Marchus Trust.`
      }
    ]
  },

];

const Events = () => {
  const { t } = useTranslation();
  const { language } = useLanguageManager();
  const [showPast, setShowPast] = useState(false);
  
  // Handle tab switching
  const toggleEventType = (isPast: boolean) => {
    setShowPast(isPast);
  };
  
  // Current events based on selected tab
  const currentEvents = events.filter(event => event.isPast === showPast);
  
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
              {showPast ? t('events.pastEvents') : t('events.upcomingEvents')}
            </motion.h1>
            
            <motion.div 
              className="flex mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button 
                className={`px-4 py-2 ${!showPast ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-l-lg transition-colors`}
                onClick={() => toggleEventType(false)}
              >
                {t('events.upcoming')}
              </button>
              <button 
                className={`px-4 py-2 ${showPast ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-r-lg transition-colors`}
                onClick={() => toggleEventType(true)}
              >
                {t('events.past')}
              </button>
            </motion.div>
            
            {currentEvents.length === 0 ? (
              <div className="bg-gray-100 p-10 rounded-lg text-center">
                <p className="text-gray-600">
                  {showPast ? t('events.noPastEvents') : t('events.noUpcomingEvents')}
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                  >
                    <EventCard event={event} isPast={showPast} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
