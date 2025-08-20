import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";

export default function NavBar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Outros links de navegação */}
            <Link to="/repertoire" className="text-gray-700 hover:text-gray-900">
              {t.repertoire?.title || "Repertoire"}
            </Link>
          </div>
          {/* ...outro código da navbar... */}
        </div>
      </div>
    </nav>
  );
}