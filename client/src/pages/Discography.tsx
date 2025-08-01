import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Play, Pause, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
}

interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  rating?: number;
  createdAt: string;
}

const Discography = () => {
  const { t } = useTranslation();
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

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
    queryKey: ['discography-reviews', selectedAlbum, t.language],
    queryFn: async () => {
      if (!selectedAlbum) return [];
      const response = await fetch(`/api/discography/${selectedAlbum}/reviews?lang=${t.language || 'pt'}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!selectedAlbum
  });

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
                          {playingUrl === album.title ? t('discography.pausePreview') : t('discography.playPreview')}
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

                      {/* Reviews Button */}
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          variant="ghost"
                          className="text-primary hover:text-primary-dark"
                          onClick={() => setSelectedAlbum(selectedAlbum === album.id ? null : album.id)}
                        >
                          {selectedAlbum === album.id ? t('discography.hideReviews') : t('discography.showReviews')}
                        </Button>
                      </div>
                    </CardContent>

                    {/* Reviews Section */}
                    {selectedAlbum === album.id && (
                      <CardContent className="pt-0">
                        <div className="border-t pt-6">
                          <h4 className="font-playfair text-lg font-bold mb-4 text-primary">
                            {t('discography.reviewsTitle')}
                          </h4>
                          
                          {reviewsLoading ? (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            </div>
                          ) : reviews.length > 0 ? (
                            <div className="space-y-4">
                              {reviews.map((review: Review) => (
                                <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <h5 className="font-medium text-gray-900">
                                        {review.reviewerName}
                                      </h5>
                                      {review.rating && (
                                        <div className="flex items-center">
                                          {[...Array(5)].map((_, i) => (
                                            <Star
                                              key={i}
                                              size={14}
                                              className={`${
                                                i < review.rating!
                                                  ? 'text-yellow-400 fill-current'
                                                  : 'text-gray-300'
                                              }`}
                                            />
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {new Date(review.createdAt).toLocaleDateString('pt-PT')}
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Quote className="text-primary mt-1 flex-shrink-0" size={16} />
                                    <p className="text-gray-700 italic">
                                      {review.reviewText}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <Quote className="mx-auto mb-3 text-gray-300" size={48} />
                              <p>{t('discography.noReviews')}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discography;