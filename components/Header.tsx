import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  pageName?: string;
  description?: string; 
}

export default function Header({ 
  pageName = "Personajes Históricos", 
  description = "Explora las biografías de las figuras más influyentes de la historia." 
}: HeaderProps) {
  return (
    <header
      className="fixed w-full text-white flex flex-col items-center z-10"
      style={{
        height: '50vh', 
        background: 'linear-gradient(to bottom, black 75%, transparent)',
      }}
    >
      {/* Contenedor principal */}
      <div className="w-full max-w-4xl px-4 flex flex-col items-center h-full pt-4">

        {/* Logo  */}
        <Link href="/" className="-mt-5 -mb-6 lg:-mt-9 lg:-mb-9"> 
          <Image
            src="/icon3.png"
            width={180}
            height={40}
            alt="Logo"
            priority
            className="h-auto"
          />
        </Link>

        {/* Título  */}
        <h1 className="font-body font-bold text-xl md:text-3xl lg:text-lg text-center "> 
          {pageName}
        </h1>

        {/* Párrafo  */}
        <p className="text-center text-xs md:text-base max-w-2xl lg:text-base opacity-90">
          {description}
        </p>

      </div>
    </header>
  );
}