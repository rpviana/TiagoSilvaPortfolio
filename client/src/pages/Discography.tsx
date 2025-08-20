import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
  previewAudio?: string; // Caminho para o mp3 de preview
  buyUrl?: string; // Novo campo para URL de compra
}

interface Review {
  author: string;
  source?: string;
  text: string;
  links?: string[];
  rating?: number;
  createdAt?: string;
}

const Discography = () => {
  const { t, i18n } = useTranslation();
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});

  useEffect(() => {
    // Pausa todos os áudios quando playingUrl muda
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (audio) {
        if (playingUrl === id) {
          audio.currentTime = 0;
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
  }, [playingUrl]);

  // Função para buscar reviews do i18n
  const getReviewsForAlbum = (albumId: number): Review[] => {
    // Espera que as reviews estejam em t('discography.reviews', { returnObjects: true })
    const allReviews = t('discography.reviews', { returnObjects: true }) as Record<string, Review[]>;
    return allReviews?.[albumId] || [];
  };

  // Mock data for albums (será substituído por dados do banco depois)
  const albums: DiscographyItem[] = [
    {
      id: 1,
      title: "Brett Dean: Eclipse (String Quartet No. 1)",
      label: "Luminate Records",
      year: 2023,
      coverImage: "/attached_assets/cd1.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/album/4fLowG006afbep3rx8zEdB?si=_MS7mgxxRWWcRWuzSYBU8A",
      appleMusicUrl: "https://music.apple.com/pt/album/brett-dean-string-quartet-no-1-eclipse-single/1782316937",
      amazonUrl: "https://music.amazon.com/albums/B0DP7HY2BM",
      previewAudio: "/attached_assets/preview1.mp3",
      buyUrl: "https://luminaterecords.com/product/brett-dean-eclipse-string-quartet-no-1/" // atualizado
    },
    {
      id: 2,
      title: "Justin Connolly: Music for Strings (plus...)",
      label: "Divine Art Records",
      year: 2022,
      coverImage: "/attached_assets/cd2.jpg",
      spotifyUrl: "https://open.spotify.com/intl-pt/album/6671lkoxgRsWZyXiiR9uJt?si=HCEGEELlTrq9nBheOlbCcg",
      appleMusicUrl: "https://music.apple.com/us/album/connolly-music-for-strings/1793073572",
      amazonUrl: "https://music.amazon.com/albums/B0DZVX8S71",
      previewAudio: "/attached_assets/preview2.mp3",
      buyUrl: "https://divineartrecords.com/recording/justin-connolly-music-for-strings-plus/" // atualizado
    }
  ];

  const handlePlayPause = (albumId: number) => {
    if (playingUrl === String(albumId)) {
      setPlayingUrl(null);
    } else {
      setPlayingUrl(String(albumId));
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
                        {album.previewAudio && (
                          <Button
                            size="lg"
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            onClick={() => handlePlayPause(album.id)}
                          >
                            {playingUrl === String(album.id) ? <Pause className="mr-2" size={20} /> : <Play className="mr-2" size={20} />}
                            {playingUrl === String(album.id) ? t('discography.pausePreview') : t('discography.playPreview')}
                          </Button>
                        )}
                        {/* Elemento de áudio oculto */}
                        {album.previewAudio && (
                          <audio
                            ref={el => { audioRefs.current[album.id] = el; }}
                            src={album.previewAudio}
                            style={{ display: 'none' }}
                            onEnded={() => setPlayingUrl(null)}
                          />
                        )}
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

                      {/* Reviews Button + Buy Now */}
                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <Button
                          variant="ghost"
                          className="text-primary hover:text-primary-dark"
                          onClick={() => setSelectedAlbum(selectedAlbum === album.id ? null : album.id)}
                        >
                          {selectedAlbum === album.id ? t('discography.hideReviews') : t('discography.showReviews')}
                        </Button>
                        {album.buyUrl && (
                          <Button
                            asChild
                            size="sm"
                            className="ml-2"
                            variant="default"
                          >
                            <a
                              href={album.buyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t('discography.buyNow')}
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>

                    {/* Reviews Section */}
                    {selectedAlbum === album.id && (
                      <CardContent className="pt-0">
                        <div className="border-t pt-6">
                          <h4 className="font-playfair text-lg font-bold mb-4 text-primary">
                            {t('discography.reviewsTitle')}
                          </h4>
                          {getReviewsForAlbum(album.id).length > 0 ? (
                            <div className="space-y-4">
                              {getReviewsForAlbum(album.id).map((review: Review, idx: number) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h5 className="font-medium text-gray-900">
                                        {review.author}
                                      </h5>
                                      {review.source && (
                                        <span className="text-xs text-gray-500 block">
                                          {review.source}
                                        </span>
                                      )}
                                    </div>
                                    {/* Se rating existir, mostrar estrelas */}
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
                                    {/* Só mostra a data se existir e for válida */}
                                    {/* 
                                    {review.createdAt && !isNaN(Date.parse(review.createdAt)) && (
                                      <div className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString('pt-PT')}
                                      </div>
                                    )} 
                                    */}
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Quote className="text-primary mt-1 flex-shrink-0" size={16} />
                                    <div>
                                      <p className="text-gray-700 italic">
                                        {review.text}
                                      </p>
                                      {review.links && review.links.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                          {review.links.map((link, i) => (
                                            <a
                                              key={i}
                                              href={link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 underline text-xs flex items-center"
                                            >
                                              <ExternalLink size={12} className="mr-1" />
                                              {t('discography.officialSite')}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
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