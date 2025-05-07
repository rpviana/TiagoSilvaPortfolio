import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex: number;
}

export default function GalleryLightbox({
  images,
  open,
  onOpenChange,
  initialIndex = 0,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset current index when lightbox opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, images.length, onOpenChange]);

  if (!images.length) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <div className="relative flex items-center justify-center bg-black/90 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 z-10"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 text-white bg-black/50 hover:bg-black/70 z-10"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 text-white bg-black/50 hover:bg-black/70 z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
