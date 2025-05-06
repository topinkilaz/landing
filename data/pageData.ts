export type Language = "es" | "en";

export interface PageContent {
  name: string;
  image: string;
  description: string;
  videos: Record<Language, string>;
}

const pageData: Record<string, PageContent> = {
  "1": {
    name: "JAIME ZUDAÑEZ",
    description: "Abogado y político charquino",
    image: "/jaime_zudanez.png",
    videos: {
      es: "MJ1gxfkCEGE?si=uGs6BhyOOnOrt6yt",
      en: "R6EnAwgAXlY?si=SyIN5b7GIcTlNEBs",
    },
  },
  "2": {
    name: "MARIANO SERRANO",
    description: "Secretario y diputado en el Congreso de Tucumán",
    image: "/mariano_serrano.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "3": {
    name: "CASIMIRO OLAÑETA",
    description: "Firmante de la Declaración de Independencia. ",
    image: "/casimiro.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "4": {
    name: "JUANA AZURDUY",
    description: "Heroína de la independencia hispanoamericana",
    image: "/juana_a.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "5": {
    name: "JOAQUÍN DE LEMOINE",
    description: "Impulsor de la Revolución de Chuquisaca del 25 de mayo ",
    image: "/joaquin.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "6": {
    name: "JOSÉ BENITO ALZÉRRECA",
    description: "Promotor del movimiento revolucionario del 25 de mayo ",
    image: "/jose_b.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "7": {
    name: "ANGEL MARIANO TORO",
    description: "Político destacado en la Revolución de Chuquisaca.",
    image: "/angel_m.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "8": {
    name: "MARIANO MORENO",
    description: "Ideólogo clave de la Revolución de Mayo.",
    image: "/mariano_moreno.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "9": {
    name: "ANGEL MARIANO MOSCOSO",
    description: "Colaboró en la pacificación indígena",
    image: "/angel_mm.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "10": {
    name: "ANTONIO J. DE SUCRE",
    description: "Militar, clave en la independencia de Sudamérica ",
    image: "/antonio_s.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
};

export default pageData;
