import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save } from "lucide-react";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  { key: "home_hero_title", label: "Título Principal (Herói)", type: "text", defaultPt: "Tiago Soares Silva", defaultEn: "Tiago Soares Silva" },
  { key: "home_hero_subtitle", label: "Subtítulo", type: "text", defaultPt: "O som da emoção através das cordas do violino", defaultEn: "The sound of emotion through the strings of the violin" },
  { key: "home_hero_image", label: "Imagem de Fundo Principal", type: "image", defaultPt: "/attached_assets/Tiago-Violino-87.JPG", defaultEn: "/attached_assets/Tiago-Violino-87.JPG" },
  { key: "home_about_p1", label: "Resumo Biografia - Parágrafo 1", type: "textarea", defaultPt: "O violinista Tiago Soares Silva é um intérprete versátil dedicado a apresentar tanto o repertório tradicional quanto a música contemporânea para plateias em todo o mundo. Sua visão artística combina excelência técnica com profunda expressão musical.", defaultEn: "Violinist Tiago Soares Silva is a versatile performer dedicated to presenting both traditional repertoire and contemporary music to audiences worldwide. His artistic vision combines technical excellence with profound musical expression." },
  { key: "home_about_p2", label: "Resumo Biografia - Parágrafo 2", type: "textarea", defaultPt: "Com apresentações em renomadas salas de concerto e festivais, Tiago estabeleceu-se como um intérprete cativante cujas performances fascinam pela profundidade emocional e abordagem ponderada da narrativa musical.", defaultEn: "With appearances at renowned concert halls and festivals, Tiago has established himself as a compelling interpreter whose performances captivate through their emotional depth and thoughtful approach to musical storytelling." },
  { key: "home_about_image", label: "Imagem Resumo Biografia", type: "image", defaultPt: "/attached_assets/Tiago-Violino-68.JPG", defaultEn: "/attached_assets/Tiago-Violino-68.JPG" },
  { key: "home_about_quote", label: "Citação", type: "textarea", defaultPt: "A música não é o que eu faço, é quem eu sou.", defaultEn: "Music is not what I do, it is who I am." }
];

export default function AdminHomeSettings() {
  const [content, setContent] = useState<Record<string, SiteContent>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold">Editar Página Inicial</h1>
          <p className="text-muted-foreground">Altere os textos e imagens de destaque da Home.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
          <Save className="w-4 h-4" /> Guardar Alterações
        </Button>
      </div>

      <Tabs defaultValue="textos" className="w-full">
        <TabsList>
          <TabsTrigger value="textos">Textos</TabsTrigger>
          <TabsTrigger value="imagens">Imagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="textos" className="space-y-6 mt-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {DEFAULT_FIELDS.filter(f => f.type !== "image").map(field => (
              <AccordionItem key={field.key} value={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg px-2">
                <AccordionTrigger className="hover:no-underline px-4 font-semibold text-lg">
                  {field.label}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground mb-4">Esta tradução será refletida publicamente no site.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-6 h-4 bg-red-600 inline-block overflow-hidden relative">
                           {/* PT Flag */}
                           <div className="absolute inset-0 w-2 h-full bg-green-600"></div>
                        </span>
                        Português
                      </label>
                      {field.type === "textarea" ? (
                        <Textarea 
                          value={content[field.key]?.valuePt || ""} 
                          onChange={e => handleChange(field.key, "Pt", e.target.value)} 
                          rows={4}
                        />
                      ) : (
                        <Input 
                          value={content[field.key]?.valuePt || ""} 
                          onChange={e => handleChange(field.key, "Pt", e.target.value)} 
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-6 h-4 bg-blue-800 flex flex-col justify-between relative">
                          {/* EN Flag rough */}
                          <div className="w-full h-1/3 bg-white"></div>
                          <div className="w-full h-1/3 bg-red-600"></div>
                          <div className="w-full h-1/3 bg-white"></div>
                        </span>
                        Inglês (English)
                      </label>
                      {field.type === "textarea" ? (
                        <Textarea 
                          value={content[field.key]?.valueEn || ""} 
                          onChange={e => handleChange(field.key, "En", e.target.value)} 
                          rows={4}
                        />
                      ) : (
                        <Input 
                          value={content[field.key]?.valueEn || ""} 
                          onChange={e => handleChange(field.key, "En", e.target.value)} 
                        />
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="imagens" className="space-y-6 mt-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {DEFAULT_FIELDS.filter(f => f.type === "image").map(field => (
              <AccordionItem key={field.key} value={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg px-2">
                <AccordionTrigger className="hover:no-underline px-4 font-semibold text-lg">
                  {field.label}
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <p className="text-sm text-muted-foreground mb-4">Coloque o link ou caminho da imagem. A mesma imagem será usada em ambos os idiomas.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Only needs to show one input if it's the same, but schema has PT/EN */}
                     <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Caminho da Imagem (URL ou /attached_assets/...)</label>
                        <Input 
                          value={content[field.key]?.valuePt || ""} 
                          onChange={e => {
                            handleChange(field.key, "Pt", e.target.value);
                            handleChange(field.key, "En", e.target.value); // keep them synced for images
                          }} 
                        />
                      </div>
                      {content[field.key]?.valuePt && (
                        <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100">
                          <img src={content[field.key]?.valuePt} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                      )}
                     </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}