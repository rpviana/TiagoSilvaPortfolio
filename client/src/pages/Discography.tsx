import { Link } from "wouter";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Discography() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-purple mb-2 text-center">
          {t.discography.title}
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t.discography.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Album 1 */}
          <div className="flex flex-col md:flex-row bg-cream rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-2/5">
              <img
                src="https://images.unsplash.com/photo-1502773860571-211a597d6e4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                alt="Brett Dean: Eclipse album cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-3/5 p-6">
              <h2 className="font-playfair text-xl font-semibold mb-2">
                Brett Dean: Eclipse (String Quartet No. 1)
              </h2>
              <p className="text-gray-600 mb-4">Luminate Records (2023)</p>

              <div className="mb-4">
                <h3 className="font-bold text-sm text-charcoal mb-2">
                  {t.discography.criticalAcclaim}:
                </h3>
                <p className="text-gray-700 text-sm italic quote">
                  "{t.discography.albums.eclipse.quote}"
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-sm text-charcoal mb-2">
                  {t.discography.streaming}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-spotify mr-1"></i> Spotify
                  </a>
                  <a
                    href="https://music.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-apple mr-1"></i> Apple Music
                  </a>
                  <a
                    href="https://music.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-youtube mr-1"></i> YouTube Music
                  </a>
                </div>
              </div>

              <a
                href="https://luminaterecords.com/product/brett-dean-eclipse-string-quartet-no-1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                  <i className="fas fa-shopping-cart mr-2"></i> {t.discography.purchase}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Album 2 */}
          <div className="flex flex-col md:flex-row bg-cream rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-2/5">
              <img
                src="https://images.unsplash.com/photo-1520446266423-6daca23fe8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                alt="Justin Connolly: Music for Strings album cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-3/5 p-6">
              <h2 className="font-playfair text-xl font-semibold mb-2">
                Justin Connolly: Music for Strings (plus...)
              </h2>
              <p className="text-gray-600 mb-4">Divine Art Records (2022)</p>

              <div className="mb-4">
                <h3 className="font-bold text-sm text-charcoal mb-2">
                  {t.discography.criticalAcclaim}:
                </h3>
                <p className="text-gray-700 text-sm italic quote">
                  "{t.discography.albums.connolly.quote}"
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-sm text-charcoal mb-2">
                  {t.discography.streaming}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-spotify mr-1"></i> Spotify
                  </a>
                  <a
                    href="https://music.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-apple mr-1"></i> Apple Music
                  </a>
                  <a
                    href="https://music.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all"
                  >
                    <i className="fab fa-youtube mr-1"></i> YouTube Music
                  </a>
                </div>
              </div>

              <a
                href="https://divineartrecords.com/recording/justin-connolly-music-for-strings-plus/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-light transition-all">
                  <i className="fas fa-shopping-cart mr-2"></i> {t.discography.purchase}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
