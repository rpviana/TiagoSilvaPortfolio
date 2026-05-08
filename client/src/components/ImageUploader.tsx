import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, Link as LinkIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  /** If true, both PT and EN will update together (single image shared) */
  singleLang?: boolean;
}

export function ImageUploader({ value, onChange, label, placeholder }: ImageUploaderProps) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload falhou");
      const { url } = await res.json();
      onChange(url);
      toast({ title: "Upload concluído", description: "Imagem carregada com sucesso." });
    } catch {
      toast({ title: "Erro", description: "Falha ao carregar imagem.", variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-muted-foreground">{label}</label>}

      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-md w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
            mode === "upload" ? "bg-white dark:bg-zinc-700 shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="w-3 h-3" /> Carregar ficheiro
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
            mode === "url" ? "bg-white dark:bg-zinc-700 shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LinkIcon className="w-3 h-3" /> URL
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          {/* Drop zone / file button */}
          <div
            className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-4 cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground text-center">
                  Clica para escolher uma imagem<br />
                  <span className="text-[10px]">JPEG, PNG, WebP · máx. 20MB</span>
                </p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || "/attached_assets/..."}
          className="text-sm"
        />
      )}

      {/* Preview */}
      {value && (
        <div className="relative group w-full max-w-xs">
          <img
            src={value}
            alt="Preview"
            className="w-full h-32 object-cover rounded-md border border-gray-200 dark:border-zinc-700"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remover imagem"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
