export type Language = 'es' | 'en';

export interface PageContent {
  name: string;
  image: string;
  videos: Record<Language, string>;
}

const pageData: Record<string, PageContent> = {
  '1': {
    name: 'Juana Azurduy de Padilla',
    image: '/juana_z.png',
    videos: {
      es: 'SyELQ3P0tXc',
      en: 'DoBJAz3Xk90'
    }
  },
  '2': {
    name: 'Jaime de Zudañez',
    image: '/jaime_z.png',
    videos: {
      es: 'SyELQ3P0tXc',
      en: 'DoBJAz3Xk90'
    }
  },
  // Puedes agregar más páginas aquí
};

export default pageData;