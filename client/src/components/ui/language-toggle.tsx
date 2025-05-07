import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  isMobile?: boolean;
}

export default function LanguageToggle({ isMobile = false }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (lang: "en" | "pt") => {
    setLanguage(lang);
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          onClick={() => toggleLanguage("en")}
          className={`px-3 py-2 ${
            language === "en"
              ? "text-purple font-bold"
              : "text-gray-400 hover:text-purple"
          } transition-all`}
        >
          English
        </Button>
        <Button
          variant="ghost"
          onClick={() => toggleLanguage("pt")}
          className={`px-3 py-2 ${
            language === "pt"
              ? "text-purple font-bold"
              : "text-gray-400 hover:text-purple"
          } transition-all`}
        >
          Português
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleLanguage("en")}
        className={`px-3 py-2 ${
          language === "en"
            ? "text-purple"
            : "text-gray-400 hover:text-purple"
        } transition-all`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleLanguage("pt")}
        className={`px-3 py-2 ${
          language === "pt"
            ? "text-purple"
            : "text-gray-400 hover:text-purple"
        } transition-all`}
      >
        PT
      </Button>
    </>
  );
}
