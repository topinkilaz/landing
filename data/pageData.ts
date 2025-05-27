export type Language = "es" | "en";

export interface PageContent {
  name: string;
  image: string;
  shareImage: string;
  description: string;
  location: string; 
  videos: Record<Language, string>;
}

const pageData: Record<string, PageContent> = {
  "1": {
    name: "ANTONIO J. DE SUCRE",
    description: "Militar, clave en la independencia de Sudamérica ",
    location: "CALLE RAVELO #2",
    image: "/antonio_s.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "jFrXEZ-ngWc?si=-46elzxbMAcqga9x",
      en: "JeitKYcp2B4?si=JxVSWTrzjMS2QfgU",
    },
  },
  "2": {
    name: "JUANA AZURDUY",
    description: "Heroína de la independencia hispanoamericana",
    location: "CALLE ESPAÑA # 234",
    image: "/juana_a.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "hqb0lbOyuDg?si=eZJWU0LUjWQGtPAj",
      en: "FN6DJgi6_Kk?si=5tX3P5HivjNLx06J",
    },
  },
  "3":{
    name: "JOSE MARIANO SERRANO",
    description: "Secretario y diputado en el Congreso de Tucumán",
    location: "CALLE SAN ALBERTO # 150",
    image: "/mariano_serrano.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "pHWEUNT4oxc?si=CYRzI1sYcw3tOjJn",
      en: "XUioEu5dTso?si=yTwz8YzY-hkL5DYK",
    },
  }, 
  "4": {
    name: "JOAQUÍN DE LEMOINE",
    description: "Impulsor de la Revolución de Chuquisaca del 25 de mayo ",
    location: "CALLE CALVO # 31",
    image: "/joaquin.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "ERY4W4XrWjQ?si=w-9KOCw4LroHHqtQ",
      en: "pdOK3vYnZLM?si=LIxy2aITdbXjme_G",
    },
  },
  "5":  {
    name: "ANGEL MARIANO MOSCOSO",
    description: "Colaboró en la pacificación indígena",
    location: "CALLE GRAU # 117",
    image: "/moscoso.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "abs-qW1giKA?si=pfrOkrJxUGNG8js6",
      en: "cl9b7GSY5rE?si=z2VbNTRYjbQrZ4aU",
    },
  },
  "6": {
    name: "CASIMIRO OLAÑETA",
    description: "Firmante de la Declaración de Independencia. ",
    location: "CALLE GRAU # 133",
    image: "/casimiro.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "_NaIecg4ccg?si=8uNgeJKYgk0Wy0OP",
      en: "UZBIYwdhKJE?si=JZpjdHbtayp6t00W",
    },
  },
  "7": {
    name: "MARIANO MORENO",
    description: "Ideólogo clave de la Revolución de Mayo.",
    location: "CALLE BOLIVAR # 701",
    image: "/marianom.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "bqLapMfO6TY?si=JFDqmstdNpAb8Ovp",
      en: "47JZNoOwZAs?si=uC96RwiiGpnJPgFU",
    },
  },
  "8":{
    name: "JAIME ZUDAÑEZ",
    description: "Abogado y político charquino",
    location: "CALLE COLÓN # 4",  
    image: "/jaime_zudanez.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "4xaWZBFB1gg?si=cuaC1dQQzkCS739r",
      en: "9mGmCTFGK-s?si=rBAmbUntZWLvAT30",
    },
  },
  "9":  {
    name: "ANGEL MARIANO TORO",
    description: "Político destacado en la Revolución de Chuquisaca.",
    location: "CALLE ESTUDIANTES # 2",
    image: "/angel_m.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "qjGhCLD-4Uc?si=eSH4dQ28yNjyP3az",
      en: "5COCV41bL2k?si=RX0JqVjakSqZqcE4",
    },
  },
  "10":{
    name: "JOSÉ BENITO ALZÉRRECA",
    description: "Promotor del movimiento revolucionario del 25 de mayo ",
    location: "PLAZA 25 DE MAYO ",
    image: "/jose_b.png",
    shareImage: "/miniaturas/mantonio.jpg",
    videos: {
      es: "h7GikiDkPHM?si=O5U0IkJjj8JiHg8O",
      en: "EFwp4NWw5lk?si=zEYjxDkVBKgwmaWL",
    },
  },
  
};

export default pageData;