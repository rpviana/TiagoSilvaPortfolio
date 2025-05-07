import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer';

export interface AlbumLink {
  platform: 'official' | 'spotify' | 'apple' | 'amazon';
  url: string;
}

export interface Album {
  title: string;
  label: string;
  year: string;
  coverUrl: string;
  sampleUrl: string;
  links: AlbumLink[];
}

interface AlbumCardProps {
  album: Album;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const { t } = useTranslation();
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'official': return 'fas fa-globe';
      case 'spotify': return 'fab fa-spotify';
      case 'apple': return 'fab fa-apple';
      case 'amazon': return 'fab fa-amazon';
      default: return 'fas fa-music';
    }
  };
  
  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'official': return t('discography.officialSite');
      case 'spotify': return 'Spotify';
      case 'apple': return t('discography.appleMusic');
      case 'amazon': return 'Amazon';
      default: return platform;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-3">
        {/* Album Cover */}
        <div className="col-span-1">
          <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Album Info */}
        <div className="col-span-2 p-6">
          <h3 className="text-lg font-playfair font-bold mb-2 text-primary">{album.title}</h3>
          <div className="text-sm text-gray-600 mb-4">{album.label} ({album.year})</div>
          
          <div className="mb-6">
            <AudioPlayer src={album.sampleUrl} title={t('discography.sample')} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {album.links.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <i className={`${getPlatformIcon(link.platform)} mr-1`}></i> {getPlatformLabel(link.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
