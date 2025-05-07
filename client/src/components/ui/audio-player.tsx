import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  src: string;
  title: string;
  details?: string;
  date?: string;
  duration?: string;
}

export default function AudioPlayer({
  src,
  title,
  details,
  date,
  duration,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration1, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Handle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle seeking
  const handleSeek = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = newValue[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = newValue[0];
    audio.volume = newVolume;
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 1;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Format time (seconds -> mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-cream rounded-lg shadow p-6">
      <h3 className="font-playfair text-xl font-semibold mb-3">{title}</h3>
      {details && <p className="text-gray-600 mb-4">{details}</p>}

      <div className="mb-4">
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="flex items-center space-x-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-purple hover:text-purple-dark hover:bg-purple-light/30"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>

          <div className="grow">
            <Slider
              value={[currentTime]}
              max={duration1 || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-purple hover:text-purple-dark hover:bg-purple-light/30"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            <div className="w-20 hidden md:block">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration1)}</span>
        </div>
      </div>

      <div className="flex items-center text-gray-500 text-sm">
        {date && (
          <span className="mr-4">
            <i className="far fa-calendar mr-1"></i> Recorded: {date}
          </span>
        )}
        {duration && (
          <span>
            <i className="far fa-clock mr-1"></i> Duration: {duration}
          </span>
        )}
      </div>
    </div>
  );
}
