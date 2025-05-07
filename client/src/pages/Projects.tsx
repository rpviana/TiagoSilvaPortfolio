import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Instagram, Facebook } from "lucide-react";

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.projects.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.projects.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 97 Ensemble */}
          <Card className="bg-cream rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="https://pixabay.com/get/gd14b1af40fad3d38c3a3e4487cad56b445c993cc9e1fb87242c8302883ffb815b982ea0026e1baff6f807d33d5ba3bdc1a8b175e11b769fc84660b6c6430bed2_1280.jpg"
                alt="97 Ensemble performing"
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-2">97 Ensemble</h3>
              <p className="text-gray-700 mb-4">
                {t.projects.ensemble97.description}
              </p>
              <div className="flex space-x-3 mb-4">
                <a
                  href="https://97ensemble.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-gold transition-all"
                  aria-label="97 Ensemble Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/97ensemble/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-gold transition-all"
                  aria-label="97 Ensemble Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <a
                href="https://97ensemble.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                  {t.projects.visitWebsite}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Constelação 15 */}
          <Card className="bg-cream rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="Constelação 15 performing"
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-2">
                Constelação 15
              </h3>
              <p className="text-gray-700 mb-4">
                {t.projects.constelacao.description}
              </p>
              <div className="flex space-x-3 mb-4">
                <a
                  href="https://www.constellation15.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-gold transition-all"
                  aria-label="Constelação 15 Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
              <a
                href="https://www.constellation15.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                  {t.projects.visitWebsite}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* FAMART */}
          <Card className="bg-cream rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="FAMART cultural activities"
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-6">
              <h3 className="font-playfair text-xl font-semibold mb-2">FAMART</h3>
              <p className="text-gray-700 mb-4">
                {t.projects.famart.description}
              </p>
              <div className="flex space-x-3 mb-4">
                <a
                  href="https://www.facebook.com/share/19B77iPAWk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-gold transition-all"
                  aria-label="FAMART Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/famart.plataforma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:text-gold transition-all"
                  aria-label="FAMART Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <a
                href="https://www.instagram.com/famart.plataforma/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                  {t.projects.learnMore}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
