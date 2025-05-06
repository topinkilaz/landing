// components/CampanaBackground.tsx
import Image from 'next/image';
import { useState } from 'react';

export default function CampanaBackground() {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`relative w-full h-screen ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Imagen con z-index bajo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/campana.webp"
          alt="Background campana"
          quality={80}
          priority
          fill
          className="object-cover object-bottom"
          onLoadingComplete={() => setLoaded(true)}
          unoptimized={process.env.NEXT_PHASE === 'export'}
        />
      </div>
      
      {/* Gradiente superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/10 z-0" />
    </div>
  );
}