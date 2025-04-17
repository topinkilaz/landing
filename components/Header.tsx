// components/Header.tsx
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  pageName?: string;
}

export default function Header({ pageName = "Personajes Históricos" }: HeaderProps) {
  return (
    <header 
      className="bg-black fixed w-screen p-3 text-white flex flex-row justify-center gap-x-1 z-50"
      style={{position: "absolute"}}
    >
      <span>
        <Link href="/">
          <Image 
            src="/icon.png" 
            width={50} 
            height={50} 
            alt="Logo"
            style={{ height: 'auto' }} 
          />
        </Link>
      </span>
      
      <Link href="/">
        <span className={"font-body text-center font-bold text-lg"}>
          {pageName}
        </span>
      </Link>
    </header>
  );
}