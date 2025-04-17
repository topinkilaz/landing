// pages/[id].tsx
import { useState } from 'react';
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from 'next/router';
import pageData, { Language } from '../data/pageData';

export default function DynamicPage() {
    const [language, setLanguage] = useState<Language>('es');
    const router = useRouter();
    const { id } = router.query;
    
  
    const pageId = typeof id === 'string' ? id : '1'; 
    const content = pageData[pageId] || pageData['1']; 

    return (
        <>
            <Header pageName={content.name} />

            <div className="home-cover">
                <div className="relative h-screen w-full overflow-hidden">
                    {/* Fondo de imagen  */}
                    <div className="absolute inset-0 z-0 flex items-center">
                        <div className="relative w-full h-full max-w-4xl max-h-[80vh] ml-2 mb-80 md:ml-8 lg:ml-10 lg:mt-20 md:mb-92 lg:mb-0 ">
                            <Image
                                src={content.image}
                                alt="Background"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Contenedor principal */}
                    <div className="relative z-10 h-full flex items-center p-4">
                        <div className="w-full max-w-6xl lg:ml-auto lg:mr-10 lg:w-1/2">
                            {/* Selector de idioma */}
                            <div className="flex justify-center mb-4 space-x-4">
                                <button
                                    onClick={() => setLanguage('es')}
                                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                                        language === 'es'
                                            ? 'bg-white text-black'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Español
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                                        language === 'en'
                                            ? 'bg-white text-black'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    Inglés
                                </button>
                            </div>

                            {/* Contenedor del video */}
                            <div className="relative" style={{
                                paddingBottom: '56.25%', 
                                height: 0,
                                width: '100%'
                            }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
                                    src={`https://www.youtube.com/embed/${content.videos[language]}?autoplay=1`}
                                    title={`YouTube video player - ${language.toUpperCase()}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="h-8 bottom-0 fixed w-full text-white text-center text-sm">
                {/* footer */}
            </footer>
        </>
    );
}