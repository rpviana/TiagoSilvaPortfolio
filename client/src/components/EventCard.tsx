import { useTranslation } from 'react-i18next';
import { Event } from '@shared/schema';
import { format } from 'date-fns';
import { enUS, pt } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

const EventCard = ({ event, isPast = false }: EventCardProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'pt' ? pt : enUS;
  
  // Format date based on current language
  const formattedDate = format(new Date(event.date), 'dd', { locale });
  const formattedMonth = format(new Date(event.date), 'MMMM yyyy', { locale });
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Event Date */}
        <div className="md:col-span-1 bg-primary-light flex flex-col justify-center items-center p-6">
          <div className="text-primary text-center">
            <div className="font-playfair text-4xl font-bold">{formattedDate}</div>
            <div className="uppercase tracking-wide text-sm">{formattedMonth}</div>
            <div className="mt-2 inline-block bg-white px-3 py-1 rounded-full text-xs">{event.time}</div>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="md:col-span-3 p-6">
          <h3 className="text-xl font-playfair font-bold mb-2 text-primary">{event.title}</h3>
          <div className="text-sm text-gray-600 mb-4">{event.venue}</div>
          
          <p className="text-gray-700 text-sm mb-4">
            {event.description}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {!isPast && event.bookingLink && (
              <a 
                href={event.bookingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {t('events.bookTickets')}
              </a>
            )}
            
            {event.programLink && (
              <a 
                href={event.programLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {t('events.programDetails')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
