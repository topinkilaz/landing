import { useEffect, useRef } from 'react';

interface TransitionVideoProps {
  videoUrl: string;
  nextPageId: string;
  isVisible: boolean;
}

export default function TransitionVideo({ 
  videoUrl, 
  nextPageId, 
  isVisible 
}: TransitionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigatingRef = useRef(false);
  
  // Efecto para manejar la navegación cuando el video termina
  useEffect(() => {
    if (!isVisible) return;
    
    function handleNavigation() {
      if (!navigatingRef.current) {
        navigatingRef.current = true;
        console.log("Navegando a:", nextPageId);
        
        // Usar window.location en lugar de router.push para forzar la navegación
        window.location.href = `/${nextPageId}`;
      }
    }
    
    const video = videoRef.current;
    if (!video) return;
    
    // Asegurar que el video comienza a reproducirse
    video.play().catch(err => console.error("Error reproduciendo video:", err));
    
    // Función simple para manejar el fin del video
    function onVideoEnded() {
      console.log("Video terminado, forzando navegación");
      handleNavigation();
    }
    
    // Añadir el evento
    video.addEventListener('ended', onVideoEnded);
    
    // Configurar un temporizador de respaldo por si acaso
    let backupTimer: NodeJS.Timeout;
    
    // Configurar el temporizador solo cuando sabemos la duración del video
    const setBackupTimer = () => {
      if (video.duration > 0 && !backupTimer) {
        const timeoutMs = Math.ceil(video.duration * 1000) + 1000;
        console.log(`Configurando temporizador de respaldo de ${timeoutMs}ms`);
        
        backupTimer = setTimeout(() => {
          console.log("¡Temporizador de respaldo activado!");
          if (!navigatingRef.current) {
            console.log("Navegación forzada por temporizador");
            handleNavigation();
          }
        }, timeoutMs);
      }
    };
    
    // Configurar temporizador cuando los metadatos estén cargados
    video.addEventListener('loadedmetadata', setBackupTimer);
    
    // También intentar configurarlo de inmediato por si ya están cargados
    if (video.duration > 0) {
      setBackupTimer();
    }
    
    return () => {
      video.removeEventListener('ended', onVideoEnded);
      video.removeEventListener('loadedmetadata', setBackupTimer);
      if (backupTimer) clearTimeout(backupTimer);
    };
  }, [isVisible, nextPageId]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}