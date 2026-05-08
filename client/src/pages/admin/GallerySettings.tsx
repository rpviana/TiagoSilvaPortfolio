import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Eye, EyeOff, Plus, Trash2, Image as ImageIcon, Video, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";

type SiteContent = { key: string; valuePt: string; valueEn: string; type: string; };

const MAX_PHOTOS = 20;
const MAX_VIDEOS = 8;

const TEXT_FIELDS = [
  { key: "gallery_title", label: "Título da Página", type: "text", defaultPt: "Galeria", defaultEn: "Gallery" },
  { key: "gallery_description", label: "Descrição", type: "textarea", defaultPt: "Fotografias e vídeos de concertos e performances.", defaultEn: "Photos and videos from concerts and performances." },
  { key: "gallery_photos_section_title", label: "Título Secção Fotos", type: "text", defaultPt: "Fotografias", defaultEn: "Photos" },
  { key: "gallery_videos_section_title", label: "Título Secção Vídeos", type: "text", defaultPt: "Vídeos", defaultEn: "Videos" },
];

const COLOR_FIELDS = [
  { key: "gallery_bg_color", label: "Cor de Fundo", type: "color", defaultPt: "#f9fafb", defaultEn: "#f9fafb" },
  { key: "gallery_title_color", label: "Cor do Título", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
];

// Defaults — espelham o que está hardcoded em Gallery.tsx
const DEFAULT_PHOTOS = [
  "/attached_assets/Tiago-Violino-52.JPG",
  "/attached_assets/Tiago-Violino-54.JPG",
  "/attached_assets/Tiago-Violino-68.JPG",
  "/attached_assets/Tiago-Violino-87.JPG",
  "/attached_assets/Tiago-Violino-100.JPG",
  "/attached_assets/Tiago-Violino-36.JPG",
  "/attached_assets/Tiago-Violino-1.JPG",
  "/attached_assets/Tiago-Violino-2.JPG",
];

const DEFAULT_VIDEOS = [
  { url: "https://www.youtube.com/watch?v=twONMNOCuyc", titlePt: "Bartók 44 Duos", titleEn: "Bartók 44 Duos" },
  { url: "https://www.youtube.com/watch?v=JZEUUuhajDk", titlePt: "Bartók Violin Concerto No.2", titleEn: "Bartók Violin Concerto No.2" },
  { url: "https://www.youtube.com/watch?v=WwhcVKM-Ghs", titlePt: "Kurtág Segnale, Canzone e Fuga", titleEn: "Kurtág Segnale, Canzone e Fuga" },
  { url: "https://www.youtube.com/watch?v=iMsOmzrZCRI", titlePt: "Palazzo Violin Sonata", titleEn: "Palazzo Violin Sonata" },
];

function buildDefaultContent(): Record<string, SiteContent> {
  const map: Record<string, SiteContent> = {};
  [...TEXT_FIELDS, ...COLOR_FIELDS].forEach(f => {
    map[f.key] = { key: f.key, valuePt: f.defaultPt, valueEn: f.defaultEn, type: f.type };
  });
  return map;
}

// ── Live Preview ─────────────────────────────────────────────────────────────
function GalleryPreview({
  content, photos, videos, language,
}: {
  content: Record<string, SiteContent>;
  photos: string[];
  videos: { url: string; titlePt: string; titleEn: string }[];
  language: "pt" | "en";
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const get = (key: string, fb = "") => language === "pt" ? (content[key]?.valuePt || fb) : (content[key]?.valueEn || fb);

  const extractYtId = (url: string) => {
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/\s]{11})/);
    return m ? m[1] : null;
  };

  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: get("gallery_bg_color", "#f9fafb") }}>
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair font-bold mb-2" style={{ color: get("gallery_title_color", "#6B2D3A") }}>
            {get("gallery_title", "Galeria")}
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">{get("gallery_description")}</p>
        </div>

        {/* Photos - uses real gallery-grid CSS classes */}
        {photos.filter(Boolean).length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-playfair font-semibold mb-4" style={{ color: get("gallery_title_color", "#6B2D3A") }}>
              {get("gallery_photos_section_title", "Fotografias")}
            </h2>
            <div className="gallery-grid">
              {photos.filter(Boolean).map((src, i) => (
                <div key={i} className="gallery-item" onClick={() => setLightbox(src)}>
                  <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {videos.filter(v => v.url).length > 0 && (
          <div>
            <h2 className="text-xl font-playfair font-semibold mb-4" style={{ color: get("gallery_title_color", "#6B2D3A") }}>
              {get("gallery_videos_section_title", "Vídeos")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.filter(v => v.url).map((v, i) => {
                const ytId = extractYtId(v.url);
                return (
                  <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="aspect-video">
                      {ytId ? (
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${ytId}`} title={language === "pt" ? v.titlePt : v.titleEn} frameBorder="0" allowFullScreen />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">URL inválido</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold" style={{ color: get("gallery_title_color", "#6B2D3A") }}>
                        {language === "pt" ? v.titlePt : v.titleEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.div className="relative max-w-3xl max-h-[85vh]" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()}>
              <img src={lightbox} alt="" className="max-w-full max-h-[85vh] object-contain rounded" />
              <button className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5" onClick={() => setLightbox(null)}><X size={16} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminGallerySettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<Record<string, SiteContent>>(buildDefaultContent());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewLanguage, setPreviewLanguage] = useState<"pt" | "en">("pt");
  const [activeTab, setActiveTab] = useState("photos");

  // Photos: array of URLs stored as gallery_photo_1 … gallery_photo_20
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  // Videos: stored as gallery_video_1_url, gallery_video_1_title_pt, gallery_video_1_title_en
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const res = await fetch("/api/site-content");
      const data: SiteContent[] = await res.json();
      const map: Record<string, SiteContent> = buildDefaultContent();
      data.forEach(item => { map[item.key] = item; });

      setContent(map);

      // Rebuild photos array — fall back to site defaults if nothing saved yet
      const savedPhotos: string[] = [];
      for (let i = 1; i <= MAX_PHOTOS; i++) {
        const val = map[`gallery_photo_${i}`]?.valuePt || "";
        if (val) savedPhotos.push(val);
      }
      setPhotos(savedPhotos.length > 0 ? savedPhotos : DEFAULT_PHOTOS);

      // Rebuild videos array — fall back to site defaults if nothing saved yet
      const savedVideos: { url: string; titlePt: string; titleEn: string }[] = [];
      for (let i = 1; i <= MAX_VIDEOS; i++) {
        const url = map[`gallery_video_${i}_url`]?.valuePt || "";
        if (url) {
          savedVideos.push({
            url,
            titlePt: map[`gallery_video_${i}_title_pt`]?.valuePt || "",
            titleEn: map[`gallery_video_${i}_title_en`]?.valuePt || "",
          });
        }
      }
      setVideos(savedVideos.length > 0 ? savedVideos : DEFAULT_VIDEOS);
    } catch {
      toast({ title: "Erro", description: "Falha ao carregar conteúdo", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (key: string, lang: "Pt" | "En", value: string) => {
    setContent(prev => ({ ...prev, [key]: { ...prev[key], key, type: prev[key]?.type || "text", [`value${lang}`]: value } }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");

      // Build siteContent entries from photos and videos
      const photoEntries: SiteContent[] = photos.map((url, i) => ({
        key: `gallery_photo_${i + 1}`, valuePt: url, valueEn: url, type: "image"
      }));
      const videoEntries: SiteContent[] = [];
      videos.forEach((v, i) => {
        videoEntries.push({ key: `gallery_video_${i + 1}_url`, valuePt: v.url, valueEn: v.url, type: "url" });
        videoEntries.push({ key: `gallery_video_${i + 1}_title_pt`, valuePt: v.titlePt, valueEn: v.titlePt, type: "text" });
        videoEntries.push({ key: `gallery_video_${i + 1}_title_en`, valuePt: v.titleEn, valueEn: v.titleEn, type: "text" });
      });

      const payload = [
        ...Object.values(content).map(({ key, valuePt, valueEn, type }) => ({ key, valuePt, valueEn, type })),
        ...photoEntries,
        ...videoEntries,
      ];

      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      // Invalidar cache para que a página pública da galeria recarregue os novos dados
      await queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({ title: "Sucesso", description: "Galeria atualizada com sucesso!" });
    } catch {
      toast({ title: "Erro", description: "Falha ao guardar", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)]">
      {/* Editor Panel */}
      <div className={`${showPreview ? "lg:w-1/2" : ""} w-full overflow-auto transition-all duration-300`}>
        <div className="space-y-6 pr-0 lg:pr-4">
          {/* Sticky Header */}
          <div className="flex flex-wrap justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-950 py-4 z-10 gap-2">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Editar Galeria</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Gerencie fotos, vídeos e conteúdos da galeria.</p>
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="photos"><ImageIcon className="w-3 h-3 mr-1" />Fotos</TabsTrigger>
              <TabsTrigger value="videos"><Video className="w-3 h-3 mr-1" />Vídeos</TabsTrigger>
              <TabsTrigger value="texts">Textos</TabsTrigger>
              <TabsTrigger value="colors">Cores</TabsTrigger>
            </TabsList>

            {/* ── PHOTOS TAB ── */}
            <TabsContent value="photos" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{photos.filter(Boolean).length} foto(s) adicionada(s)</p>
                {photos.length < MAX_PHOTOS && (
                  <Button size="sm" variant="outline" onClick={() => setPhotos(p => [...p, ""])}>
                    <Plus className="w-4 h-4 mr-1" /> Adicionar Foto
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {photos.map((url, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-muted-foreground bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">Foto {i + 1}</span>
                      <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto text-red-500 hover:text-red-700"
                        onClick={() => setPhotos(p => p.filter((_, idx) => idx !== i))}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <ImageUploader
                      value={url}
                      onChange={newUrl => setPhotos(p => { const n = [...p]; n[i] = newUrl; return n; })}
                      placeholder="/attached_assets/foto.jpg"
                    />
                  </div>
                ))}
              </div>

              {photos.length === 0 && (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Sem fotos. Clique em "Adicionar Foto".</p>
                </div>
              )}
            </TabsContent>

            {/* ── VIDEOS TAB ── */}
            <TabsContent value="videos" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{videos.filter(v => v.url).length} vídeo(s) adicionado(s)</p>
                {videos.length < MAX_VIDEOS && (
                  <Button size="sm" variant="outline" onClick={() => setVideos(v => [...v, { url: "", titlePt: "", titleEn: "" }])}>
                    <Plus className="w-4 h-4 mr-1" /> Adicionar Vídeo
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {videos.map((v, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-muted-foreground bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">Vídeo {i + 1}</span>
                      <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto text-red-500 hover:text-red-700"
                        onClick={() => setVideos(vs => vs.filter((_, idx) => idx !== i))}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">URL YouTube</label>
                        <Input value={v.url} onChange={e => setVideos(vs => { const n = [...vs]; n[i] = { ...n[i], url: e.target.value }; return n; })}
                          placeholder="https://www.youtube.com/watch?v=..." className="text-sm mt-1" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">🇵🇹 Título PT</label>
                          <Input value={v.titlePt} onChange={e => setVideos(vs => { const n = [...vs]; n[i] = { ...n[i], titlePt: e.target.value }; return n; })}
                            placeholder="Título em Português" className="text-sm mt-1" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">🇬🇧 Title EN</label>
                          <Input value={v.titleEn} onChange={e => setVideos(vs => { const n = [...vs]; n[i] = { ...n[i], titleEn: e.target.value }; return n; })}
                            placeholder="Title in English" className="text-sm mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {videos.length === 0 && (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                  <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Sem vídeos. Clique em "Adicionar Vídeo".</p>
                </div>
              )}
            </TabsContent>

            {/* ── TEXTS TAB ── */}
            <TabsContent value="texts" className="space-y-4 mt-4">
              {TEXT_FIELDS.map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-3">{field.label}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">🇵🇹 Português</label>
                      {field.type === "textarea" ? (
                        <Textarea value={content[field.key]?.valuePt || ""} onChange={e => handleContentChange(field.key, "Pt", e.target.value)} rows={3} className="text-sm" />
                      ) : (
                        <Input value={content[field.key]?.valuePt || ""} onChange={e => handleContentChange(field.key, "Pt", e.target.value)} className="text-sm" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">🇬🇧 English</label>
                      {field.type === "textarea" ? (
                        <Textarea value={content[field.key]?.valueEn || ""} onChange={e => handleContentChange(field.key, "En", e.target.value)} rows={3} className="text-sm" />
                      ) : (
                        <Input value={content[field.key]?.valueEn || ""} onChange={e => handleContentChange(field.key, "En", e.target.value)} className="text-sm" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* ── COLORS TAB ── */}
            <TabsContent value="colors" className="space-y-4 mt-4">
              {COLOR_FIELDS.map(field => (
                <div key={field.key} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-3">{field.label}</h3>
                  <div className="flex items-center gap-3">
                    <input type="color"
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => { handleContentChange(field.key, "Pt", e.target.value); handleContentChange(field.key, "En", e.target.value); }}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300" />
                    <Input
                      value={content[field.key]?.valuePt || field.defaultPt}
                      onChange={e => { handleContentChange(field.key, "Pt", e.target.value); handleContentChange(field.key, "En", e.target.value); }}
                      className="text-sm w-32" placeholder={field.defaultPt} />
                    <div className="w-10 h-10 rounded border" style={{ backgroundColor: content[field.key]?.valuePt || field.defaultPt }} />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Preview Panel */}
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
          <div className="flex-1 overflow-hidden bg-white dark:bg-black rounded-b-lg">
            <div className="h-full overflow-auto">
              <GalleryPreview content={content} photos={photos} videos={videos} language={previewLanguage} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
