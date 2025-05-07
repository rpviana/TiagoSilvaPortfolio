import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import EventCard from '../components/EventCard';
// Define the event type with translations
interface EventTranslation {
  title: string;
  description: string;
  language_code: string;
}

interface EventWithTranslations {
  id: number;
  date: string;
  time: string;
  venue: string;
  is_past: boolean;
  bookingLink?: string;
  programLink?: string;
  translations: EventTranslation[];
}
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLanguageManager } from '../hooks/useLanguageManager';

const Events = () => {
  const { t } = useTranslation();
  const { language } = useLanguageManager();
  const [showPast, setShowPast] = useState(false);
  
  // Query upcoming events
  const upcomingEventsQuery = useQuery<EventWithTranslations[]>({
    queryKey: ['/api/events', { isPast: false, language }],
    queryFn: async () => {
      const res = await fetch(`/api/events?isPast=false&language=${language}`);
      if (!res.ok) throw new Error('Failed to fetch upcoming events');
      return res.json();
    },
    enabled: !showPast
  });
  
  // Query past events
  const pastEventsQuery = useQuery<EventWithTranslations[]>({
    queryKey: ['/api/events', { isPast: true, language }],
    queryFn: async () => {
      const res = await fetch(`/api/events?isPast=true&language=${language}`);
      if (!res.ok) throw new Error('Failed to fetch past events');
      return res.json();
    },
    enabled: showPast
  });
  
  // Handle tab switching
  const toggleEventType = (isPast: boolean) => {
    setShowPast(isPast);
  };
  
  // Current events based on selected tab
  const currentQuery = showPast ? pastEventsQuery : upcomingEventsQuery;
  const events = currentQuery.data || [];
  
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
            
            {currentQuery.isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : currentQuery.isError ? (
              <div className="bg-red-50 p-6 rounded-lg text-red-700 text-center">
                <p>{t('events.errorLoading')}</p>
              </div>
            ) : events.length === 0 ? (
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
                {events.map((event, index) => (
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
