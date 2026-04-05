import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Eye, EyeOff, Monitor } from "lucide-react";
import { HomePreview } from "@/components/HomePreview";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  { key: "home_hero_title", label: "Título Principal (Herói)", type: "text", defaultPt: "Tiago Soares Silva", defaultEn: "Tiago Soares Silva" },
  { key: "home_hero_subtitle", label: "Subtítulo", type: "text", defaultPt: "O som da emoção através das cordas do violino", defaultEn: "The sound of emotion through the strings of the violin" },
  { key: "home_hero_cta_text", label: "Texto do Botão (CTA)", type: "text", defaultPt: "Agendar uma Apresentação", defaultEn: "Book a Performance" },
  { key: "home_hero_cta_color", label: "Cor do Botão (CTA)", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  { key: "home_hero_image", label: "Imagem de Fundo Principal", type: "image", defaultPt: "/attached_assets/Tiago-Violino-87.JPG", defaultEn: "/attached_assets/Tiago-Violino-87.JPG" },
  { key: "home_about_p1", label: "Resumo Biografia - Parágrafo 1", type: "textarea", defaultPt: "O violinista Tiago Soares Silva é um intérprete versátil dedicado a apresentar tanto o repertório tradicional quanto a música contemporânea para plateias em todo o mundo. Sua visão artística combina excelência técnica com profunda expressão musical.", defaultEn: "Violinist Tiago Soares Silva is a versatile performer dedicated to presenting both traditional repertoire and contemporary music to audiences worldwide. His artistic vision combines technical excellence with profound musical expression." },
  { key: "home_about_p2", label: "Resumo Biografia - Parágrafo 2", type: "textarea", defaultPt: "Com apresentações em renomadas salas de concerto e festivais, Tiago estabeleceu-se como um intérprete cativante cujas performances fascinam pela profundidade emocional e abordagem ponderada da narrativa musical.", defaultEn: "With appearances at renowned concert halls and festivals, Tiago has established himself as a compelling interpreter whose performances captivate through their emotional depth and thoughtful approach to musical storytelling." },
  { key: "home_about_image", label: "Imagem Resumo Biografia", type: "image", defaultPt: "/attached_assets/Tiago-Violino-68.JPG", defaultEn: "/attached_assets/Tiago-Violino-68.JPG" },
];

export default function AdminHomeSettings() {
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

      // Garantir que todos os campos existem. Se não existirem na BD, 
      // usam os defaults reais do site para pré-visualização no input
      DEFAULT_FIELDS.forEach(field => {
        if (!contentMap[field.key]) {
          contentMap[field.key] = {
            key: field.key,
            valuePt: field.defaultPt,
            valueEn: field.defaultEn,
            type: field.type
          };
        } else {
           // Se existir na BD mas estiver vazio, recupera o default do site para nunca ficar vazio acidentalmente
           if (!contentMap[field.key].valuePt) contentMap[field.key].valuePt = field.defaultPt;
           if (!contentMap[field.key].valueEn) contentMap[field.key].valueEn = field.defaultEn;
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

      // Force invalidate the query client after successful save
      import("@/lib/queryClient").then(({ queryClient }) => {
        queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      });

      toast({ title: "Sucesso", description: "Página Inicial atualizada com sucesso!" });
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao guardar as alterações", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Left Panel - Editor */}
      <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-auto transition-all duration-300`}>
        <div className="space-y-6 pr-4">
          <div className="flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-950 py-4 z-10">
            <div>
              <h1 className="text-2xl font-playfair font-bold">Editar Página Inicial</h1>
              <p className="text-sm text-muted-foreground">Edite os textos e imagens. Veja as alterações em tempo real no preview.</p>
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
            <TabsList>
              <TabsTrigger value="textos">Textos</TabsTrigger>
              <TabsTrigger value="imagens">Imagens</TabsTrigger>
              <TabsTrigger value="estilos">Estilos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="textos" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {DEFAULT_FIELDS.filter(f => f.type !== "image" && f.type !== "color").map(field => (
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

            <TabsContent value="imagens" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {DEFAULT_FIELDS.filter(f => f.type === "image").map(field => (
                  <AccordionItem key={field.key} value={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg px-2">
                    <AccordionTrigger className="hover:no-underline px-3 font-semibold text-base">
                      {field.label}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold">URL da Imagem</label>
                          <Input 
                            value={content[field.key]?.valuePt || ""} 
                            onChange={e => {
                              handleChange(field.key, "Pt", e.target.value);
                              handleChange(field.key, "En", e.target.value);
                            }}
                            className="text-sm"
                            placeholder="/attached_assets/..."
                          />
                        </div>
                        {content[field.key]?.valuePt && (
                          <div className="relative aspect-video max-w-xs rounded-md overflow-hidden bg-gray-100">
                            <img src={content[field.key]?.valuePt} alt="Preview" className="object-cover w-full h-full" />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="estilos" className="space-y-4 mt-4">
              <div className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-base mb-4">Cor do Botão (CTA)</h3>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Selecionar Cor</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color"
                        value={content["home_hero_cta_color"]?.valuePt || "#6B2D3A"}
                        onChange={e => {
                          handleChange("home_hero_cta_color", "Pt", e.target.value);
                          handleChange("home_hero_cta_color", "En", e.target.value);
                        }}
                        className="w-12 h-10 rounded cursor-pointer border border-gray-300"
                      />
                      <Input 
                        value={content["home_hero_cta_color"]?.valuePt || "#6B2D3A"}
                        onChange={e => {
                          handleChange("home_hero_cta_color", "Pt", e.target.value);
                          handleChange("home_hero_cta_color", "En", e.target.value);
                        }}
                        className="text-sm w-28"
                        placeholder="#6B2D3A"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold block mb-2">Pré-visualização</label>
                    <button 
                      className="px-6 py-2 rounded text-white text-sm transition-colors"
                      style={{ backgroundColor: content["home_hero_cta_color"]?.valuePt || "#6B2D3A" }}
                    >
                      {content["home_hero_cta_text"]?.valuePt || "Agendar uma Apresentação"}
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      {showPreview && (
        <div className="w-1/2 flex flex-col border-l border-gray-200 dark:border-zinc-800">
          {/* Preview Header */}
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
          
          {/* Preview Content */}
          <div className="flex-1 overflow-hidden bg-white dark:bg-black rounded-b-lg">
            <div className="h-full overflow-auto">
              <HomePreview content={content} language={previewLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}