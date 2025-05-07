import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Repertoire() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="pt-24 pb-16 bg-cream">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.repertoire.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.repertoire.subtitle}
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex justify-center flex-wrap">
            <TabsTrigger value="all">{t.repertoire.filters.all}</TabsTrigger>
            <TabsTrigger value="solo">{t.repertoire.filters.solo}</TabsTrigger>
            <TabsTrigger value="chamber">{t.repertoire.filters.chamber}</TabsTrigger>
            <TabsTrigger value="concerto">{t.repertoire.filters.concerto}</TabsTrigger>
            <TabsTrigger value="programs">{t.repertoire.filters.programs}</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="all" className="space-y-12">
          {/* Solo Repertoire */}
          <div>
            <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
              {t.repertoire.solo.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.repertoire.solo.composers.map((composer, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-charcoal mb-2">{composer.name}</h3>
                    <ul className="text-gray-700 space-y-1">
                      {composer.works.map((work, idx) => (
                        <li key={idx}>- {work}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chamber Music */}
          <div>
            <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
              {t.repertoire.chamber.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.repertoire.chamber.composers.map((composer, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-charcoal mb-2">{composer.name}</h3>
                    <ul className="text-gray-700 space-y-1">
                      {composer.works.map((work, idx) => (
                        <li key={idx}>- {work}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Concertos */}
          <div>
            <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
              {t.repertoire.concerto.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.repertoire.concerto.categories.map((category, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-charcoal mb-2">{category.name}</h3>
                    <ul className="text-gray-700 space-y-1">
                      {category.works.map((work, idx) => (
                        <li key={idx}>- {work}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Program Proposals */}
          <div>
            <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
              {t.repertoire.programs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.repertoire.programs.proposals.map((program, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-charcoal mb-2">{program.title}</h3>
                    <p className="text-gray-600 italic mb-4">{program.description}</p>
                    <ul className="text-gray-700 space-y-2">
                      {program.works.map((work, idx) => (
                        <li key={idx}>- {work}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="solo">
          <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
            {t.repertoire.solo.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.repertoire.solo.composers.map((composer, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-charcoal mb-2">{composer.name}</h3>
                  <ul className="text-gray-700 space-y-1">
                    {composer.works.map((work, idx) => (
                      <li key={idx}>- {work}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chamber">
          <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
            {t.repertoire.chamber.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.repertoire.chamber.composers.map((composer, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-charcoal mb-2">{composer.name}</h3>
                  <ul className="text-gray-700 space-y-1">
                    {composer.works.map((work, idx) => (
                      <li key={idx}>- {work}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="concerto">
          <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
            {t.repertoire.concerto.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.repertoire.concerto.categories.map((category, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-charcoal mb-2">{category.name}</h3>
                  <ul className="text-gray-700 space-y-1">
                    {category.works.map((work, idx) => (
                      <li key={idx}>- {work}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs">
          <h2 className="text-2xl font-playfair font-semibold text-purple mb-6">
            {t.repertoire.programs.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.repertoire.programs.proposals.map((program, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-charcoal mb-2">{program.title}</h3>
                  <p className="text-gray-600 italic mb-4">{program.description}</p>
                  <ul className="text-gray-700 space-y-2">
                    {program.works.map((work, idx) => (
                      <li key={idx}>- {work}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </div>
    </section>
  );
}
