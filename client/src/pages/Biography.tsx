import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Biography() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("short");

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-8 text-center">
          {t.biography.title}
        </h1>

        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <img
              src="/attached_assets/Tiago-Violino-52.JPG"
              alt="Tiago Soares Silva Violin Portrait"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          <div className="md:w-1/2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="short">{t.biography.tabs.shortBio}</TabsTrigger>
                <TabsTrigger value="long">{t.biography.tabs.fullBio}</TabsTrigger>
                <TabsTrigger value="cv">{t.biography.tabs.cv}</TabsTrigger>
              </TabsList>

              <TabsContent value="short" className="animate-[fadeIn_0.5s_ease-in]">
                <h2 className="text-xl font-playfair font-semibold mb-4 text-charcoal">
                  {t.biography.shortBio.title}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t.biography.shortBio.paragraph1}</p>
                  <p>{t.biography.shortBio.paragraph2}</p>
                </div>
              </TabsContent>

              <TabsContent value="long" className="animate-[fadeIn_0.5s_ease-in]">
                <h2 className="text-xl font-playfair font-semibold mb-4 text-charcoal">
                  {t.biography.fullBio.title}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{t.biography.fullBio.paragraph1}</p>
                  <p>{t.biography.fullBio.paragraph2}</p>
                  <p>{t.biography.fullBio.paragraph3}</p>
                  <p>{t.biography.fullBio.paragraph4}</p>
                </div>
              </TabsContent>

              <TabsContent value="cv" className="animate-[fadeIn_0.5s_ease-in]">
                <h2 className="text-xl font-playfair font-semibold mb-4 text-charcoal">
                  {t.biography.cv.title}
                </h2>
                
                {/* Education */}
                <div className="mb-6">
                  <h3 className="font-bold text-purple">{t.biography.cv.education.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {t.biography.cv.education.items.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Performance Experience */}
                <div className="mb-6">
                  <h3 className="font-bold text-purple">{t.biography.cv.experience.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {t.biography.cv.experience.items.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Recordings */}
                <div className="mb-6">
                  <h3 className="font-bold text-purple">{t.biography.cv.recordings.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {t.biography.cv.recordings.items.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Awards */}
                <div className="mb-6">
                  <h3 className="font-bold text-purple">{t.biography.cv.awards.title}</h3>
                  <ul className="mt-2 space-y-2">
                    {t.biography.cv.awards.items.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
