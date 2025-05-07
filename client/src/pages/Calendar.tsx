import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Camera } from "lucide-react";

export default function CalendarPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <section className="pt-24 pb-16 bg-cream">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.calendar.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.calendar.subtitle}
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="flex justify-center">
            <TabsTrigger value="upcoming">{t.calendar.filters.upcoming}</TabsTrigger>
            <TabsTrigger value="past">{t.calendar.filters.past}</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="upcoming">
          {t.calendar.upcoming.map((event, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/5 flex flex-col items-center justify-center text-center bg-purple text-white rounded-lg p-4">
                    <span className="text-3xl font-bold">{event.day}</span>
                    <span className="uppercase text-lg">{event.month}</span>
                    <span className="text-lg">{event.year}</span>
                  </div>

                  <div className="md:w-4/5">
                    <h3 className="font-playfair text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 mb-4 gap-4 sm:gap-8">
                      <div className="flex items-center">
                        <MapPin className="text-purple mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-purple mr-2 h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <a 
                      href={event.ticketLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="px-4 py-2 bg-gold text-white rounded hover:bg-gold-dark transition-all">
                        <i className="fas fa-ticket-alt mr-2"></i> {t.calendar.getTickets}
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past">
          {t.calendar.past.map((event, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/5 flex flex-col items-center justify-center text-center bg-gray-300 text-gray-700 rounded-lg p-4">
                    <span className="text-3xl font-bold">{event.day}</span>
                    <span className="uppercase text-lg">{event.month}</span>
                    <span className="text-lg">{event.year}</span>
                  </div>

                  <div className="md:w-4/5">
                    <h3 className="font-playfair text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-700 mb-4 gap-4 sm:gap-8">
                      <div className="flex items-center">
                        <MapPin className="text-purple mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-purple mr-2 h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    {event.mediaLink && (
                      <a 
                        href={event.mediaLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="secondary" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all">
                          <Camera className="mr-2 h-4 w-4" /> {t.calendar.viewMedia}
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </div>
    </section>
  );
}
