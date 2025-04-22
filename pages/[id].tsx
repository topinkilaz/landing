import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header";

import { useRouter } from "next/router";
import pageData, { Language } from "../data/pageData";
import Loading from "../components/loading";

export default function DynamicPage() {
  const [language, setLanguage] = useState<Language>("es");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const pageId = typeof id === "string" ? id : "1";
  const content = pageData[pageId] || pageData["1"];

  // Control de estado de carga
  useEffect(() => {
    // Activar el loading cuando la ruta cambia
    const handleStart = () => setLoading(true);
    // Desactivar el loading cuando la navegación termina
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 800); // Pequeño retraso para asegurar que todo se cargó
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Verificar si la página actual ya está cargada
    if (router.isReady) {
      setTimeout(() => setLoading(false), 1000); // Desactivar loading después de 1 segundo en la carga inicial
    }

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Escuchar también la carga completa de la página
  useEffect(() => {
    // Función para desactivar loading cuando la página esté completamente cargada
    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);
    
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      {loading && <Loading />}
      
      <Header pageName={content.name} description={content.description} />

      <div className="home-cover">
        <div className="relative h-screen w-full overflow-hidden">
          {/* Capa de fondo negro */}
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

          {/* Fondo de imagen */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="relative w-full h-full max-w-4xl max-h-[80vh] ml-20 mr-20 mb-80 md:ml-8 lg:ml-10 lg:mt-20 md:mb-92 lg:mb-0 ">
              <Image
                src={content.image}
                alt="Background"
                fill
                className="object-contain"
                priority
                onLoad={() => setTimeout(() => setLoading(false), 200)}
              />
            </div>
          </div>

          {/* Contenedor principal */}
          <div className="relative z-10 h-full flex items-center p-4">
            <div className="w-full max-w-6xl lg:ml-auto lg:mr-10 lg:w-1/2">
              {/* Selector de idioma */}
              <div className="flex justify-center mb-4 space-x-4 z-30">
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-6 py-2 rounded-full font-medium transition-all shadow-lg backdrop-blur-sm ${
                    language === "es"
                      ? "bg-white bg-opacity-40 text-black border-2 border-white"
                      : "bg-black bg-opacity-50 text-white border-2 border-white hover:bg-opacity-70"
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-6 py-2 rounded-full font-medium transition-all shadow-lg backdrop-blur-sm ${
                    language === "en"
                      ? "bg-white bg-opacity-40 text-black border-2 border-white"
                      : "bg-black bg-opacity-50 text-white border-2 border-white hover:bg-opacity-70"
                  }`}
                >
                  Inglés
                </button>
              </div>

              {/* Contenedor del video */}
              <div
                className="relative "
                style={{
                  paddingBottom: "56.25%",
                  height: 0,
                  width: "100%",
                }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl "
                  src={`https://www.youtube.com/embed/${content.videos[language]}?autoplay=0&rel=0&modestbranding=1`}
                  title={`YouTube video player - ${language.toUpperCase()}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setTimeout(() => setLoading(false), 500)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full text-white text-center py-2 z-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center space-x-4 mb-1">
            <Image
              src="/escudo.png"
              width={100}
              height={30}
              alt="Footer Logo 1"
            />
            <Image
              src="/logo_quique.png"
              width={100}
              height={30}
              alt="Footer Logo 3"
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