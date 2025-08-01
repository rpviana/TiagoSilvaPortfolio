import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Plus, Quote, ExternalLink, Play, Pause } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Types
interface DiscographyItem {
  id: number;
  title: string;
  year: number;
  label: string;
  coverImage?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  amazonUrl?: string;
  reviews?: Review[];
}

interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  rating?: number;
  createdAt: string;
}

// Form schema for reviews
const reviewSchema = z.object({
  reviewerName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  reviewerNif: z.string().length(9, 'NIF deve ter exatamente 9 dígitos').regex(/^\d+$/, 'NIF deve conter apenas números'),
  reviewText: z.string().min(10, 'Crítica deve ter pelo menos 10 caracteres'),
  rating: z.number().min(1).max(5).optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const Discography = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  // Mock data for albums (será substituído por dados do banco depois)
  const albums: DiscographyItem[] = [
    {
      id: 1,
      title: "Brett Dean: Eclipse (String Quartet No. 1)",
      label: "Luminate Records",
      year: 2023,
      coverImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      spotifyUrl: "https://open.spotify.com/album/example",
      appleMusicUrl: "https://music.apple.com/album/example",
      amazonUrl: "https://amazon.com/music/album/example"
    },
    {
      id: 2,
      title: "Justin Connolly: Music for Strings (plus...)",
      label: "Divine Art Records",
      year: 2022,
      coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      spotifyUrl: "https://open.spotify.com/album/example2",
      appleMusicUrl: "https://music.apple.com/album/example2",
    }
  ];

  // Query para buscar reviews de um álbum específico
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['discography-reviews', selectedAlbum],
    queryFn: async () => {
      if (!selectedAlbum) return [];
      const response = await fetch(`/api/discography/${selectedAlbum}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!selectedAlbum
  });

  // Form para adicionar review
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewerName: '',
      reviewerNif: '',
      reviewText: '',
      rating: 5,
    },
  });

  // Mutation para adicionar review
  const addReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData & { discographyId: number }) => {
      return apiRequest('/api/discography/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discography-reviews', selectedAlbum] });
      form.reset();
      setIsReviewDialogOpen(false);
    },
  });

  const onSubmitReview = (data: ReviewFormData) => {
    if (selectedAlbum) {
      addReviewMutation.mutate({ ...data, discographyId: selectedAlbum });
    }
  };

  const handlePlayPause = (url: string) => {
    if (playingUrl === url) {
      setPlayingUrl(null);
    } else {
      setPlayingUrl(url);
    }
  };

  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('discography.title')}
            </motion.h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {albums.map((album, index) => (
                <motion.div 
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-square relative">
                      <img 
                        src={album.coverImage} 
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={() => handlePlayPause(album.title)}
                        >
                          {playingUrl === album.title ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                          {playingUrl === album.title ? 'Pause Preview' : 'Play Preview'}
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="font-playfair text-primary">
                        {album.title}
                      </CardTitle>
                      <div className="text-sm text-gray-600">
                        {album.label} • {album.year}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Platform Links */}
                      <div className="flex flex-wrap gap-2">
                        {album.spotifyUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1" size={14} />
                              Spotify
                            </a>
                          </Button>
                        )}
                        {album.appleMusicUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={album.appleMusicUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1" size={14} />
                              Apple Music
                            </a>
                          </Button>
                        )}
                        {album.amazonUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={album.amazonUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1" size={14} />
                              Amazon
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Reviews Section */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-primary">Críticas</h4>
                          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => setSelectedAlbum(album.id)}
                              >
                                <Plus className="mr-1" size={14} />
                                Adicionar Crítica
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Adicionar Crítica</DialogTitle>
                              </DialogHeader>
                              <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                                  <FormField
                                    control={form.control}
                                    name="reviewerName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Seu nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="reviewerNif"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>NIF</FormLabel>
                                        <FormControl>
                                          <Input placeholder="123456789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Avaliação</FormLabel>
                                        <FormControl>
                                          <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <button
                                                key={star}
                                                type="button"
                                                className={`p-1 ${field.value && field.value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                onClick={() => field.onChange(star)}
                                              >
                                                <Star size={20} fill="currentColor" />
                                              </button>
                                            ))}
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="reviewText"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Crítica</FormLabel>
                                        <FormControl>
                                          <Textarea 
                                            placeholder="Escreva a sua crítica..."
                                            className="min-h-[100px]"
                                            {...field} 
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={addReviewMutation.isPending}
                                  >
                                    {addReviewMutation.isPending ? 'Enviando...' : 'Enviar Crítica'}
                                  </Button>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {/* Display Reviews */}
                        {selectedAlbum === album.id && (
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {reviewsLoading ? (
                              <div className="text-center py-4">Carregando críticas...</div>
                            ) : reviews.length === 0 ? (
                              <div className="text-center py-4 text-gray-500">
                                Seja o primeiro a escrever uma crítica!
                              </div>
                            ) : (
                              reviews.map((review: Review) => (
                                <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-sm">{review.reviewerName}</span>
                                    {review.rating && (
                                      <div className="flex">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                          <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-700 italic">"{review.reviewText}"</p>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                        
                        {selectedAlbum !== album.id && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedAlbum(album.id)}
                            className="w-full"
                          >
                            Ver Críticas
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Professional Reviews Section */}
            <motion.section 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-8 text-primary text-center">
                Aclamação da Crítica Especializada
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    text: "Silva's interpretation brings a remarkable sensitivity to Dean's complex textures, revealing layers of meaning that might otherwise remain hidden.",
                    source: "Gramophone Magazine"
                  },
                  {
                    text: "The technical mastery on display is impressive, but what truly distinguishes this recording is the emotional depth and intellectual commitment.",
                    source: "BBC Music Magazine"
                  },
                  {
                    text: "In Connolly's challenging score, Silva navigates the complexities with extraordinary precision while maintaining a lyrical, singing quality.",
                    source: "The Strad"
                  },
                  {
                    text: "This is contemporary classical music performance at its finest—intellectually stimulating yet profoundly moving.",
                    source: "Classical Music Review"
                  }
                ].map((review, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
                  >
                    <Quote className="text-primary/20 mb-4" size={32} />
                    <p className="italic text-gray-700 mb-4">"{review.text}"</p>
                    <div className="text-sm font-medium text-primary">— {review.source}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discography;
