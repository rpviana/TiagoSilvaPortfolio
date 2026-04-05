import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Save, Eye, EyeOff, Plus, Trash2, Edit2, 
  Link as LinkIcon, ExternalLink, X, Image as ImageIcon, GripVertical
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

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
  language 
}: { 
  projects: ProjectWithTranslations[]; 
  language: "pt" | "en";
}) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum projeto para mostrar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const translation = project.translations.find(t => t.languageCode === language);
        if (!translation) return null;

        return (
          <ProjectCard
            key={project.id}
            title={translation.title}
            description={translation.description}
            imageUrl={project.imageUrl}
            links={project.links.map(link => ({ type: link.type as any, url: link.url }))}
          />
        );
      })}
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

  // Fetch projects
  const { data: projects = [], isLoading } = useQuery<ProjectWithTranslations[]>({
    queryKey: ["/api/projects"],
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (projectData: NewProject) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          project: {
            imageUrl: projectData.imageUrl,
            order: projectData.order,
          },
          translations: [
            {
              languageCode: "pt",
              title: projectData.titlePt,
              description: projectData.descriptionPt,
            },
            {
              languageCode: "en",
              title: projectData.titleEn,
              description: projectData.descriptionEn,
            },
          ],
          links: projectData.links,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setNewProject(DEFAULT_NEW_PROJECT);
      setIsCreating(false);
      toast({
        title: "Sucesso!",
        description: "Projeto criado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, projectData }: { id: number; projectData: NewProject }) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          project: {
            imageUrl: projectData.imageUrl,
            order: projectData.order,
          },
          translations: [
            {
              languageCode: "pt",
              title: projectData.titlePt,
              description: projectData.descriptionPt,
            },
            {
              languageCode: "en",
              title: projectData.titleEn,
              description: projectData.descriptionEn,
            },
          ],
          links: projectData.links,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setEditingId(null);
      toast({
        title: "Sucesso!",
        description: "Projeto atualizado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete project mutation
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Sucesso!",
        description: "Projeto eliminado com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateProject = () => {
    if (!newProject.titlePt || !newProject.titleEn || !newProject.imageUrl) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    createProjectMutation.mutate(newProject);
  };

  const handleUpdateProject = (id: number, projectData: NewProject) => {
    if (!projectData.titlePt || !projectData.titleEn || !projectData.imageUrl) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    updateProjectMutation.mutate({ id, projectData });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Tem a certeza que deseja eliminar este projeto?")) {
      deleteProjectMutation.mutate(id);
    }
  };

  const handleEditProject = (project: ProjectWithTranslations) => {
    const ptTranslation = project.translations.find(t => t.languageCode === "pt");
    const enTranslation = project.translations.find(t => t.languageCode === "en");

    setEditingId(project.id);
    setNewProject({
      imageUrl: project.imageUrl,
      order: project.order,
      titlePt: ptTranslation?.title || "",
      titleEn: enTranslation?.title || "",
      descriptionPt: ptTranslation?.description || "",
      descriptionEn: enTranslation?.description || "",
      links: project.links.map(link => ({ type: link.type, url: link.url })),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
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

  if (isLoading) {
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
            Adicione e edite os projetos do portfólio
          </p>
        </div>
        <Button
          onClick={() => setShowPreview(!showPreview)}
          variant="outline"
          size="sm"
        >
          {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showPreview ? "Ocultar" : "Mostrar"} Preview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Create/Edit Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar Projeto" : isCreating ? "Criar Novo Projeto" : "Projetos"}
            </h2>

            {(isCreating || editingId) && (
              <div className="space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <ImageIcon className="inline h-4 w-4 mr-2" />
                    URL da Imagem *
                  </label>
                  <Input
                    value={newProject.imageUrl}
                    onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <GripVertical className="inline h-4 w-4 mr-2" />
                    Ordem (para ordenação)
                  </label>
                  <Input
                    type="number"
                    value={newProject.order}
                    onChange={(e) => setNewProject({ ...newProject, order: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <Tabs defaultValue="pt" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pt">🇵🇹 Português</TabsTrigger>
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pt" className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Título (PT) *</label>
                      <Input
                        value={newProject.titlePt}
                        onChange={(e) => setNewProject({ ...newProject, titlePt: e.target.value })}
                        placeholder="Título do projeto"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição (PT) *</label>
                      <Textarea
                        value={newProject.descriptionPt}
                        onChange={(e) => setNewProject({ ...newProject, descriptionPt: e.target.value })}
                        placeholder="Descrição do projeto"
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title (EN) *</label>
                      <Input
                        value={newProject.titleEn}
                        onChange={(e) => setNewProject({ ...newProject, titleEn: e.target.value })}
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description (EN) *</label>
                      <Textarea
                        value={newProject.descriptionEn}
                        onChange={(e) => setNewProject({ ...newProject, descriptionEn: e.target.value })}
                        placeholder="Project description"
                        rows={4}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Links Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">
                      <LinkIcon className="inline h-4 w-4 mr-2" />
                      Links
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addLink}
                    >
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
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => removeLink(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {editingId ? (
                    <>
                      <Button
                        onClick={() => handleUpdateProject(editingId, newProject)}
                        disabled={updateProjectMutation.isPending}
                        className="flex-1"
                      >
                        {updateProjectMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Guardar Alterações
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleCreateProject}
                        disabled={createProjectMutation.isPending}
                        className="flex-1"
                      >
                        {createProjectMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        Criar Projeto
                      </Button>
                      <Button
                        onClick={() => {
                          setIsCreating(false);
                          setNewProject(DEFAULT_NEW_PROJECT);
                        }}
                        variant="outline"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {!isCreating && !editingId && (
              <Button
                onClick={() => setIsCreating(true)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Projeto
              </Button>
            )}
          </div>

          {/* Projects List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Projetos Existentes</h3>
            <div className="space-y-3">
              {projects.length === 0 ? (
                <p className="text-muted-foreground text-sm">Nenhum projeto criado ainda.</p>
              ) : (
                projects.map((project) => {
                  const ptTranslation = project.translations.find(t => t.languageCode === "pt");
                  return (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                        >
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
                })
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <Tabs value={previewLanguage} onValueChange={(v) => setPreviewLanguage(v as "pt" | "en")}>
                  <TabsList>
                    <TabsTrigger value="pt">🇵🇹 PT</TabsTrigger>
                    <TabsTrigger value="en">🇬🇧 EN</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <ProjectPreview projects={projects} language={previewLanguage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
