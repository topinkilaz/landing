export type Language = "es" | "en";

export interface PageContent {
  name: string;
  image: string;
  description: string;
  videos: Record<Language, string>;
}

const pageData: Record<string, PageContent> = {
  "1": {
    name: "ANTONIO JOSE DE SUCRE",
    description: "Vencedor en Ayacucho, leyenda en la vida.",
    image: "/antonio_s.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
  "2": {
    name: "JAIME ZUDAÑEZ",
    description: "description",
    image: "/jaime_z.png",
    videos: {
      es: "SyELQ3P0tXc",
      en: "DoBJAz3Xk90",
    },
  },
};

export default pageData;
