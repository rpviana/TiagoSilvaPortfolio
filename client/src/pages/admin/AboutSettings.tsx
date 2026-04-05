import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Eye, EyeOff, Monitor, Download, FileText } from "lucide-react";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  // Textos
  { key: "about_title", label: "Título da Página", type: "text", defaultPt: "Sobre", defaultEn: "About" },
  { key: "about_image", label: "Foto Principal", type: "image", defaultPt: "/attached_assets/Tiago-Violino-52.JPG", defaultEn: "/attached_assets/Tiago-Violino-52.JPG" },
  
  // Short Bio (4 parágrafos)
  { key: "about_short_title", label: "Título - Biografia Curta", type: "text", defaultPt: "Biografia Curta", defaultEn: "Short Biography" },
  { key: "about_short_p1", label: "Biografia Curta - Parágrafo 1", type: "textarea", defaultPt: "Artista Futuro do Southbank Centre e Britten Pears Young Artist, Tiago Soares Silva apresentou-se recentemente em salas como Wigmore Hall, Queens Hall Edinburgh, Southbank Centre, Stamford International Festival, Aldeburgh Festival, Lerici Music Festival, St. James's Piccadilly, Petworth Chamber Music Festival, Linbury Theatre no Royal Opera House, Fidelio Café e Ferrandou Musique.", defaultEn: "A Southbank Centre Future Artist and Britten Pears Young Artist, Tiago Soares Silva's recent appearances include Wigmore Hall, Queens Hall Edinburgh, Southbank Centre, Stamford International Festival, Aldeburgh Festival, Lerici Music Festival, St. James's Piccadilly, Petworth Chamber Music Festival, Linbury Theatre at the Royal Opera House, Fidelio Café, and Ferrandou Musique." },
  { key: "about_short_p2", label: "Biografia Curta - Parágrafo 2", type: "textarea", defaultPt: "É artista de gravação da Luminate Records, tendo lançado um EP do Quarteto de Cordas nº1 \"Eclipse\" de Brett Dean. Gravou também \"Ceilidh\" de Justin Connolly para a Divine Records, integrado num álbum duplo dedicado à música do compositor, aclamado por publicações como a Gramophone, a British Music Society e a Classical Music Daily.", defaultEn: "He is a recording artist with Luminate Records, releasing an EP of Brett Dean's String Quartet No.1 \"Eclipse\". He has also recorded Justin Connolly's Ceilidh for Divine Records, part of a landmark double-album dedicated to Justin Connolly's music, reviewed by Gramophone, British Music Society, and Classical Music Daily." },
  { key: "about_short_p3", label: "Biografia Curta - Parágrafo 3", type: "textarea", defaultPt: "Tiago é membro fundador do 97 Ensemble, colaborando com organizações como a Amnistia Internacional e a Solace Women's Aid. É igualmente Vice-Presidente da FAMART – Associação Cultural, que promove eventos culturais no norte rural de Portugal.", defaultEn: "Tiago is a founding member of the 97 Ensemble, collaborating with charities such as Amnesty International and Solace Women's Aid. He is also Vice-President of FAMART – Cultural Association, bringing cultural events throughout the northern countryside regions of Portugal." },
  { key: "about_short_p4", label: "Biografia Curta - Parágrafo 4", type: "textarea", defaultPt: "É licenciado com distinção pelo Royal College of Music e antigo bolseiro de pós-graduação da Royal Academy of Music. Atualmente frequenta o Advanced Postgraduate Diploma no Royal Birmingham Conservatoire, sob orientação de Roman Mints e com o apoio da Headley Trust, tocando num violino Gioffredo Cappa de cerca de 1710, gentilmente cedido pela Royal Academy of Music.", defaultEn: "He is a First Class Honours graduate of the Royal College of Music, and a former postgraduate and scholar at the Royal Academy of Music. Currently, he is an Advanced Postgraduate Diploma student of Roman Mints at the Royal Birmingham Conservatoire, supported by the Headley Trust, performing on a circa 1710 Gioffredo Cappa violin kindly on loan by the Royal Academy of Music." },
  
  // Full Bio (7 parágrafos)
  { key: "about_full_title", label: "Título - Biografia Completa", type: "text", defaultPt: "Biografia Completa", defaultEn: "Full Biography" },
  { key: "about_full_p1", label: "Biografia Completa - Parágrafo 1", type: "textarea", defaultPt: "Artista Britten Pears Young Artist e Southbank Centre Future Artist, Tiago Soares Silva apresentou-se por toda a Europa como solista e músico de câmara. Entre as suas atuações recentes contam-se o Wigmore Hall, Queens' Hall Edinburgh, Southbank Centre, Linbury Theatre no Royal Opera House, Aldeburgh Festival, Snape Maltings, Petworth Festival, Ferrandou Musique, Lerici Festival, Elgar Room e Fidelio Café.", defaultEn: "A Britten Pears Young Artist and Southbank Centre Future Artist, Tiago Soares Silva has performed throughout Europe as a chamber musician and soloist. Recent appearances include Wigmore Hall, Queens' Hall Edinburgh, Southbank Centre, Linbury Theatre at the Royal Opera House, Aldeburgh Festival, Snape Maltings, Petworth Festival, Ferrandou Musique, Lerici Festival, Elgar Room and Fidelio Café." },
  { key: "about_full_p2", label: "Biografia Completa - Parágrafo 2", type: "textarea", defaultPt: "Lançou recentemente, com o Slate Quartet, um EP para a Luminate Records com o Quarteto de Cordas nº1 \"Eclipse\" de Brett Dean. Gravou também \"Ceilidh\" de Justin Connolly para quatro violinos, com membros do Kreutzer Quartet e Muriel Oberhofer, integrado num álbum duplo editado pela Divine Records, elogiado pela Gramophone, British Music Society e Classical Music Daily.", defaultEn: "He has recently released, with the Slate Quartet, an EP for Luminate Records of Brett Dean's String Quartet No. 1 \"Eclipse\". He has also recorded Justin Connolly's Ceilidh for four violins with members of the Kreutzer Quartet and Muriel Oberhofer, as part of a Double-Album through Divine Records, favourably reviewed by Gramophone, British Music Society, and Classical Music Daily." },
  { key: "about_full_p3", label: "Biografia Completa - Parágrafo 3", type: "textarea", defaultPt: "Colaborou com artistas de renome internacional como James Ehnes, Jo Knight, Jack Liebeck, Merel Vercammen, Hee-Young Lim, Oliver Heath, Elliot Perks, Jordan Ashman e Elly Suh. Como intérprete de música contemporânea, estreou obras de Sarah Angliss, Erland Cooper, Sasha Scott, Marcello Palazzo, Philip Dutton, Rockey Sun Keting, Beatrice Ferreira e Marcus Rock.", defaultEn: "Tiago has collaborated with internationally-renowned artists such as James Ehnes, Jo Knight, Jack Liebeck, Merel Vercammen, Hee-Young Lim, Oliver Heath, Elliot Perks, Jordan Ashman, and Elly Suh. As a contemporary artist, he has premiered works by Sarah Angliss, Erland Cooper, Sasha Scott, Marcello Palazzo, Philip Dutton, Rockey Sun Keting, Beatrice Ferreira, and Marcus Rock." },
  { key: "about_full_p4", label: "Biografia Completa - Parágrafo 4", type: "textarea", defaultPt: "É membro fundador do Slate Quartet e do 97 Ensemble, este último dedicado à promoção do repertório de compositoras e à colaboração com instituições como a Amnistia Internacional e a Solace Women's Aid. Tiago é também fundador e Vice-Presidente da FAMART – Associação Cultural, que leva eventos artísticos ao norte de Portugal, criando oportunidades para jovens músicos portugueses através de masterclasses, concertos, workshops, gravações profissionais e projetos comunitários como \"Raízes\".", defaultEn: "He is a founding member of the Slate Quartet and the 97 Ensemble, the latter championing female composers' repertoire and collaborating with charities such as Amnesty International and Solace Women's Aid. Tiago is also a founder and Vice-President of FAMART, a cultural association bringing artistic events to northern Portugal, creating opportunities for young Portuguese artists through masterclasses, concerts, workshops, recordings, and community projects such as \"Raízes\"." },
  { key: "about_full_p5", label: "Biografia Completa - Parágrafo 5", type: "textarea", defaultPt: "Foi premiado em vários concursos e festivais nacionais e internacionais, entre eles o Concurso Internacional de Violino de Guimarães (2.º prémio), Concurso Internacional Paços Premium (2.º prémio), Prémio Luso-Galaico \"Elisa de Sousa Pedroso\" (1.º prémio), Concurso Nacional Vasco Barbosa (3.º prémio), Classical Summer Festival Lisboa (2.º prémio) e o Festival Peter de Grote, Groningen (Prémio Honorário de Excelência Musical).", defaultEn: "He has been a prize winner in several national and international competitions, such as Guimarães International Violin Competition (2nd prize), Paços Premium International Competition (2nd prize), Elisa de Sousa Pedroso Luso-Galician Prize (1st prize), Vasco Barbosa National String Competition (3rd prize), Classical Summer Festival Lisbon (2nd prize), and the Peter de Grote Festival Groningen (Honorary Award for Outstanding Musicianship)." },
  { key: "about_full_p6", label: "Biografia Completa - Parágrafo 6", type: "textarea", defaultPt: "No percurso académico, recebeu distinções como o Prémio de Excelência Santander Totta, o Prémio Doutora Manuela Carvalho, o Prémio da Fundação Padre Simão Rodrigues, o Help Musicians Postgraduate Award e o Stephen Bell Charitable Trust.", defaultEn: "Academically, Tiago has been a recipient of several prizes including the Santander Totta's Excellence Prize, Doctor Manuela Carvalho Prize, Padre Simão Rodrigues Foundation Prize, Help Musicians Postgraduate Award, and the Stephen Bell Charitable Trust." },
  { key: "about_full_p7", label: "Biografia Completa - Parágrafo 7", type: "textarea", defaultPt: "Foi bolseiro de pós-graduação da Royal Academy of Music e licenciou-se com distinção pelo Royal College of Music. Atualmente frequenta o Advanced Postgraduate Diploma no Royal Birmingham Conservatoire, apoiado pela Headley Trust. Toca num violino Gioffredo Cappa de cerca de 1710 e um arco Hill, ambos gentilmente cedidos pela Royal Academy of Music.", defaultEn: "He is a former postgraduate student and scholar at the Royal Academy of Music, and a First Class Honours graduate of the Royal College of Music. Currently, he is pursuing the Advanced Postgraduate Diploma at the Royal Birmingham Conservatoire, supported by the Headley Trust. He performs on a circa 1710 Gioffredo Cappa violin, and a Hill bow, both kindly on loan by the Royal Academy of Music." },
  
  // Cores
  { key: "about_bg_color", label: "Cor de Fundo", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "about_title_color", label: "Cor do Título", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  { key: "about_text_color", label: "Cor do Texto", type: "color", defaultPt: "#374151", defaultEn: "#374151" },
  { key: "about_button_color", label: "Cor dos Botões", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  
  // Documentos PT
  { key: "about_cv_pt", label: "CV (Português)", type: "file", defaultPt: "/cv-pt.pdf", defaultEn: "/cv-pt.pdf" },
  { key: "about_small_bio_pt", label: "Biografia Curta PDF (Português)", type: "file", defaultPt: "/Tiago_PequenaBiografia_pt.pdf", defaultEn: "/Tiago_PequenaBiografia_pt.pdf" },
  { key: "about_full_bio_pt", label: "Biografia Completa PDF (Português)", type: "file", defaultPt: "/Tiago_BiografiaCompleta_pt.pdf", defaultEn: "/Tiago_BiografiaCompleta_pt.pdf" },
  
  // Documentos EN
  { key: "about_cv_en", label: "CV (English)", type: "file", defaultPt: "/cv-en.pdf", defaultEn: "/cv-en.pdf" },
  { key: "about_small_bio_en", label: "Short Biography PDF (English)", type: "file", defaultPt: "/Tiago_SmallBiography_en.pdf", defaultEn: "/Tiago_SmallBiography_en.pdf" },
  { key: "about_full_bio_en", label: "Full Biography PDF (English)", type: "file", defaultPt: "/Tiago_FullBiography_en.pdf", defaultEn: "/Tiago_FullBiography_en.pdf" },
  
  // Labels dos botões
  { key: "about_cv_label", label: "Texto Botão CV", type: "text", defaultPt: "Baixar CV", defaultEn: "Download CV" },
  { key: "about_bio_label", label: "Texto Botão Biografia", type: "text", defaultPt: "Baixar Bio (PDF)", defaultEn: "Download Bio (PDF)" },
];

function AboutPreview({ content, language }: { content: Record<string, SiteContent>; language: "pt" | "en" }) {
  const isPt = language === "pt";

  const getText = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return isPt ? content[key].valuePt : content[key].valueEn;
  };

  const getColor = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  const getFile = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  const bgColor = getColor("about_bg_color", "#ffffff");
  const titleColor = getColor("about_title_color", "#6B2D3A");
  const textColor = getColor("about_text_color", "#374151");
  const buttonColor = getColor("about_button_color", "#6B2D3A");

  return (
    <div 
      className="h-full overflow-auto"
      style={{ backgroundColor: bgColor }}
    >
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 
            className="text-2xl md:text-3xl font-playfair font-bold mb-8 text-center"
            style={{ color: titleColor }}
          >
            {getText("about_title", isPt ? "Sobre" : "About")}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Photo */}
            <div className="md:col-span-1">
              <div className="sticky top-4">
                <img 
                  src={getFile("about_image", "/attached_assets/Tiago-Violino-52.JPG")}
                  alt="Tiago Soares Silva"
                  className="w-full h-auto rounded-lg shadow-lg mb-4"
                />
                <a 
                  className="inline-flex items-center justify-center w-full border px-3 py-2 rounded-lg transition-colors text-sm"
                  style={{ 
                    borderColor: buttonColor,
                    color: buttonColor,
                    backgroundColor: 'transparent'
                  }}
                >
                  <Download size={16} className="mr-2" />
                  {getText("about_cv_label", isPt ? "Descarregar CV" : "Download CV")}
                </a>
              </div>
            </div>
            
            {/* Right column - Biography */}
            <div className="md:col-span-2">
              <div className="prose prose-sm max-w-none">
                {/* Short Bio - 4 parágrafos */}
                <div className="mb-8">
                  <h2 
                    className="font-playfair mb-2 text-lg"
                    style={{ color: titleColor }}
                  >
                    {getText("about_short_title", isPt ? "Biografia Curta" : "Short Biography")}
                  </h2>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_short_p1", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_short_p2", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_short_p3", "")}
                  </p>
                  <p className="text-sm mb-3" style={{ color: textColor }}>
                    {getText("about_short_p4", "")}
                  </p>
                  <a 
                    className="inline-flex items-center justify-center border px-2 py-1 rounded-lg text-xs"
                    style={{ 
                      borderColor: buttonColor,
                      color: buttonColor
                    }}
                  >
                    <Download size={12} className="mr-1" />
                    {getText("about_bio_label", isPt ? "Baixar Bio (PDF)" : "Download Bio (PDF)")}
                  </a>
                </div>
                
                {/* Full Bio - 7 parágrafos */}
                <div>
                  <h2 
                    className="font-playfair mb-2 text-lg"
                    style={{ color: titleColor }}
                  >
                    {getText("about_full_title", isPt ? "Biografia Completa" : "Full Biography")}
                  </h2>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p1", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p2", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p3", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p4", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p5", "")}
                  </p>
                  <p className="text-sm mb-2" style={{ color: textColor }}>
                    {getText("about_full_p6", "")}
                  </p>
                  <p className="text-sm mb-3" style={{ color: textColor }}>
                    {getText("about_full_p7", "")}
                  </p>
                  <a 
                    className="inline-flex items-center justify-center border px-2 py-1 rounded-lg text-xs"
                    style={{ 
                      borderColor: buttonColor,
                      color: buttonColor
                    }}
                  >
                    <Download size={12} className="mr-1" />
                    {getText("about_bio_label", isPt ? "Baixar Bio (PDF)" : "Download Bio (PDF)")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdminAboutSettings() {
  const [content, setContent] = useState<Record<string, SiteContent>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewLanguage, setPreviewLanguage] = useState<"pt" | "en">("pt");
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/site-content");
      const data: SiteContent[] = await response.json();
      
      const contentMap: Record<string, SiteContent> = {};
      data.forEach(item => {
        contentMap[item.key] = item;
      });

      DEFAULT_FIELDS.forEach(field => {
        if (!contentMap[field.key]) {
          contentMap[field.key] = {
            key: field.key,
            valuePt: field.defaultPt,
            valueEn: field.defaultEn,
            type: field.type
          };
        }
      });

      setContent(contentMap);
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao carregar conteúdo", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, lang: 'Pt' | 'En', value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [`value${lang}`]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const payload = Object.values(content).map(({ key, valuePt, valueEn, type }) => ({
        key, valuePt, valueEn, type
      }));
      
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error();

      import("@/lib/queryClient").then(({ queryClient }) => {
        queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      });

      toast({ title: "Sucesso", description: "Página Sobre atualizada com sucesso!" });
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao guardar as alterações", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  const textFields = DEFAULT_FIELDS.filter(f => f.type === "text" || f.type === "textarea");
  const colorFields = DEFAULT_FIELDS.filter(f => f.type === "color");
  const imageFields = DEFAULT_FIELDS.filter(f => f.type === "image");
  const fileFields = DEFAULT_FIELDS.filter(f => f.type === "file");

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Left Panel - Editor */}
      <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-auto transition-all duration-300`}>
        <div className="space-y-6 pr-4">
          <div className="flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-950 py-4 z-10">
            <div>
              <h1 className="text-2xl font-playfair font-bold">Editar Página Sobre</h1>
              <p className="text-sm text-muted-foreground">Personalize a página de biografia.</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(!showPreview)} 
                className="gap-2"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Ocultar" : "Preview"}
              </Button>
              <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Guardar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="textos" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="textos">Textos</TabsTrigger>
              <TabsTrigger value="imagem">Imagem</TabsTrigger>
              <TabsTrigger value="cores">Cores</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>
            
            {/* Textos Tab */}
            <TabsContent value="textos" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {textFields.map(field => (
                  <AccordionItem key={field.key} value={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg px-2">
                    <AccordionTrigger className="hover:no-underline px-3 font-semibold text-base">
                      {field.label}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold flex items-center gap-2">
                            <span className="w-5 h-3 bg-red-600 inline-block overflow-hidden relative rounded-sm">
                               <div className="absolute inset-0 w-2 h-full bg-green-600"></div>
                            </span>
                            Português
                          </label>
                          {field.type === "textarea" ? (
                            <Textarea 
                              value={content[field.key]?.valuePt || ""} 
                              onChange={e => handleChange(field.key, "Pt", e.target.value)}
                              rows={3}
                              className="text-sm"
                            />
                          ) : (
                            <Input 
                              value={content[field.key]?.valuePt || ""} 
                              onChange={e => handleChange(field.key, "Pt", e.target.value)}
                              className="text-sm"
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold flex items-center gap-2">
                            <span className="w-5 h-3 bg-blue-800 flex flex-col justify-between relative rounded-sm">
                              <div className="w-full h-1/3 bg-white"></div>
                              <div className="w-full h-1/3 bg-red-600"></div>
                              <div className="w-full h-1/3 bg-white"></div>
                            </span>
                            English
                          </label>
                          {field.type === "textarea" ? (
                            <Textarea 
                              value={content[field.key]?.valueEn || ""} 
                              onChange={e => handleChange(field.key, "En", e.target.value)}
                              rows={3}
                              className="text-sm"
                            />
                          ) : (
                            <Input 
                              value={content[field.key]?.valueEn || ""} 
                              onChange={e => handleChange(field.key, "En", e.target.value)}
                              className="text-sm"
                            />
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Imagem Tab */}
            <TabsContent value="imagem" className="space-y-4 mt-4">
              {imageFields.map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-3">{field.label}</h3>
                  <div className="space-y-3">
                    <Input 
                      value={content[field.key]?.valuePt || ""}
                      onChange={e => {
                        handleChange(field.key, "Pt", e.target.value);
                        handleChange(field.key, "En", e.target.value);
                      }}
                      className="text-sm"
                      placeholder="/attached_assets/..."
                    />
                    {content[field.key]?.valuePt && (
                      <div className="relative aspect-[3/4] max-w-xs rounded-md overflow-hidden bg-gray-100">
                        <img src={content[field.key]?.valuePt} alt="Preview" className="object-cover w-full h-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Cores Tab */}
            <TabsContent value="cores" className="space-y-4 mt-4">
              {colorFields.map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-3">{field.label}</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color"
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => {
                        handleChange(field.key, "Pt", e.target.value);
                        handleChange(field.key, "En", e.target.value);
                      }}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300"
                    />
                    <Input 
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => {
                        handleChange(field.key, "Pt", e.target.value);
                        handleChange(field.key, "En", e.target.value);
                      }}
                      className="text-sm w-28"
                      placeholder={field.defaultPt}
                    />
                    <div 
                      className="w-20 h-10 rounded border"
                      style={{ backgroundColor: content[field.key]?.valuePt || field.defaultPt }}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Documentos Tab */}
            <TabsContent value="documentos" className="space-y-4 mt-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Nota:</strong> Os ficheiros PDF devem estar na pasta <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">public/</code> do projeto. 
                  Introduza o caminho relativo (ex: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/cv-pt.pdf</code>).
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Portuguese Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <span className="w-5 h-3 bg-red-600 inline-block overflow-hidden relative rounded-sm">
                      <div className="absolute inset-0 w-2 h-full bg-green-600"></div>
                    </span>
                    Documentos em Português
                  </h3>
                  
                  {fileFields.filter(f => f.key.endsWith('_pt')).map(field => (
                    <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-3">
                      <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {field.label}
                      </label>
                      <Input 
                        value={content[field.key]?.valuePt || ""}
                        onChange={e => {
                          handleChange(field.key, "Pt", e.target.value);
                          handleChange(field.key, "En", e.target.value);
                        }}
                        className="text-sm mt-2"
                        placeholder="/documento.pdf"
                      />
                    </div>
                  ))}
                </div>
                
                {/* English Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-base flex items-center gap-2">
                    <span className="w-5 h-3 bg-blue-800 flex flex-col justify-between relative rounded-sm">
                      <div className="w-full h-1/3 bg-white"></div>
                      <div className="w-full h-1/3 bg-red-600"></div>
                      <div className="w-full h-1/3 bg-white"></div>
                    </span>
                    English Documents
                  </h3>
                  
                  {fileFields.filter(f => f.key.endsWith('_en')).map(field => (
                    <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-3">
                      <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {field.label}
                      </label>
                      <Input 
                        value={content[field.key]?.valuePt || ""}
                        onChange={e => {
                          handleChange(field.key, "Pt", e.target.value);
                          handleChange(field.key, "En", e.target.value);
                        }}
                        className="text-sm mt-2"
                        placeholder="/document.pdf"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      {showPreview && (
        <div className="w-1/2 flex flex-col border-l border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Preview em Tempo Real</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant={previewLanguage === "pt" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewLanguage("pt")}
                className="h-7 px-2 text-xs"
              >
                PT
              </Button>
              <Button
                variant={previewLanguage === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewLanguage("en")}
                className="h-7 px-2 text-xs"
              >
                EN
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden bg-white dark:bg-black rounded-b-lg">
            <div className="h-full overflow-auto">
              <AboutPreview content={content} language={previewLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
