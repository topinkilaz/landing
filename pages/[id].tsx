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
import IntroVideo from "./IntroVideo";
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

  const [showIntroVideo, setShowIntroVideo] = useState(false);
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
    // Si no hay siguiente, ir al primero
    setNextPageId("1");
    setShowTransitionVideo(true);
  }
};

  // Timeout de seguridad
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, []);

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
      // Proporcionar un valor predeterminado o manejar el caso
      return ""; // O un ID de video predeterminado
    }
    return content.videos[language];
  };

  useEffect(() => {
  if (router.isReady && pageId === "1") {
    setShowIntroVideo(true);
  }
}, [router.isReady, pageId]);

  return (
    <>
      <Head>
        <title>{content.name}</title>
        <meta name="description" content={content.description} />
        {/* Precarga de imagen para mejor performance */}
        <link rel="preload" href={content.image} as="image" />
      </Head>

   {/*    {loading && <Loading />} */}

     {showIntroVideo && (
  <IntroVideo 
    videoUrl="https://res.cloudinary.com/dizvcibch/video/upload/v1747677390/0519_vzxuu8.mp4"
    lastFrameDuration={2000} 
    onComplete={() => setShowIntroVideo(false)} 
  />
)}

{showTransitionVideo && (
  <TransitionVideo 
    videoUrl="https://res.cloudinary.com/dizvcibch/video/upload/v1747680120/0519_1_rcidni.mp4"
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
         <div className="fixed bottom-32 sm:bottom-16 right-10 z-30 flex space-x-4">
  <button 
    onClick={handleNextCharacter}
    className="px-4 py-2 bg-white bg-opacity-30 rounded-full backdrop-blur-sm border border-white hover:bg-opacity-50 transition"
  >
    Siguiente Personaje
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




