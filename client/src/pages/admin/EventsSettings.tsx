import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Save, Eye, EyeOff, Plus, Trash2, Edit2, Calendar, 
  Clock, MapPin, Link as LinkIcon, ExternalLink, X, Check
} from "lucide-react";
import { format } from "date-fns";
import { pt, enUS } from "date-fns/locale";

interface EventTranslation {
  id?: number;
  eventId?: number;
  languageCode: string;
  title: string;
  description: string;
}

interface EventWithTranslations {
  id: number;
  date: string;
  time: string;
  venue: string;
  isPast: boolean;
  bookingLink?: string | null;
  programLink?: string | null;
  translations: EventTranslation[];
}

interface NewEvent {
  date: string;
  time: string;
  venue: string;
  bookingLink: string;
  programLink: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
}

const DEFAULT_NEW_EVENT: NewEvent = {
  date: "",
  time: "",
  venue: "",
  bookingLink: "",
  programLink: "",
  titlePt: "",
  titleEn: "",
  descriptionPt: "",
  descriptionEn: "",
};

type SiteContent = {
  key: string;
  valuePt: string;
  valueEn: string;
  type: string;
};

const DEFAULT_FIELDS = [
  { key: "events_title", label: "Título da Página", type: "text", defaultPt: "Eventos", defaultEn: "Events" },
  { key: "events_bg_color", label: "Cor de Fundo", type: "color", defaultPt: "#f9fafb", defaultEn: "#f9fafb" },
  { key: "events_title_color", label: "Cor do Título", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
  { key: "events_card_bg_color", label: "Cor do Card", type: "color", defaultPt: "#ffffff", defaultEn: "#ffffff" },
  { key: "events_button_color", label: "Cor dos Botões", type: "color", defaultPt: "#6B2D3A", defaultEn: "#6B2D3A" },
];

// Helper functions para converter entre formatos de hora
function timeInputToDisplay(timeInput: string): string {
  // Converte "14:30" para "2:30 PM"
  if (!timeInput || !timeInput.includes(':')) return timeInput;
  const [hours, minutes] = timeInput.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function timeDisplayToInput(timeDisplay: string): string {
  // Converte "2:30 PM" para "14:30"
  if (!timeDisplay || !timeDisplay.includes(':')) return timeDisplay;
  const match = timeDisplay.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return timeDisplay;
  
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

function EventPreview({ 
  events, 
  language, 
  newEvent 
}: { 
  events: EventWithTranslations[]; 
  language: "pt" | "en";
  newEvent?: NewEvent | null;
}) {
  const isPt = language === "pt";
  const locale = isPt ? pt : enUS;
  
  // Se há um novo evento sendo criado, adicionar ao preview
  let previewEvents = [...events];
  if (newEvent && newEvent.date && newEvent.time && newEvent.venue && (newEvent.titlePt || newEvent.titleEn)) {
    const dateTimeString = `${newEvent.date}T${newEvent.time}:00`;
    const previewDate = new Date(dateTimeString);
    const displayTime = timeInputToDisplay(newEvent.time);
    const previewEventData: EventWithTranslations = {
      id: -1, // ID temporário para preview
      date: previewDate.toISOString(),
      time: displayTime,
      venue: newEvent.venue,
      isPast: previewDate < new Date(),
      bookingLink: newEvent.bookingLink || null,
      programLink: newEvent.programLink || null,
      translations: [
        { id: -1, eventId: -1, languageCode: "pt", title: newEvent.titlePt || "Novo Evento", description: newEvent.descriptionPt || "" },
        { id: -2, eventId: -1, languageCode: "en", title: newEvent.titleEn || "New Event", description: newEvent.descriptionEn || "" },
      ]
    };
    previewEvents = [...events, previewEventData];
  }
  
  const upcomingEvents = previewEvents.filter(e => !e.isPast).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const pastEvents = previewEvents.filter(e => e.isPast).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="h-full overflow-auto bg-gray-50 p-4">
      <h1 className="text-2xl font-playfair font-bold mb-6 text-center" style={{ color: "#6B2D3A" }}>
        {isPt ? "Próximos Eventos" : "Upcoming Events"}
      </h1>
      
      {upcomingEvents.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center mb-6">
          <p className="text-gray-600 text-sm">
            {isPt ? "Não há eventos programados." : "No upcoming events."}
          </p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {upcomingEvents.map(event => {
            const translation = event.translations.find(t => t.languageCode === language) || event.translations[0];
            const eventDate = new Date(event.date);
            const isPreview = event.id === -1;
            return (
              <div key={event.id} className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${isPreview ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
                {isPreview && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                    {isPt ? "Preview" : "Preview"}
                  </div>
                )}
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-1 bg-rose-50 flex flex-col justify-center items-center p-3">
                    <div className="text-center" style={{ color: "#6B2D3A" }}>
                      <div className="font-playfair text-2xl font-bold">{format(eventDate, "dd", { locale })}</div>
                      <div className="uppercase tracking-wide text-[10px]">{format(eventDate, "MMM yyyy", { locale })}</div>
                      <div className="mt-1 bg-white px-2 py-0.5 rounded-full text-[10px]">{event.time}</div>
                    </div>
                  </div>
                  <div className="col-span-3 p-3">
                    <h3 className="text-sm font-playfair font-bold mb-1" style={{ color: "#6B2D3A" }}>
                      {translation?.title || "Evento"}
                    </h3>
                    <div className="text-[10px] text-gray-600 mb-2">{event.venue}</div>
                    <p className="text-gray-700 text-[10px] line-clamp-2">
                      {translation?.description || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {pastEvents.length > 0 && (
        <>
          <h2 className="text-lg font-playfair font-bold mb-4 text-center" style={{ color: "#6B2D3A" }}>
            {isPt ? "Eventos Passados" : "Past Events"}
          </h2>
          <div className="space-y-3 opacity-70">
            {pastEvents.slice(0, 2).map(event => {
              const translation = event.translations.find(t => t.languageCode === language) || event.translations[0];
              const eventDate = new Date(event.date);
              return (
                <div key={event.id} className="bg-white rounded-lg shadow-sm p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-center" style={{ color: "#6B2D3A" }}>
                      <div className="font-playfair text-lg font-bold">{format(eventDate, "dd", { locale })}</div>
                      <div className="uppercase tracking-wide text-[8px]">{format(eventDate, "MMM", { locale })}</div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold" style={{ color: "#6B2D3A" }}>
                        {translation?.title || "Evento"}
                      </h3>
                      <div className="text-[10px] text-gray-600">{event.venue}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminEventsSettings() {
  const [siteContent, setSiteContent] = useState<Record<string, SiteContent>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewLanguage, setPreviewLanguage] = useState<"pt" | "en">("pt");
  const [activeTab, setActiveTab] = useState("events");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<NewEvent>(DEFAULT_NEW_EVENT);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch events from API
  const { data: events = [], isLoading: eventsLoading } = useQuery<EventWithTranslations[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  // Fetch site content
  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
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

      setSiteContent(contentMap);
    } catch (error) {
      console.error("Error fetching site content:", error);
    }
  };

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: NewEvent) => {
      const token = localStorage.getItem("admin_token");
      
      // Combinar data e hora para criar timestamp correto
      const displayTime = timeInputToDisplay(eventData.time);
      const dateTimeString = `${eventData.date}T${eventData.time}:00`;
      const eventDateTime = new Date(dateTimeString);
      
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event: {
            date: eventDateTime.toISOString(),
            time: displayTime,
            venue: eventData.venue,
            isPast: eventDateTime < new Date(),
            bookingLink: eventData.bookingLink || null,
            programLink: eventData.programLink || null,
          },
          translations: [
            { languageCode: "pt", title: eventData.titlePt, description: eventData.descriptionPt },
            { languageCode: "en", title: eventData.titleEn, description: eventData.descriptionEn },
          ],
        }),
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setIsCreating(false);
      setNewEvent(DEFAULT_NEW_EVENT);
      toast({ title: "Sucesso", description: "Evento criado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, eventData }: { id: number; eventData: NewEvent }) => {
      const token = localStorage.getItem("admin_token");
      
      // Combinar data e hora para criar timestamp correto
      const displayTime = timeInputToDisplay(eventData.time);
      const dateTimeString = `${eventData.date}T${eventData.time}:00`;
      const eventDateTime = new Date(dateTimeString);
      
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event: {
            date: eventDateTime.toISOString(),
            time: displayTime,
            venue: eventData.venue,
            isPast: eventDateTime < new Date(),
            bookingLink: eventData.bookingLink || null,
            programLink: eventData.programLink || null,
          },
          translations: [
            { languageCode: "pt", title: eventData.titlePt, description: eventData.descriptionPt },
            { languageCode: "en", title: eventData.titleEn, description: eventData.descriptionEn },
          ],
        }),
      });
      if (!res.ok) throw new Error("Failed to update event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setEditingId(null);
      setNewEvent(DEFAULT_NEW_EVENT);
      toast({ title: "Sucesso", description: "Evento atualizado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Sucesso", description: "Evento eliminado com sucesso!" });
    },
    onError: (error: any) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const contentArray = Object.values(siteContent);
      
      await fetch("/api/site-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contentArray),
      });

      toast({ title: "Sucesso", description: "Configurações guardadas!" });
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao guardar configurações.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (key: string, field: "valuePt" | "valueEn", value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const startEditing = (event: EventWithTranslations) => {
    const ptTranslation = event.translations.find(t => t.languageCode === "pt");
    const enTranslation = event.translations.find(t => t.languageCode === "en");
    
    setNewEvent({
      date: event.date.split("T")[0],
      time: timeDisplayToInput(event.time),
      venue: event.venue,
      bookingLink: event.bookingLink || "",
      programLink: event.programLink || "",
      titlePt: ptTranslation?.title || "",
      titleEn: enTranslation?.title || "",
      descriptionPt: ptTranslation?.description || "",
      descriptionEn: enTranslation?.description || "",
    });
    setEditingId(event.id);
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsCreating(false);
    setNewEvent(DEFAULT_NEW_EVENT);
  };

  const handleSubmit = () => {
    if (!newEvent.date || !newEvent.time || !newEvent.venue || !newEvent.titlePt || !newEvent.titleEn) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    
    if (editingId) {
      updateEventMutation.mutate({ id: editingId, eventData: newEvent });
    } else {
      createEventMutation.mutate(newEvent);
    }
  };

  // Separate events by status
  const upcomingEvents = events.filter(e => !e.isPast).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const pastEvents = events.filter(e => e.isPast).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (eventsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] pt-16">
      <div className="grid grid-cols-2 h-full">
        {/* Left: Editor */}
        <div className="overflow-auto p-6 border-r">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestão de Eventos</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="styles">Estilos</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              {/* Add/Edit Event Form */}
              {(isCreating || editingId) && (
                <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">
                      {editingId ? "Editar Evento" : "Novo Evento"}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={cancelEditing}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Data *</label>
                      <Input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Hora *</label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm font-medium">Local *</label>
                    <Input
                      placeholder="Ex: Wigmore Hall, London, UK"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, venue: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Link Reserva (opcional)</label>
                      <Input
                        type="url"
                        placeholder="https://..."
                        value={newEvent.bookingLink}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, bookingLink: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Link Programa (opcional)</label>
                      <Input
                        type="url"
                        placeholder="https://..."
                        value={newEvent.programLink}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, programLink: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Título (PT) *</label>
                      <Input
                        placeholder="Título em Português"
                        value={newEvent.titlePt}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, titlePt: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Título (EN) *</label>
                      <Input
                        placeholder="Title in English"
                        value={newEvent.titleEn}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, titleEn: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Descrição (PT)</label>
                      <Textarea
                        placeholder="Descrição em Português"
                        rows={4}
                        value={newEvent.descriptionPt}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, descriptionPt: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Descrição (EN)</label>
                      <Textarea
                        placeholder="Description in English"
                        rows={4}
                        value={newEvent.descriptionEn}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, descriptionEn: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={cancelEditing}>Cancelar</Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={createEventMutation.isPending || updateEventMutation.isPending}
                    >
                      {(createEventMutation.isPending || updateEventMutation.isPending) && (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      )}
                      <Check className="h-4 w-4 mr-1" />
                      {editingId ? "Atualizar" : "Criar"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Add Event Button */}
              {!isCreating && !editingId && (
                <Button 
                  onClick={() => setIsCreating(true)} 
                  className="w-full mb-4"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Evento
                </Button>
              )}

              {/* Upcoming Events */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Eventos ({upcomingEvents.length})
                </h3>
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhum evento futuro.</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingEvents.map(event => (
                      <EventListItem 
                        key={event.id} 
                        event={event} 
                        onEdit={() => startEditing(event)}
                        onDelete={() => {
                          if (confirm("Tem a certeza que deseja eliminar este evento?")) {
                            deleteEventMutation.mutate(event.id);
                          }
                        }}
                        isDeleting={deleteEventMutation.isPending}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-gray-500">
                  <Calendar className="h-5 w-5" />
                  Eventos Passados ({pastEvents.length})
                </h3>
                {pastEvents.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhum evento passado.</p>
                ) : (
                  <div className="space-y-3 opacity-70">
                    {pastEvents.map(event => (
                      <EventListItem 
                        key={event.id} 
                        event={event} 
                        onEdit={() => startEditing(event)}
                        onDelete={() => {
                          if (confirm("Tem a certeza que deseja eliminar este evento?")) {
                            deleteEventMutation.mutate(event.id);
                          }
                        }}
                        isDeleting={deleteEventMutation.isPending}
                        isPast
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="styles" className="space-y-4">
              {DEFAULT_FIELDS.map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm font-medium">{field.label}</label>
                  {field.type === "color" ? (
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={siteContent[field.key]?.valuePt || field.defaultPt}
                        onChange={(e) => {
                          handleContentChange(field.key, "valuePt", e.target.value);
                          handleContentChange(field.key, "valueEn", e.target.value);
                        }}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={siteContent[field.key]?.valuePt || field.defaultPt}
                        onChange={(e) => {
                          handleContentChange(field.key, "valuePt", e.target.value);
                          handleContentChange(field.key, "valueEn", e.target.value);
                        }}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-xs text-gray-500">PT</span>
                        <Input
                          value={siteContent[field.key]?.valuePt || field.defaultPt}
                          onChange={(e) => handleContentChange(field.key, "valuePt", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">EN</span>
                        <Input
                          value={siteContent[field.key]?.valueEn || field.defaultEn}
                          onChange={(e) => handleContentChange(field.key, "valueEn", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
            <EventPreview 
              events={events} 
              language={previewLanguage}
              newEvent={(isCreating || editingId) ? newEvent : null}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Event list item component
function EventListItem({ 
  event, 
  onEdit, 
  onDelete,
  isDeleting,
  isPast = false 
}: { 
  event: EventWithTranslations; 
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isPast?: boolean;
}) {
  const ptTranslation = event.translations.find(t => t.languageCode === "pt");
  const eventDate = new Date(event.date);
  
  return (
    <div className={`bg-white rounded-lg border p-4 ${isPast ? "border-gray-200" : "border-primary/20"}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">
              {format(eventDate, "dd/MM/yyyy")}
            </span>
            <Clock className="h-4 w-4 text-gray-400 ml-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <h4 className="font-semibold text-primary mb-1">
            {ptTranslation?.title || "Sem título"}
          </h4>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-3 w-3" />
            {event.venue}
          </div>
          {(event.bookingLink || event.programLink) && (
            <div className="flex gap-2">
              {event.bookingLink && (
                <a 
                  href={event.bookingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Reservas
                </a>
              )}
              {event.programLink && (
                <a 
                  href={event.programLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Programa
                </a>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
