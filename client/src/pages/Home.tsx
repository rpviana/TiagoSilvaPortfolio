import { Link } from "wouter";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&h=1200')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 animate-[slideUp_0.5s_ease-out]">Tiago Soares Silva</h1>
          <p className="text-xl md:text-2xl text-cream-light font-cormorant mb-8 animate-[fadeIn_0.5s_ease-in] max-w-2xl mx-auto">
            {t.home.tagline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-[slideUp_0.5s_ease-out]">
            <Link href="/contact">
              <Button className="px-6 py-3 bg-purple text-white rounded hover:bg-purple-light transition-all">
                {t.home.contactButton}
              </Button>
            </Link>
            <Link href="/biography">
              <Button variant="outline" className="px-6 py-3 bg-transparent border border-white text-white rounded hover:bg-white hover:text-purple transition-all">
                {t.home.learnButton}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <Button variant="ghost" onClick={() => {
            document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <ChevronDown className="h-8 w-8" />
          </Button>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
            {t.home.featuredTitle}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t.home.featuredSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Featured Card 1 - Latest Recording */}
            <div className="bg-cream rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1520446266423-6daca23fe8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Latest recording" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {t.home.featured.recording.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.home.featured.recording.description}
                </p>
                <Link href="/recordings">
                  <Button className="inline-flex items-center px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                    {t.home.featured.recording.button}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Featured Card 2 - Upcoming Event */}
            <div className="bg-cream rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519111887837-a48ccf9edc00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Upcoming event" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {t.home.featured.event.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.home.featured.event.description}
                </p>
                <Link href="/calendar">
                  <Button className="inline-flex items-center px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                    {t.home.featured.event.button}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Featured Card 3 - Latest Project */}
            <div className="bg-cream rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://pixabay.com/get/gd14b1af40fad3d38c3a3e4487cad56b445c993cc9e1fb87242c8302883ffb815b982ea0026e1baff6f807d33d5ba3bdc1a8b175e11b769fc84660b6c6430bed2_1280.jpg" 
                  alt="Latest project" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {t.home.featured.project.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t.home.featured.project.description}
                </p>
                <Link href="/projects">
                  <Button className="inline-flex items-center px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                    {t.home.featured.project.button}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl md:text-2xl font-cormorant italic mb-6">
              "{t.home.quote.text}"
            </blockquote>
            <p className="font-playfair">{t.home.quote.author}</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
            {t.home.galleryTitle}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t.home.gallerySubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg h-64 transform transition-all duration-300 hover:scale-105">
              <img 
                src="/attached_assets/Tiago-Violino-52.JPG" 
                alt="Tiago Soares Silva portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-64 transform transition-all duration-300 hover:scale-105">
              <img 
                src="/attached_assets/Tiago-Violino-54.JPG" 
                alt="Tiago Soares Silva with violin" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-64 transform transition-all duration-300 hover:scale-105">
              <img 
                src="/attached_assets/Tiago-Violino-87.JPG" 
                alt="Tiago Soares Silva performing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg h-64 transform transition-all duration-300 hover:scale-105">
              <img 
                src="/attached_assets/Tiago-Violino-99.JPG" 
                alt="Tiago Soares Silva outdoor portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/gallery">
              <Button className="px-6 py-3 bg-purple text-white rounded hover:bg-purple-light transition-all">
                {t.home.galleryButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
