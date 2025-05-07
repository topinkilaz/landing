import { useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  language?: string;
  onLoad?: () => void;
}

export default function YouTubeEmbed({ videoId, language = 'es', onLoad }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  useEffect(() => {
    // Ejecutar solo en el cliente
    if (typeof window === 'undefined') return;
    
    // Manejar evento de carga
    const handleLoad = () => {
      if (onLoad) onLoad();
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, [onLoad]);
  
  // Valor seguro para language
  const langUpperCase = language ? language.toUpperCase() : 'ES';
  
  return (
    <iframe
      ref={iframeRef}
      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
      src={`https://www.youtube.com/embed/${videoId}?playsinline=0&fs=1&rel=0&modestbranding=1&controls=1&showinfo=0&autohide=1`}
      title={`YouTube video player - ${langUpperCase}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
    />
  );
}