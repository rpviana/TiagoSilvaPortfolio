import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Eye, EyeOff, Monitor, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  // Textos
  { key: "footer_title", label: "Título", type: "text", defaultPt: "Tiago Soares Silva", defaultEn: "Tiago Soares Silva" },
  { key: "footer_description", label: "Descrição", type: "textarea", defaultPt: "Violinista profissional dedicado à música clássica e contemporânea, partilhando a beleza da música através de performances memoráveis.", defaultEn: "Professional violinist dedicated to classical and contemporary music, sharing the beauty of music through memorable performances." },
  { key: "footer_copyright", label: "Texto Copyright", type: "text", defaultPt: "Todos os direitos reservados.", defaultEn: "All rights reserved." },
  
  // Cores
  { key: "footer_bg_color", label: "Cor de Fundo", type: "color", defaultPt: "#111827", defaultEn: "#111827" },
  { key: "footer_text_color", label: "Cor do Texto Principal", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "footer_text_secondary_color", label: "Cor do Texto Secundário", type: "color", defaultPt: "#9CA3AF", defaultEn: "#9CA3AF" },
  
  // Redes Sociais
  { key: "footer_facebook_url", label: "Facebook URL", type: "url", defaultPt: "https://www.facebook.com/tiago.soaressilva.arts", defaultEn: "https://www.facebook.com/tiago.soaressilva.arts" },
  { key: "footer_instagram_url", label: "Instagram URL", type: "url", defaultPt: "https://www.instagram.com/tiagosilva_violin/", defaultEn: "https://www.instagram.com/tiagosilva_violin/" },
  { key: "footer_linkedin_url", label: "LinkedIn URL", type: "url", defaultPt: "https://www.linkedin.com/in/tiago-soares-silva-violin", defaultEn: "https://www.linkedin.com/in/tiago-soares-silva-violin" },
  { key: "footer_youtube_url", label: "YouTube URL", type: "url", defaultPt: "https://www.youtube.com/@tiagosoaressilva7056", defaultEn: "https://www.youtube.com/@tiagosoaressilva7056" },
  
  // Contacto
  { key: "footer_email", label: "Email", type: "text", defaultPt: "tiagosilva.05.2000@gmail.com", defaultEn: "tiagosilva.05.2000@gmail.com" },
  { key: "footer_phone", label: "Telefone", type: "text", defaultPt: "+44 (0) 778 473 0680", defaultEn: "+44 (0) 778 473 0680" },
  { key: "footer_whatsapp_url", label: "WhatsApp Link", type: "url", defaultPt: "https://wa.me/447784730680", defaultEn: "https://wa.me/447784730680" },
];

function FooterPreview({ content, language }: { content: Record<string, SiteContent>; language: "pt" | "en" }) {
  const isPt = language === "pt";
  const currentYear = new Date().getFullYear();

  const getText = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return isPt ? content[key].valuePt : content[key].valueEn;
  };

  const getColor = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  const getUrl = (key: string, fallback: string) => {
    if (!content || !content[key]) return fallback;
    return content[key].valuePt || fallback;
  };

  return (
    <div className="h-full overflow-auto bg-gray-200">
      {/* Page content placeholder */}
      <div className="p-6 space-y-4 min-h-[200px]">
        <div className="bg-gray-300 h-32 rounded animate-pulse"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      </div>
      
      {/* Footer Preview */}
      <footer 
        className="py-8 px-6"
        style={{ backgroundColor: getColor("footer_bg_color", "#111827") }}
      >
        <div className="space-y-6">
          {/* Top section */}
          <div className="grid grid-cols-3 gap-4">
            {/* Brand */}
            <div className="col-span-2">
              <h3 
                className="text-base font-playfair font-bold mb-2"
                style={{ color: getColor("footer_text_color", "#ffffff") }}
              >
                {getText("footer_title", "Tiago Soares Silva")}
              </h3>
              <p 
                className="text-xs line-clamp-2"
                style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }}
              >
                {getText("footer_description", "Violinista profissional...")}
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-3 mt-3">
                {getUrl("footer_facebook_url", "") && (
                  <Facebook className="w-4 h-4" style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }} />
                )}
                {getUrl("footer_instagram_url", "") && (
                  <Instagram className="w-4 h-4" style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }} />
                )}
                {getUrl("footer_linkedin_url", "") && (
                  <Linkedin className="w-4 h-4" style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }} />
                )}
                {getUrl("footer_youtube_url", "") && (
                  <Youtube className="w-4 h-4" style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }} />
                )}
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h4 
                className="text-sm font-bold mb-2"
                style={{ color: getColor("footer_text_color", "#ffffff") }}
              >
                {isPt ? "Contacto" : "Contact"}
              </h4>
              <div className="space-y-1">
                <p 
                  className="text-xs truncate"
                  style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }}
                >
                  {getText("footer_email", "email@example.com")}
                </p>
                <p 
                  className="text-xs"
                  style={{ color: getColor("footer_text_secondary_color", "#9CA3AF") }}
                >
                  {getText("footer_phone", "+44 000 000 0000")}
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div 
            className="border-t pt-4 text-xs"
            style={{ 
              borderColor: getColor("footer_text_secondary_color", "#9CA3AF") + "40",
              color: getColor("footer_text_secondary_color", "#9CA3AF") 
            }}
          >
            © {currentYear} {getText("footer_title", "Tiago Soares Silva")}. {getText("footer_copyright", "Todos os direitos reservados.")}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function AdminFooterSettings() {
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

      toast({ title: "Sucesso", description: "Footer atualizado com sucesso!" });
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
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)]">
      {/* Left Panel - Editor */}
      <div className={`${showPreview ? 'lg:w-1/2' : ''} w-full overflow-auto transition-all duration-300`}>
        <div className="space-y-6 pr-4">
          <div className="flex flex-wrap justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-950 py-4 z-10 gap-2">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Editar Footer</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Personalize o rodapé do site.</p>
            </div>
            <div className="flex gap-2 shrink-0">
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
              <TabsTrigger value="cores">Cores</TabsTrigger>
              <TabsTrigger value="redes">Redes Sociais</TabsTrigger>
              <TabsTrigger value="contacto">Contacto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="textos" className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {DEFAULT_FIELDS.filter(f => f.type === "text" || f.type === "textarea").filter(f => !f.key.includes("email") && !f.key.includes("phone")).map(field => (
                  <AccordionItem key={field.key} value={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg px-2">
                    <AccordionTrigger className="hover:no-underline px-3 font-semibold text-base">
                      {field.label}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <TabsContent value="cores" className="space-y-4 mt-4">
              {DEFAULT_FIELDS.filter(f => f.type === "color").map(field => (
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

            <TabsContent value="redes" className="space-y-4 mt-4">
              {DEFAULT_FIELDS.filter(f => f.type === "url" && !f.key.includes("whatsapp")).map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
                    {field.key.includes("facebook") && <Facebook className="w-4 h-4" />}
                    {field.key.includes("instagram") && <Instagram className="w-4 h-4" />}
                    {field.key.includes("linkedin") && <Linkedin className="w-4 h-4" />}
                    {field.key.includes("youtube") && <Youtube className="w-4 h-4" />}
                    {field.label}
                  </h3>
                  <Input 
                    value={content[field.key]?.valuePt || ""}
                    onChange={e => {
                      handleChange(field.key, "Pt", e.target.value);
                      handleChange(field.key, "En", e.target.value);
                    }}
                    className="text-sm"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">Deixe vazio para ocultar este ícone</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="contacto" className="space-y-4 mt-4">
              {DEFAULT_FIELDS.filter(f => f.key.includes("email") || f.key.includes("phone") || f.key.includes("whatsapp")).map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold text-base mb-3">{field.label}</h3>
                  <Input 
                    value={content[field.key]?.valuePt || ""}
                    onChange={e => {
                      handleChange(field.key, "Pt", e.target.value);
                      handleChange(field.key, "En", e.target.value);
                    }}
                    className="text-sm"
                    placeholder={field.defaultPt}
                  />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      {showPreview && (
        <div className="w-full lg:w-1/2 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 min-h-[300px] lg:min-h-0">
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
              <FooterPreview content={content} language={previewLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
