import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../components/Header";
import pageData, { Language } from "../data/pageData";
import Loading from "../components/loading";
import CampanaBackground from "../components/CampanaBackground";
import YouTubePlayer from "./youtubeplay";
import TransitionVideo from "./TransitionVideo";

interface PageContent {
  name: string;
  description: string;
  image: string;
  videos: Record<Language, string>;
}

interface PageProps {
  initialId: string;
  initialContent: PageContent;
}

// Generación de rutas estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(pageData).map(id => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false 
  };
};

// Obtención de datos para cada página
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const pageId = params?.id as string || '1';
  const initialContent = pageData[pageId] || pageData['1'];

  if (!initialContent) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      initialId: pageId,
      initialContent
    }
  };
};

// Componente principal
export default function DynamicPage({ initialId, initialContent }: PageProps) {
  const [language, setLanguage] = useState<Language>("es");
  const [loading, setLoading] = useState(true);

  const [showTransitionVideo, setShowTransitionVideo] = useState(false);
  const [nextPageId, setNextPageId] = useState("");
  const loadedAssets = useRef({
    image: false,
    video: false
  });
  const router = useRouter();
  
  // Obtener el contenido, priorizando el de router si está disponible
  const pageId = router.query.id?.toString() || initialId;
  const content = pageData[pageId] || initialContent;

  // Definición del orden de la secuencia personalizada
  const orderedSequence = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  
  // Función para obtener la posición actual en la secuencia (1-10)
  const getCurrentPosition = () => {
    const index = orderedSequence.indexOf(pageId);
    return index !== -1 ? index + 1 : 1; // Posición basada en 1 (no en 0)
  };
  
  // Calcular el porcentaje de progreso (0-100)
  const getProgressPercentage = () => {
    return (getCurrentPosition() / orderedSequence.length) * 100;
  };

  // Función para obtener el video específico basado en la página actual
  const getTransitionVideoUrl = () => {
    // Mapeo de IDs a URLs de videos específicos
    const transitionVideos: Record<string, string> = {
      "1": "https://res.cloudinary.com/dizvcibch/video/upload/v1747680120/0519_1_rcidni.mp4",
      "2": "https://res.cloudinary.com/dizvcibch/video/upload/v1747684784/0519_2_s8sldr.mp4",
      "3": "https://res.cloudinary.com/dizvcibch/video/upload/v1747799618/jose_mariano_serrano_jazivq.mp4",
      "4": "https://res.cloudinary.com/dizvcibch/video/upload/v1747799934/a_juaquinleom_jwz7ts.mp4",
      "5": "https://res.cloudinary.com/dizvcibch/video/upload/v1747800175/moscoso_cta5bp.mp4",
      "6": "https://res.cloudinary.com/dizvcibch/video/upload/v1747800341/casimiro_vv1btb.mp4",
      "7": "https://res.cloudinary.com/dizvcibch/video/upload/v1747800596/mariano_moreno_eakv2y.mp4",
      "8": "https://res.cloudinary.com/dizvcibch/video/upload/v1747800785/jaime_z_wqbldj.mp4",
      "9": "https://res.cloudinary.com/dizvcibch/video/upload/v1747800943/toro_npr6oz.mp4",
      "10": "https://res.cloudinary.com/dizvcibch/video/upload/v1747677390/0519_vzxuu8.mp4",
    };
    
    // Retornar la URL del video correspondiente al ID actual o un video por defecto
    return transitionVideos[pageId] || "https://res.cloudinary.com/dizvcibch/video/upload/v1747680120/0519_1_rcidni.mp4";
  };
  
  // Verificar si todos los assets han cargado
  const checkLoaded = () => {
    if (loadedAssets.current.image && loadedAssets.current.video) {
      setTimeout(() => setLoading(false), 300);
    }
  };

  // Manejadores de carga
  const handleImageLoad = () => {
    loadedAssets.current.image = true;
    checkLoaded();
  };

  const handleVideoLoad = () => {
    loadedAssets.current.video = true;
    checkLoaded();
  };
  
 

  const handleNextCharacter = () => {
  const currentId = parseInt(pageId);
  const nextId = currentId + 1;
  
  // Verificar si existe el siguiente personaje
  if (pageData[nextId.toString()]) {
    setNextPageId(nextId.toString());
    setShowTransitionVideo(true);
  } else {
    
    setNextPageId("1");
    setShowTransitionVideo(true);
  }
};

  // Resetear estado de carga al cambiar de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      loadedAssets.current = { image: false, video: false };
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  // Redirección si el contenido no existe
  useEffect(() => {
    if (router.isReady && !content) {
      router.replace('/1').catch(console.error);
    }
  }, [router.isReady, content, router]);

  const getVideoId = () => {
    if (!content || !content.videos || !language || !content.videos[language]) {
      return ""; // O un ID de video predeterminado
    }
    return content.videos[language];
  };

  return (
    <>
    
<Head>
  <title>{content.name}</title>
  <meta name="description" content={content.description} />
  
  {/* TEMPORAL: URL fija para probar */}
  <meta property="og:image" content="https://playful-haupia-a7857c.netlify.app/miniaturas/mantonio.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  
  {/* Resto de meta tags */}
  <meta property="og:title" content={content.name} />
  <meta property="og:description" content={content.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://playful-haupia-a7857c.netlify.app/${pageId}`} />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://playful-haupia-a7857c.netlify.app/miniaturas/mantonio.jpg" />
  
  <link rel="canonical" href={`https://playful-haupia-a7857c.netlify.app/${pageId}`} />
</Head>

      {/* TransitionVideo con URL dinámica basada en la página actual */}
      {showTransitionVideo && (
        <TransitionVideo 
          videoUrl={getTransitionVideoUrl()}
          nextPageId={nextPageId}
          isVisible={showTransitionVideo}
        />
      )}

      <div style={{ display: loading ? 'none' : 'block' }}>
        <Header pageName={content.name} description={content.description} />

        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-[-1]">
            <CampanaBackground />
          </div>
          
          {/* Capa de fondo negro */}
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

          {/* Imagen de fondo optimizada */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="relative w-full h-full max-w-4xl max-h-[80vh] ml-20 mr-20 mb-80 md:ml-8 lg:ml-10 lg:mt-24 md:mb-92 lg:mb-0">
              <Image
                src={content.image}
                alt="Background"
                fill
                className="object-contain"
                priority
                unoptimized={process.env.NEXT_PHASE === 'export'} // Desactiva optimización para export
                onLoad={handleImageLoad}
                onError={() => {
                  loadedAssets.current.image = true;
                  checkLoaded();
                }}
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="relative z-10 h-full flex items-center p-4">
            <div className="w-full max-w-6xl lg:ml-auto lg:mr-10 lg:w-1/2">
              {/* Selector de idioma */}
              <div className="flex justify-center mb-4 space-x-4 z-30">
                {(['es', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-6 py-2 rounded-full font-medium transition-all shadow-lg backdrop-blur-sm ${
                      language === lang
                        ? "bg-white bg-opacity-40 text-black border-2 border-white"
                        : "bg-black bg-opacity-50 text-white border-2 border-white hover:bg-opacity-70"
                    }`}
                  >
                    {lang === 'es' ? 'Español' : 'English'}
                  </button>
                ))}
              </div>
              {/* Contenedor del video */}
              <div className="relative" style={{ paddingBottom: "56.25%", height: 0, width: "100%" }}>
                {content && content.videos && (
                  <YouTubePlayer 
                    videoId={getVideoId()} 
                    language={language} 
                    onLoad={handleVideoLoad} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Botón de Siguiente Personaje con indicador de progreso y ubicación */}
      <div className="fixed bottom-32 sm:bottom-16 right-10 z-30 flex flex-col items-end space-y-2">
        {/* Indicador de ubicación */}
        {/* <div className="text-white text-sm sm:text-base backdrop-blur-sm bg-black bg-opacity-30 px-3 py-1 rounded-full">
          Personaje actual: <span className="font-bold">{content.name}</span>
        </div> */}
        
        {/* Ubicación con icono */}
        <div className="text-white text-sm sm:text-base backdrop-blur-sm bg-black bg-opacity-30 px-3 py-1 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{content.location || "Ubicación desconocida"}</span>
        </div>
        
        <button 
          onClick={handleNextCharacter}
          className="group relative px-6 py-2 bg-white bg-opacity-20 border-2 border-white rounded-full overflow-hidden transition-all duration-300 hover:text-black hover:scale-110 transform hover:shadow-glow"
        >
          {/* Barra de progreso en el fondo */}
          <div 
            className="absolute inset-0 bg-white opacity-70 transition-all duration-500" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
          
          {/* Texto siempre visible encima */}
          <div className="flex items-center space-x-3 relative z-10">
            <span className="font-bold">Siguiente Personaje</span>
            <span className="text-sm px-2 py-1 bg-white text-black font-medium rounded-full">
              {getCurrentPosition()}/10
            </span>
          </div>
          
          {/* Efecto hover */}
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
        </button>
      </div>


      {/* Footer */}
      <footer className="fixed bottom-0 w-full text-white text-center py-2 z-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center space-x-4 mb-1">
            <Image
              src="/escudo.webp"
              width={100}
              height={30}
              alt="Footer Logo 1"
              onLoad={() => {}} 
            />
            <Image
              src="/logo_quique.webp"
              width={100}
              height={30}
              alt="Footer Logo 3"
              onLoad={() => {}} 
            />
          </div>
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  );
}