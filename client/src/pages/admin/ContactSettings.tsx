import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Eye, EyeOff, Monitor, Mail, Phone, Share2 } from "lucide-react";

type SiteContent = { key: string; valuePt: string; valueEn: string; type: string };

const TEXT_FIELDS = [
  { key: "contact_title", label: "Título da Página", type: "text", defaultPt: "Contacto", defaultEn: "Contact" },
  { key: "contact_get_in_touch_title", label: "Subtítulo (Get in Touch)", type: "text", defaultPt: "Entre em Contacto", defaultEn: "Get in Touch" },
  { key: "contact_intro_text", label: "Texto Introdutório", type: "textarea", defaultPt: "Estou disponível para apresentações a solo, colaborações em câmara e projetos especiais. Entre em contacto para mais informações sobre disponibilidade e cachets.", defaultEn: "I am available for solo performances, chamber collaborations and special projects. Get in touch for more information about availability and fees." },
  { key: "contact_form_title", label: "Título do Formulário", type: "text", defaultPt: "Envie uma Mensagem", defaultEn: "Send a Message" },
  { key: "contact_form_name_label", label: "Label - Nome", type: "text", defaultPt: "Nome", defaultEn: "Name" },
  { key: "contact_form_email_label", label: "Label - Email", type: "text", defaultPt: "Email", defaultEn: "Email" },
  { key: "contact_form_subject_label", label: "Label - Assunto", type: "text", defaultPt: "Assunto", defaultEn: "Subject" },
  { key: "contact_form_message_label", label: "Label - Mensagem", type: "text", defaultPt: "Mensagem", defaultEn: "Message" },
  { key: "contact_form_submit_label", label: "Botão Enviar", type: "text", defaultPt: "Enviar Mensagem", defaultEn: "Send Message" },
];

const CONTACT_FIELDS = [
  { key: "contact_email", label: "Email de Contacto", type: "text", defaultPt: "tiagosilva.05.2000@gmail.com", defaultEn: "tiagosilva.05.2000@gmail.com" },
  { key: "contact_whatsapp_display", label: "WhatsApp (texto visível)", type: "text", defaultPt: "+44 (0) 778 473 0680", defaultEn: "+44 (0) 778 473 0680" },
  { key: "contact_whatsapp_link", label: "WhatsApp (link wa.me)", type: "text", defaultPt: "https://wa.me/447784730680", defaultEn: "https://wa.me/447784730680" },
];

const SOCIAL_FIELDS = [
  { key: "contact_facebook_url", label: "Facebook URL", type: "text", defaultPt: "https://www.facebook.com/tiago.soaressilva.arts", defaultEn: "https://www.facebook.com/tiago.soaressilva.arts" },
  { key: "contact_instagram_url", label: "Instagram URL", type: "text", defaultPt: "https://www.instagram.com/tiagosilva_violin/", defaultEn: "https://www.instagram.com/tiagosilva_violin/" },
  { key: "contact_linkedin_url", label: "LinkedIn URL", type: "text", defaultPt: "https://www.linkedin.com/in/tiago-soares-silva-violin", defaultEn: "https://www.linkedin.com/in/tiago-soares-silva-violin" },
  { key: "contact_youtube_url", label: "YouTube URL", type: "text", defaultPt: "https://www.youtube.com/@tiagosoaressilva7056", defaultEn: "https://www.youtube.com/@tiagosoaressilva7056" },
];

const COLOR_FIELDS = [
  { key: "contact_bg_color", label: "Cor de Fundo da Secção", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "contact_title_color", label: "Cor do Título / Destaque", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  { key: "contact_btn_color", label: "Cor do Botão Enviar", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
];

const ALL_FIELDS = [...TEXT_FIELDS, ...CONTACT_FIELDS, ...SOCIAL_FIELDS, ...COLOR_FIELDS];

function buildDefault(): Record<string, SiteContent> {
  const m: Record<string, SiteContent> = {};
  ALL_FIELDS.forEach(f => { m[f.key] = { key: f.key, valuePt: f.defaultPt, valueEn: f.defaultEn, type: f.type }; });
  return m;
}

// ── Live Preview ──────────────────────────────────────────────────────────────
function ContactPreview({ content, language }: { content: Record<string, SiteContent>; language: "pt" | "en" }) {
  const get = (key: string, fb = "") => language === "pt" ? (content[key]?.valuePt || fb) : (content[key]?.valueEn || fb);
  const titleColor = get("contact_title_color", "#6B2D3A");
  const bgColor = get("contact_bg_color", "#ffffff");
  const btnColor = get("contact_btn_color", "#6B2D3A");

  const socials = [
    { icon: "fab fa-facebook-f", url: get("contact_facebook_url"), label: "Facebook" },
    { icon: "fab fa-instagram", url: get("contact_instagram_url"), label: "Instagram" },
    { icon: "fab fa-linkedin-in", url: get("contact_linkedin_url"), label: "LinkedIn" },
    { icon: "fab fa-youtube", url: get("contact_youtube_url"), label: "YouTube" },
  ].filter(s => s.url);

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-10 text-center" style={{ color: titleColor }}>
          {get("contact_title", "Contacto")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div>
            <h3 className="text-lg font-playfair font-bold mb-4" style={{ color: titleColor }}>
              {get("contact_get_in_touch_title", "Entre em Contacto")}
            </h3>
            <p className="text-gray-700 text-sm mb-6">{get("contact_intro_text")}</p>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <span style={{ color: titleColor }}><Mail className="w-4 h-4 mt-0.5" /></span>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Email</div>
                  <a href={`mailto:${get("contact_email")}`} className="text-sm text-gray-600 hover:underline break-all">
                    {get("contact_email", "tiagosilva.05.2000@gmail.com")}
                  </a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <span style={{ color: titleColor }}><Phone className="w-4 h-4 mt-0.5" /></span>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">WhatsApp</div>
                  <a href={get("contact_whatsapp_link")} className="text-sm text-gray-600 hover:underline">
                    {get("contact_whatsapp_display", "+44 (0) 778 473 0680")}
                  </a>
                </div>
              </div>
              {/* Socials */}
              {socials.length > 0 && (
                <div className="flex items-start gap-3">
                  <span style={{ color: titleColor }}><Share2 className="w-4 h-4 mt-0.5" /></span>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Redes Sociais</div>
                    <div className="flex gap-3">
                      {socials.map(s => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                          className="text-sm transition-colors hover:opacity-70" style={{ color: titleColor }}
                          aria-label={s.label}>
                          <i className={s.icon} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="text-base font-semibold mb-2" style={{ color: titleColor }}>
              {get("contact_form_title", "Envie uma Mensagem")}
            </h3>
            <div>
              <label className="text-xs font-medium text-gray-600">{get("contact_form_name_label", "Nome")}</label>
              <div className="mt-1 h-9 rounded border border-gray-300 bg-white" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">{get("contact_form_email_label", "Email")}</label>
              <div className="mt-1 h-9 rounded border border-gray-300 bg-white" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">{get("contact_form_subject_label", "Assunto")}</label>
              <div className="mt-1 h-9 rounded border border-gray-300 bg-white" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">{get("contact_form_message_label", "Mensagem")}</label>
              <div className="mt-1 h-20 rounded border border-gray-300 bg-white" />
            </div>
            <button className="w-full py-2 rounded text-white text-sm font-medium" style={{ backgroundColor: btnColor }}>
              {get("contact_form_submit_label", "Enviar Mensagem")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AdminContactSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<Record<string, SiteContent>>(buildDefault());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewLanguage, setPreviewLanguage] = useState<"pt" | "en">("pt");

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/site-content");
      const data: SiteContent[] = await res.json();
      const map = buildDefault();
      (Array.isArray(data) ? data : []).forEach(item => { map[item.key] = item; });
      setContent(map);
    } catch {
      toast({ title: "Erro", description: "Falha ao carregar conteúdo", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, lang: "Pt" | "En", value: string) => {
    setContent(prev => ({ ...prev, [key]: { ...prev[key], key, type: prev[key]?.type || "text", [`value${lang}`]: value } }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const payload = Object.values(content).map(({ key, valuePt, valueEn, type }) => ({ key, valuePt, valueEn, type }));
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      await queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({ title: "Sucesso", description: "Página de contacto atualizada!" });
    } catch {
      toast({ title: "Erro", description: "Falha ao guardar", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  const renderField = (field: typeof TEXT_FIELDS[0], section: "texts" | "contact" | "social") => (
    <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-3">{field.label}</h3>
      {section === "contact" ? (
        // contact fields: same value for PT and EN
        <Input
          value={content[field.key]?.valuePt || ""}
          onChange={e => { handleChange(field.key, "Pt", e.target.value); handleChange(field.key, "En", e.target.value); }}
          className="text-sm"
          placeholder={field.defaultPt}
        />
      ) : section === "social" ? (
        <Input
          value={content[field.key]?.valuePt || ""}
          onChange={e => { handleChange(field.key, "Pt", e.target.value); handleChange(field.key, "En", e.target.value); }}
          className="text-sm"
          placeholder={field.defaultPt}
          type="url"
        />
      ) : (
        // texts: separate PT / EN
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">🇵🇹 Português</label>
            {field.type === "textarea" ? (
              <Textarea value={content[field.key]?.valuePt || ""} onChange={e => handleChange(field.key, "Pt", e.target.value)} rows={3} className="text-sm" />
            ) : (
              <Input value={content[field.key]?.valuePt || ""} onChange={e => handleChange(field.key, "Pt", e.target.value)} className="text-sm" />
            )}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">🇬🇧 English</label>
            {field.type === "textarea" ? (
              <Textarea value={content[field.key]?.valueEn || ""} onChange={e => handleChange(field.key, "En", e.target.value)} rows={3} className="text-sm" />
            ) : (
              <Input value={content[field.key]?.valueEn || ""} onChange={e => handleChange(field.key, "En", e.target.value)} className="text-sm" />
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)]">
      {/* Editor */}
      <div className={`${showPreview ? "lg:w-1/2" : ""} w-full overflow-auto`}>
        <div className="space-y-6 pr-0 lg:pr-4">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-950 py-4 z-10 gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Editar Contacto</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Textos, contactos, redes sociais e cores da página de contacto.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="gap-2">
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Ocultar" : "Preview"}
              </Button>
              <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" /> Guardar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="texts">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="texts">Textos</TabsTrigger>
              <TabsTrigger value="contact">Contactos</TabsTrigger>
              <TabsTrigger value="social">Redes Sociais</TabsTrigger>
              <TabsTrigger value="colors">Cores</TabsTrigger>
            </TabsList>

            <TabsContent value="texts" className="space-y-4 mt-4">
              {TEXT_FIELDS.map(f => renderField(f, "texts"))}
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <p className="text-xs text-muted-foreground">Estes valores são iguais em PT e EN.</p>
              {CONTACT_FIELDS.map(f => renderField(f, "contact"))}
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-4">
              <p className="text-xs text-muted-foreground">URLs das redes sociais. Deixa vazio para esconder.</p>
              {SOCIAL_FIELDS.map(f => renderField(f, "social"))}
            </TabsContent>

            <TabsContent value="colors" className="space-y-4 mt-4">
              {COLOR_FIELDS.map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-3">{field.label}</h3>
                  <div className="flex items-center gap-3">
                    <input type="color"
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => { handleChange(field.key, "Pt", e.target.value); handleChange(field.key, "En", e.target.value); }}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300" />
                    <Input
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => { handleChange(field.key, "Pt", e.target.value); handleChange(field.key, "En", e.target.value); }}
                      className="text-sm w-32" />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: content[field.key]?.valuePt || field.defaultPt }} />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="w-full lg:w-1/2 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 min-h-[400px] lg:min-h-0">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Preview em Tempo Real</span>
            </div>
            <div className="flex gap-1">
              <Button variant={previewLanguage === "pt" ? "default" : "ghost"} size="sm" onClick={() => setPreviewLanguage("pt")} className="h-7 px-2 text-xs">PT</Button>
              <Button variant={previewLanguage === "en" ? "default" : "ghost"} size="sm" onClick={() => setPreviewLanguage("en")} className="h-7 px-2 text-xs">EN</Button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden bg-white rounded-b-lg">
            <div className="h-full overflow-auto">
              <ContactPreview content={content} language={previewLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
