import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  pageName?: string;
}

export default function Header({ pageName = "Personajes Históricos" }: HeaderProps) {
  return (
    <header
      className="bg-black fixed w-screen px-3 text-white flex flex-col items-center z-50"
      style={{
        position: "absolute",
        paddingTop: 0,
        paddingBottom: 0, 
        marginBottom: '-20px'
      }}
    >
      <div className="relative" style={{ marginTop: '-20px', marginBottom: '-20px' }}>
        <Link href="/">
          <Image
            src="/icon3.png"
            width={180}
            height={40}
            alt="Logo"
            priority
            style={{ height: 'auto' }}
          />
        </Link>
        
        <Link href="/" className="block w-full text-center">
          <span className="font-body font-bold text-lg leading-none relative" style={{ top: '-30px' }}>
            {pageName}
          </span>
        </Link>
      </div>
    </header>
  );
}