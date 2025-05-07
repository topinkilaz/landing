import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Script para mejorar la compatibilidad de pantalla completa */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Detectar cambios de pantalla completa y manejarlos
                  document.addEventListener('fullscreenchange', handleFullscreenChange);
                  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
                  
                  function handleFullscreenChange() {
                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                      const fullscreenElement = 
                        document.fullscreenElement || 
                        document.webkitFullscreenElement;
                        
                      // Si hay un elemento en pantalla completa
                      if (fullscreenElement) {
                        // Verificar si es un iframe de YouTube
                        if (fullscreenElement.tagName === 'IFRAME' && 
                            fullscreenElement.src && 
                            fullscreenElement.src.indexOf('youtube.com') > -1) {
                          
                          // Intentar forzar la orientación horizontal  
                          if (screen.orientation && screen.orientation.lock) {
                            screen.orientation.lock('landscape').catch(function(error) {
                              console.error("Error al bloquear la orientación:", error);
                            });
                          }
                        }
                      } else {
                        // Salir de pantalla completa, desbloquear orientación
                        if (screen.orientation && screen.orientation.unlock) {
                          screen.orientation.unlock();
                        }
                      }
                    }
                  }
                  
                  // Polyfill para Fullscreen API
                  if (typeof document.fullscreenEnabled === 'undefined') {
                    document.fullscreenEnabled = 
                      document.webkitFullscreenEnabled || 
                      document.mozFullScreenEnabled || 
                      document.msFullscreenEnabled || 
                      false;
                  }
                  
                  if (!Element.prototype.requestFullscreen) {
                    Element.prototype.requestFullscreen = 
                      Element.prototype.webkitRequestFullscreen ||
                      Element.prototype.mozRequestFullScreen ||
                      Element.prototype.msRequestFullscreen;
                  }
                  
                  if (!document.exitFullscreen) {
                    document.exitFullscreen = 
                      document.webkitExitFullscreen ||
                      document.mozCancelFullScreen ||
                      document.msExitFullscreen;
                  }
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;