import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioPlayer from "@/components/ui/audio-player";

export default function Recordings() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("all");

  // Audio recordings data
  const audioRecordings = [
    {
      title: "Bach: Partita No. 3 in E Major, BWV 1006",
      details: "Live recording at St. Martin-in-the-Fields, London",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/18/01_-_Vivaldi_Spring_mvt_1_Allegro_-_John_Harrison_violin.mp3",
      date: "June 2022",
      duration: "17:24",
      type: "audio"
    },
    {
      title: "Brett Dean: Eclipse (String Quartet No. 1)",
      details: "From the album \"Brett Dean: Eclipse\" on Luminate Records",
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/08_-_Vivaldi_Winter_mvt_2_Largo_-_John_Harrison_violin.mp3",
      date: "2023",
      duration: "14:59",
      type: "audio"
    }
  ];

  // Video recordings data
  const videoRecordings = [
    {
      title: "Brahms Violin Sonata No. 3 in D minor",
      details: "Live performance with 97 Ensemble",
      src: "https://www.youtube.com/embed/BFFFLYo6kYs",
      date: "March 2023",
      duration: "21:32",
      type: "video"
    },
    {
      title: "Prokofiev Violin Concerto No. 1",
      details: "With Constelação 15 at Barbican Centre",
      src: "https://www.youtube.com/embed/4uJayYDQXBE",
      date: "November 2022",
      duration: "23:11",
      type: "video"
    }
  ];

  const allRecordings = [...audioRecordings, ...videoRecordings];

  const filteredRecordings = () => {
    switch (activeTab) {
      case "audio":
        return audioRecordings;
      case "video":
        return videoRecordings;
      default:
        return allRecordings;
    }
  };

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.recordings.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.recordings.subtitle}
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="all">{t.recordings.filters.all}</TabsTrigger>
            <TabsTrigger value="audio">{t.recordings.filters.audio}</TabsTrigger>
            <TabsTrigger value="video">{t.recordings.filters.video}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRecordings().map((recording, index) => (
            <div key={index}>
              {recording.type === "audio" ? (
                <AudioPlayer
                  src={recording.src}
                  title={recording.title}
                  details={recording.details}
                  date={recording.date}
                  duration={recording.duration}
                />
              ) : (
                <div className="bg-cream rounded-lg shadow p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3">{recording.title}</h3>
                  <p className="text-gray-600 mb-4">{recording.details}</p>
                  <div className="relative pt-[56.25%] mb-4">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded"
                      src={recording.src}
                      title={recording.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-4">
                      <i className="far fa-calendar mr-1"></i> Performed: {recording.date}
                    </span>
                    <span>
                      <i className="far fa-clock mr-1"></i> Duration: {recording.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://youtube.com/@tiagosoaressilva7056"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="px-6 py-3 bg-purple text-white rounded hover:bg-purple-light transition-all">
              <i className="fab fa-youtube mr-2"></i>
              {t.recordings.youtubeButton}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
