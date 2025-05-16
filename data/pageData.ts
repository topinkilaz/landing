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
      es: "4xaWZBFB1gg?si=cuaC1dQQzkCS739r",
      en: "9mGmCTFGK-s?si=rBAmbUntZWLvAT30",
    },
  },
  "2": {
    name: "JOSE MARIANO SERRANO",
    description: "Secretario y diputado en el Congreso de Tucumán",
    image: "/mariano_serrano.png",
    videos: {
      es: "pHWEUNT4oxc?si=CYRzI1sYcw3tOjJn",
      en: "XUioEu5dTso?si=yTwz8YzY-hkL5DYK",
    },
  },
  "3": {
    name: "CASIMIRO OLAÑETA",
    description: "Firmante de la Declaración de Independencia. ",
    image: "/casimiro.png",
    videos: {
      es: "_NaIecg4ccg?si=8uNgeJKYgk0Wy0OP",
      en: "UZBIYwdhKJE?si=JZpjdHbtayp6t00W",
    },
  },
  "4": {
    name: "JUANA AZURDUY",
    description: "Heroína de la independencia hispanoamericana",
    image: "/juana_a.png",
    videos: {
      es: "hqb0lbOyuDg?si=eZJWU0LUjWQGtPAj",
      en: "FN6DJgi6_Kk?si=5tX3P5HivjNLx06J",
    },
  },
  "5": {
    name: "JOAQUÍN DE LEMOINE",
    description: "Impulsor de la Revolución de Chuquisaca del 25 de mayo ",
    image: "/joaquin.png",
    videos: {
      es: "ERY4W4XrWjQ?si=w-9KOCw4LroHHqtQ",
      en: "pdOK3vYnZLM?si=LIxy2aITdbXjme_G",
    },
  },
  "6": {
    name: "JOSÉ BENITO ALZÉRRECA",
    description: "Promotor del movimiento revolucionario del 25 de mayo ",
    image: "/jose_b.png",
    videos: {
      es: "h7GikiDkPHM?si=O5U0IkJjj8JiHg8O",
      en: "EFwp4NWw5lk?si=zEYjxDkVBKgwmaWL",
    },
  },
  "7": {
    name: "ANGEL MARIANO TORO",
    description: "Político destacado en la Revolución de Chuquisaca.",
    image: "/angel_m.png",
    videos: {
      es: "qjGhCLD-4Uc?si=eSH4dQ28yNjyP3az",
      en: "5COCV41bL2k?si=RX0JqVjakSqZqcE4",
    },
  },
  "8": {
    name: "MARIANO MORENO",
    description: "Ideólogo clave de la Revolución de Mayo.",
    image: "/marianom.png",
    videos: {
      es: "bqLapMfO6TY?si=JFDqmstdNpAb8Ovp",
      en: "47JZNoOwZAs?si=uC96RwiiGpnJPgFU",
    },
  },
  "9": {
    name: "ANGEL MARIANO MOSCOSO",
    description: "Colaboró en la pacificación indígena",
    image: "/moscoso.png",
    videos: {
      es: "abs-qW1giKA?si=pfrOkrJxUGNG8js6",
      en: "cl9b7GSY5rE?si=z2VbNTRYjbQrZ4aU",
    },
  },
  "10": {
    name: "ANTONIO J. DE SUCRE",
    description: "Militar, clave en la independencia de Sudamérica ",
    image: "/antonio_s.png",
    videos: {
      es: "jFrXEZ-ngWc?si=-46elzxbMAcqga9x",
      en: "JeitKYcp2B4?si=JxVSWTrzjMS2QfgU",
    },
  },
};

export default pageData;
