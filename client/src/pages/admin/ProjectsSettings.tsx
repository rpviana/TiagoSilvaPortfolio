import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Save, Eye, EyeOff, Plus, Trash2, Edit2, 
  Link as LinkIcon, X, Image as ImageIcon, GripVertical, Palette, Check
} from "lucide-react";

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  // Cores (sincronizadas PT/EN)
  { key: "projects_bg_color", label: "Cor de Fundo", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "projects_title_color", label: "Cor do Título", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  { key: "projects_card_bg_color", label: "Cor do Card", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "projects_button_color", label: "Cor dos Botões", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  
  // Conteúdos (separados PT/EN)
  { key: "projects_title", label: "Título da Página", type: "text", defaultPt: "Projetos e Conjuntos", defaultEn: "Projects and Ensembles" },
  { key: "projects_description", label: "Descrição da Página", type: "textarea", defaultPt: "Descubra os vários projetos artísticos e conjuntos nos quais Tiago está envolvido, desde grupos de câmara até colaborações interdisciplinares.", defaultEn: "Discover the various artistic projects and ensembles in which Tiago is involved, from chamber groups to interdisciplinary collaborations." },
  
  { key: "projects_collaborative_title", label: "Título do Trabalho Colaborativo", type: "text", defaultPt: "Trabalho Colaborativo", defaultEn: "Collaborative Work" },
  { key: "projects_collaborative_text1", label: "Texto Colaborativo 1", type: "textarea", defaultPt: "Tiago Silva está sempre aberto a novas colaborações e projetos musicais.", defaultEn: "Tiago Silva is always open to new collaborations and musical projects." },
  { key: "projects_collaborative_text2", label: "Texto Colaborativo 2", type: "textarea", defaultPt: "Se está interessado em trabalhar com o Tiago, não hesite em contactá-lo.", defaultEn: "If you are interested in working with Tiago, please do not hesitate to contact him." },
  
  { key: "projects_past_collaborations_title", label: "Título Colaborações Passadas", type: "text", defaultPt: "Colaborações Passadas", defaultEn: "Past Collaborations" },
  { key: "projects_collaboration1", label: "Colaboração 1", type: "text", defaultPt: "Orquestra Sinfónica do Porto Casa da Música", defaultEn: "Porto Symphony Orchestra Casa da Música" },
  { key: "projects_collaboration2", label: "Colaboração 2", type: "text", defaultPt: "Orquestra Clássica do Centro", defaultEn: "Classical Orchestra of the Centre" },
  { key: "projects_collaboration3", label: "Colaboração 3", type: "text", defaultPt: "Ensemble de Câmara da ESMAE", defaultEn: "ESMAE Chamber Ensemble" },
  { key: "projects_collaboration4", label: "Colaboração 4", type: "text", defaultPt: "Projetos interdisciplinares com dança contemporânea", defaultEn: "Interdisciplinary projects with contemporary dance" },
  
  { key: "projects_repertoire_title", label: "Título do Repertório", type: "text", defaultPt: "Repertório", defaultEn: "Repertoire" },
  { key: "projects_repertoire_button", label: "Texto do Botão", type: "text", defaultPt: "Baixar Repertório (PDF)", defaultEn: "Download Repertoire (PDF)" },
];

interface ProjectTranslation {
  id?: number;
  projectId?: number;
  languageCode: string;
  title: string;
  description: string;
}

interface ProjectLink {
  id?: number;
  projectId?: number;
  type: string;
  url: string;
}

interface ProjectWithTranslations {
  id: number;
  imageUrl: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  translations: ProjectTranslation[];
  links: ProjectLink[];
}

interface NewProject {
  imageUrl: string;
  order: number;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  links: ProjectLink[];
}

const DEFAULT_NEW_PROJECT: NewProject = {
  imageUrl: "",
  order: 0,
  titlePt: "",
  titleEn: "",
  descriptionPt: "",
  descriptionEn: "",
  links: [],
};

function ProjectPreview({ 
  projects, 
  language,
  siteContent,
  newProject
}: { 
  projects: ProjectWithTranslations[]; 
  language: "pt" | "en";
  siteContent: Record<string, SiteContent>;
  newProject?: NewProject | null;
}) {
  const getContent = (key: string, fallback: string = '') => {
    const content = siteContent[key];
    return language === 'pt' ? (content?.valuePt || fallback) : (content?.valueEn || fallback);
  };

  const pageTitle = getContent('projects_title', 'Projetos e Conjuntos');
  const pageDescription = getContent('projects_description', 'Descubra os vários projetos artísticos.');
  const bgColor = getContent('projects_bg_color', '#ffffff');
  const titleColor = getContent('projects_title_color', '#6B2D3A');
  const collaborativeTitle = getContent('projects_collaborative_title', 'Trabalho Colaborativo');
  const collaborativeText1 = getContent('projects_collaborative_text1');
  const collaborativeText2 = getContent('projects_collaborative_text2');
  const pastCollabTitle = getContent('projects_past_collaborations_title', 'Colaborações Passadas');
  const collaboration1 = getContent('projects_collaboration1');
  const collaboration2 = getContent('projects_collaboration2');
  const collaboration3 = getContent('projects_collaboration3');
  const collaboration4 = getContent('projects_collaboration4');
  const repertoireTitle = getContent('projects_repertoire_title', 'Repertório');
  const repertoireButton = getContent('projects_repertoire_button', 'Baixar Repertório (PDF)');

  let previewProjects = [...projects];
  if (newProject && newProject.imageUrl && (newProject.titlePt || newProject.titleEn)) {
    const previewProjectData: ProjectWithTranslations = {
      id: -1,
      imageUrl: newProject.imageUrl,
      order: newProject.order,
      translations: [
        { languageCode: "pt", title: newProject.titlePt || "Novo Projeto", description: newProject.descriptionPt || "" },
        { languageCode: "en", title: newProject.titleEn || "New Project", description: newProject.descriptionEn || "" },
      ],
      links: newProject.links || []
    };
    previewProjects = [...projects, previewProjectData].sort((a, b) => a.order - b.order);
  }

  return (
    <div className="h-full overflow-auto p-4" style={{ backgroundColor: bgColor }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-playfair font-bold mb-2" style={{ color: titleColor }}>
          {pageTitle}
        </h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          {pageDescription}
        </p>
      </div>

      {previewProjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Nenhum projeto para mostrar
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {previewProjects.map((project) => {
            const translation = project.translations.find(t => t.languageCode === language) || project.translations[0];
            const isPreview = project.id === -1;
            
            if (!translation) return null;

            return (
              <div key={project.id} className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${isPreview ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
                {isPreview && (
                  <div className="absolute top-1 right-1 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full z-10">
                    Preview
                  </div>
                )}
                <img 
                  src={project.imageUrl} 
                  alt={translation.title}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-xs font-bold mb-1" style={{ color: titleColor }}>
                    {translation.title}
                  </h3>
                  <p className="text-[9px] text-gray-600 line-clamp-2">
                    {translation.description}
                  </p>
                  {project.links && project.links.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {project.links.map((link, idx) => (
                        <span key={idx} className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded">
                          {link.type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {collaborativeText1 && (
        <div className="mt-6">
          <h2 className="text-lg font-playfair font-bold mb-3" style={{ color: titleColor }}>
            {collaborativeTitle}
          </h2>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-[10px] space-y-2">
              {collaborativeText1 && <p>{collaborativeText1}</p>}
              {collaborativeText2 && <p>{collaborativeText2}</p>}
              
              {(collaboration1 || collaboration2 || collaboration3 || collaboration4) && (
                <>
                  <h3 className="font-semibold mt-3 mb-1" style={{ color: titleColor }}>
                    {pastCollabTitle}
                  </h3>
                  <ul className="list-disc pl-4 space-y-1">
                    {collaboration1 && <li>{collaboration1}</li>}
                    {collaboration2 && <li>{collaboration2}</li>}
                    {collaboration3 && <li>{collaboration3}</li>}
                    {collaboration4 && <li>{collaboration4}</li>}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <h2 className="text-base font-playfair font-semibold mb-2" style={{ color: titleColor }}>
          {repertoireTitle}
        </h2>
        <button
          className="text-[10px] px-4 py-2 rounded-full border-2 font-semibold"
          style={{ 
            borderColor: titleColor, 
            color: titleColor 
          }}
        >
          <i className="fas fa-download mr-1"></i>
          {repertoireButton}
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState<NewProject>(DEFAULT_NEW_PROJECT);
  const [showPreview, setShowPreview] = useState(true);
  const [previewLanguage, setPreviewLanguage] = useState<"pt" | "en">("pt");
  const [activeTab, setActiveTab] = useState("projects");
  const [contentLanguageTab, setContentLanguageTab] = useState("pt");
  const [siteContent, setSiteContent] = useState<Record<string, SiteContent>>({});
  const [isSaving, setIsSaving] = useState(false);

  const { data: projects = [], isLoading } = useQuery<ProjectWithTranslations[]>({
    queryKey: ["/api/projects"],
  });

  const { data: siteContentData = [], isLoading: isLoadingContent } = useQuery<SiteContent[]>({
    queryKey: ["/api/site-content"],
  });

  useEffect(() => {
    if (siteContentData.length > 0 && Object.keys(siteContent).length === 0) {
      const contentMap: Record<string, SiteContent> = {};
      siteContentData.forEach(item => {
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
      setSiteContent(contentMap);
    }
  }, [siteContentData]);

  const updateContentMutation = useMutation({
    mutationFn: async (content: SiteContent[]) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Failed to update content");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/site-content"] });
      toast({
        title: "Conteúdo atualizado!",
        description: "As alterações foram guardadas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao guardar as alterações.",
        variant: "destructive",
      });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (project: NewProject) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(project),
      });

      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setIsCreating(false);
      setNewProject(DEFAULT_NEW_PROJECT);
      toast({ title: "Projeto criado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao criar projeto", variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, project }: { id: number; project: NewProject }) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(project),
      });

      if (!response.ok) throw new Error("Failed to update project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setEditingId(null);
      setNewProject(DEFAULT_NEW_PROJECT);
      toast({ title: "Projeto atualizado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar projeto", variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete project");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Projeto eliminado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao eliminar projeto", variant: "destructive" });
    },
  });

  const handleContentChange = (key: string, field: 'valuePt' | 'valueEn', value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [key]: { 
        ...prev[key], 
        key: prev[key]?.key || key,
        type: prev[key]?.type || 'text',
        [field]: value 
      }
    }));
  };

  const handleSaveContent = async () => {
    setIsSaving(true);
    const contentArray = Object.values(siteContent);
    await updateContentMutation.mutateAsync(contentArray);
    setIsSaving(false);
  };

  const handleCreateProject = () => {
    if (!newProject.imageUrl || !newProject.titlePt || !newProject.titleEn) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a imagem e os títulos.",
        variant: "destructive",
      });
      return;
    }
    createProjectMutation.mutate(newProject);
  };

  const handleUpdateProject = (id: number, project: NewProject) => {
    if (!project.imageUrl || !project.titlePt || !project.titleEn) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a imagem e os títulos.",
        variant: "destructive",
      });
      return;
    }
    updateProjectMutation.mutate({ id, project });
  };

  const handleEditProject = (project: ProjectWithTranslations) => {
    const ptTranslation = project.translations.find(t => t.languageCode === "pt");
    const enTranslation = project.translations.find(t => t.languageCode === "en");

    setNewProject({
      imageUrl: project.imageUrl,
      order: project.order,
      titlePt: ptTranslation?.title || "",
      titleEn: enTranslation?.title || "",
      descriptionPt: ptTranslation?.description || "",
      descriptionEn: enTranslation?.description || "",
      links: project.links || [],
    });
    setEditingId(project.id);
    setIsCreating(false);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Tem a certeza que deseja eliminar este projeto?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setNewProject(DEFAULT_NEW_PROJECT);
  };

  const addLink = () => {
    setNewProject({
      ...newProject,
      links: [...newProject.links, { type: "website", url: "" }],
    });
  };

  const removeLink = (index: number) => {
    setNewProject({
      ...newProject,
      links: newProject.links.filter((_, i) => i !== index),
    });
  };

  const updateLink = (index: number, field: "type" | "url", value: string) => {
    const updatedLinks = [...newProject.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setNewProject({ ...newProject, links: updatedLinks });
  };

  if (isLoading || isLoadingContent) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Projetos</h1>
          <p className="text-muted-foreground mt-2">
            Adicione e edite os projetos do portfólio e personalize a página
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="sm"
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            Preview
          </Button>
          <Button onClick={handleSaveContent} disabled={isSaving} size="sm">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
            Guardar
          </Button>
        </div>
      </div>

      <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-6 min-h-[600px]`}>
        <div className="flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="projects">Projetos</TabsTrigger>
              <TabsTrigger value="styles">Estilos e Conteúdo</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              {(isCreating || editingId) && (
                <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">
                      {editingId ? "Editar Projeto" : "Novo Projeto"}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        <ImageIcon className="inline h-4 w-4 mr-2" />
                        URL da Imagem *
                      </label>
                      <Input
                        value={newProject.imageUrl}
                        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        <GripVertical className="inline h-4 w-4 mr-2" />
                        Ordem
                      </label>
                      <Input
                        type="number"
                        value={newProject.order}
                        onChange={(e) => setNewProject({ ...newProject, order: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Título (PT) *</label>
                        <Input
                          value={newProject.titlePt}
                          onChange={(e) => setNewProject({ ...newProject, titlePt: e.target.value })}
                          placeholder="Título do projeto"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Título (EN) *</label>
                        <Input
                          value={newProject.titleEn}
                          onChange={(e) => setNewProject({ ...newProject, titleEn: e.target.value })}
                          placeholder="Project title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Descrição (PT) *</label>
                        <Textarea
                          value={newProject.descriptionPt}
                          onChange={(e) => setNewProject({ ...newProject, descriptionPt: e.target.value })}
                          placeholder="Descrição do projeto"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Descrição (EN) *</label>
                        <Textarea
                          value={newProject.descriptionEn}
                          onChange={(e) => setNewProject({ ...newProject, descriptionEn: e.target.value })}
                          placeholder="Project description"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">
                          <LinkIcon className="inline h-4 w-4 mr-2" />
                          Links
                        </label>
                        <Button type="button" size="sm" variant="outline" onClick={addLink}>
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar Link
                        </Button>
                      </div>

                      {newProject.links.map((link, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <select
                            value={link.type}
                            onChange={(e) => updateLink(index, "type", e.target.value)}
                            className="px-3 py-2 border rounded-md"
                          >
                            <option value="website">Website</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                          </select>
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(index, "url", e.target.value)}
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button type="button" size="icon" variant="destructive" onClick={() => removeLink(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                      <Button 
                        onClick={editingId ? () => handleUpdateProject(editingId, newProject) : handleCreateProject}
                        disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                      >
                        {(createProjectMutation.isPending || updateProjectMutation.isPending) && (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        )}
                        <Check className="h-4 w-4 mr-1" />
                        {editingId ? "Atualizar" : "Criar"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!isCreating && !editingId && (
                <Button onClick={() => setIsCreating(true)} className="w-full mb-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Projeto
                </Button>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-3">
                  Projetos Existentes ({projects.length})
                </h3>
                {projects.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhum projeto criado ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {projects.map((project) => {
                      const ptTranslation = project.translations.find(t => t.languageCode === "pt");
                      return (
                        <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                          <div className="flex items-center gap-3 flex-1">
                            <img 
                              src={project.imageUrl} 
                              alt={ptTranslation?.title || "Project"} 
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{ptTranslation?.title || "Sem título"}</p>
                              <p className="text-sm text-muted-foreground">Ordem: {project.order}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProject(project.id)}
                              disabled={deleteProjectMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="styles" className="space-y-4">
              {/* Cores em destaque - sincronizadas PT/EN */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Cores da Página
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {DEFAULT_FIELDS.filter(f => f.type === 'color').map(field => (
                    <div key={field.key}>
                      <label className="text-sm font-medium mb-2 block">{field.label}</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={siteContent[field.key]?.valuePt || field.defaultPt}
                          onChange={(e) => {
                            handleContentChange(field.key, 'valuePt', e.target.value);
                            handleContentChange(field.key, 'valueEn', e.target.value);
                          }}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={siteContent[field.key]?.valuePt || field.defaultPt}
                          onChange={(e) => {
                            handleContentChange(field.key, 'valuePt', e.target.value);
                            handleContentChange(field.key, 'valueEn', e.target.value);
                          }}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conteúdos com sub-tabs PT/EN */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-lg mb-4">Conteúdo da Página</h3>
                
                <Tabs value={contentLanguageTab} onValueChange={setContentLanguageTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="pt">🇵🇹 Português</TabsTrigger>
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pt" className="space-y-6">
                    {/* Título e Descrição */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Título e Descrição</h4>
                      <div>
                        <label className="text-sm font-medium">Título da Página</label>
                        <Input
                          value={siteContent['projects_title']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_title', 'valuePt', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Descrição da Página</label>
                        <Textarea
                          value={siteContent['projects_description']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_description', 'valuePt', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Trabalho Colaborativo */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Trabalho Colaborativo</h4>
                      <div>
                        <label className="text-sm font-medium">Título da Secção</label>
                        <Input
                          value={siteContent['projects_collaborative_title']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_title', 'valuePt', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Texto 1</label>
                        <Textarea
                          value={siteContent['projects_collaborative_text1']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_text1', 'valuePt', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Texto 2</label>
                        <Textarea
                          value={siteContent['projects_collaborative_text2']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_text2', 'valuePt', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Colaborações Passadas */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Colaborações Passadas</h4>
                      <div>
                        <label className="text-sm font-medium">Título</label>
                        <Input
                          value={siteContent['projects_past_collaborations_title']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_past_collaborations_title', 'valuePt', e.target.value)}
                        />
                      </div>
                      {[1, 2, 3, 4].map(num => (
                        <div key={num}>
                          <label className="text-sm font-medium">Colaboração {num}</label>
                          <Input
                            value={siteContent[`projects_collaboration${num}`]?.valuePt || ''}
                            onChange={(e) => handleContentChange(`projects_collaboration${num}`, 'valuePt', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Repertório */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Repertório</h4>
                      <div>
                        <label className="text-sm font-medium">Título da Secção</label>
                        <Input
                          value={siteContent['projects_repertoire_title']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_repertoire_title', 'valuePt', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Texto do Botão</label>
                        <Input
                          value={siteContent['projects_repertoire_button']?.valuePt || ''}
                          onChange={(e) => handleContentChange('projects_repertoire_button', 'valuePt', e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-6">
                    {/* Title and Description */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Title and Description</h4>
                      <div>
                        <label className="text-sm font-medium">Page Title</label>
                        <Input
                          value={siteContent['projects_title']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_title', 'valueEn', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Page Description</label>
                        <Textarea
                          value={siteContent['projects_description']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_description', 'valueEn', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Collaborative Work */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Collaborative Work</h4>
                      <div>
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                          value={siteContent['projects_collaborative_title']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_title', 'valueEn', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Text 1</label>
                        <Textarea
                          value={siteContent['projects_collaborative_text1']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_text1', 'valueEn', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Text 2</label>
                        <Textarea
                          value={siteContent['projects_collaborative_text2']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_collaborative_text2', 'valueEn', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Past Collaborations */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Past Collaborations</h4>
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={siteContent['projects_past_collaborations_title']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_past_collaborations_title', 'valueEn', e.target.value)}
                        />
                      </div>
                      {[1, 2, 3, 4].map(num => (
                        <div key={num}>
                          <label className="text-sm font-medium">Collaboration {num}</label>
                          <Input
                            value={siteContent[`projects_collaboration${num}`]?.valueEn || ''}
                            onChange={(e) => handleContentChange(`projects_collaboration${num}`, 'valueEn', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Repertoire */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Repertoire</h4>
                      <div>
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                          value={siteContent['projects_repertoire_title']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_repertoire_title', 'valueEn', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Button Text</label>
                        <Input
                          value={siteContent['projects_repertoire_button']?.valueEn || ''}
                          onChange={(e) => handleContentChange('projects_repertoire_button', 'valueEn', e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Preview */}
        {showPreview && (
          <div className="flex flex-col h-full bg-gray-100">
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
              <span className="text-sm font-medium text-gray-600">Pré-visualização</span>
              <div className="flex gap-1">
                <Button
                  variant={previewLanguage === "pt" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewLanguage("pt")}
                >
                  PT
                </Button>
                <Button
                  variant={previewLanguage === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewLanguage("en")}
                >
                  EN
                </Button>
              </div>
            </div>
            <ProjectPreview 
              projects={projects} 
              language={previewLanguage}
              siteContent={siteContent}
              newProject={(isCreating || editingId) ? newProject : null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
