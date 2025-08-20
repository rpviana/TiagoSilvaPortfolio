import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";

export default function Repertoire() {
  const { language } = useLanguage();
  const t = translations[language];

  // Textos para título e botão, fallback para inglês/português
  const title =
    language === "pt"
      ? "Lista de Repertório"
      : language === "en"
      ? "Repertoire List"
      : t.repertoire?.title || "Repertoire";
  const buttonLabel =
    language === "pt"
      ? "Baixar Repertório (PDF)"
      : language === "en"
      ? "Download Repertoire (PDF)"
      : "Download Repertoire";

  // Escolhe o ficheiro correto conforme o idioma
  const downloadFile =
    language === "pt"
      ? "/downloads/RepertoireList_pt.pdf"
      : "/downloads/RepertoireList_en.pdf";

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-cream px-4">
      <div className="max-w-xl w-full text-center py-24">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-purple mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          {language === "pt"
            ? "Clique no botão abaixo para baixar a lista completa de repertório em PDF."
            : "Click the button below to download the full repertoire list as a PDF."}
        </p>
        <a
          href={downloadFile}
          download
          className="inline-block px-8 py-4 rounded-lg bg-purple text-white font-semibold text-lg shadow-lg hover:bg-purple-dark transition"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
