import { useState, useEffect, useRef } from 'react';

interface IntroVideoProps {
  videoUrl: string;
  lastFrameDuration: number;
  onComplete: () => void;
}

export default function IntroVideo({ 
  videoUrl, 
  lastFrameDuration,
  onComplete 
}: IntroVideoProps) {
  const [phase, setPhase] = useState<'playing' | 'lastFrame' | 'completed'>('playing');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const handleVideoEnded = () => {
      if (videoRef.current) {
        // Mantener el último frame
        videoRef.current.currentTime = videoRef.current.duration - 0.01;
        videoRef.current.pause();
        setPhase('lastFrame');
        
        // Esperar el tiempo adicional
        setTimeout(() => {
          setPhase('completed');
          onComplete();
        }, lastFrameDuration);
      }
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, [lastFrameDuration, onComplete]);
  
  if (phase === 'completed') return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50">
      <video
  ref={videoRef}
  src={videoUrl}
  autoPlay
  muted={true} // Cambia a true para asegurar la reproducción automática
  playsInline
  className="w-full h-full object-cover"
/>
    </div>
  );
}