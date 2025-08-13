// data/gallerie-i18n.ts

// Definiamo i tipi per assicurarci che i dati siano sempre corretti
type ImageItem = {
  id: string;
  title: string;
  price: number;
  url: string;
  alt: string;
  description: string;
};

type Gallery = {
  slug: string;
  nome: string;
  description: string;
  immagineCarosello: string;
  immaginiGalleria: ImageItem[];
};

// Esportiamo i dati tradotti
export const gallerieData: { [locale: string]: Gallery[] } = {
  // --- ITALIANO (I tuoi dati originali) ---
  it: [
    {
      slug: 'tradizionale',
      nome: 'Stile Tradizionale',
      description: 'Linee audaci e colori vivaci. Un omaggio all\'arte classica del tatuaggio americano.',
      immagineCarosello: '/images/carosello-tradizionale.jpg',
      immaginiGalleria: [
        { id: 'tradizionale-1', title: 'Pezzo Tradizionale 1', price: 25.00, url: '/images/tradizionale/1.jpg', alt: 'Tatuaggio tradizionale', description: 'Un pezzo classico con linee audaci e colori vivaci.' },
        { id: 'tradizionale-2', title: 'Pezzo Tradizionale 2', price: 30.00, url: '/images/tradizionale/2.jpg', alt: 'Tatuaggio tradizionale', description: 'Un design tradizionale iconico, perfetto per chi ama l\'arte del tatuaggio americana.' },
        // ... Aggiungi gli altri tuoi pezzi qui
      ],
    },
    {
      slug: 'blackwork',
      nome: 'Blackwork',
      description: 'L\'eleganza del nero. Stile minimalista o geometrico per un impatto visivo forte e deciso.',
      immagineCarosello: '/images/carosello-blackwork.jpg',
      immaginiGalleria: [
        { id: 'blackwork-1', title: 'Pezzo Blackwork 1', price: 22.00, url: '/images/blackwork/1.jpg', alt: 'Tatuaggio blackwork', description: 'Un pezzo blackwork minimalista e potente.' },
        // ... Aggiungi gli altri tuoi pezzi qui
      ],
    },
    {
      slug: 'flash',
      nome: 'Flash',
      description: 'Tatuaggi rapidi e di piccole dimensioni, perfetti per un tocco di stile spontaneo.',
      immagineCarosello: '/images/carosello-flash.jpg',
      immaginiGalleria: [
        { id: 'flash-1', title: 'Flash 1', price: 15.00, url: '/images/flash/1.jpg', alt: 'Flash tattoo', description: 'Un design flash semplice e veloce.' },
        // ... Aggiungi gli altri tuoi pezzi qui
      ],
    },
  ],
  // --- INGLESE ---
  en: [
    {
      slug: 'tradizionale',
      nome: 'Traditional Style',
      description: 'Bold lines and vibrant colors. A tribute to classic American tattoo art.',
      immagineCarosello: '/images/carosello-tradizionale.jpg',
      immaginiGalleria: [
        { id: 'tradizionale-1', title: 'Traditional Piece 1', price: 25.00, url: '/images/tradizionale/1.jpg', alt: 'Traditional tattoo', description: 'A classic piece with bold lines and vibrant colors.' },
        { id: 'tradizionale-2', title: 'Traditional Piece 2', price: 30.00, url: '/images/tradizionale/2.jpg', alt: 'Traditional tattoo', description: 'An iconic traditional design, perfect for lovers of American tattoo art.' },
        // ... Add your other pieces here
      ],
    },
    {
      slug: 'blackwork',
      nome: 'Blackwork',
      description: 'The elegance of black. Minimalist or geometric style for a strong and decisive visual impact.',
      immagineCarosello: '/images/carosello-blackwork.jpg',
      immaginiGalleria: [
        { id: 'blackwork-1', title: 'Blackwork Piece 1', price: 22.00, url: '/images/blackwork/1.jpg', alt: 'Blackwork tattoo', description: 'A minimalist and powerful blackwork piece.' },
        // ... Add your other pieces here
      ],
    },
    {
      slug: 'flash',
      nome: 'Flash',
      description: 'Quick and small tattoos, perfect for a touch of spontaneous style.',
      immagineCarosello: '/images/carosello-flash.jpg',
      immaginiGalleria: [
        { id: 'flash-1', title: 'Flash Piece 1', price: 15.00, url: '/images/flash/1.jpg', alt: 'Flash tattoo', description: 'A simple and fast flash design.' },
        // ... Add your other pieces here
      ],
    },
  ],
  // --- SPAGNOLO ---
  es: [
    {
      slug: 'tradizionale',
      nome: 'Estilo Tradicional',
      description: 'Líneas audaces y colores vibrantes. Un homenaje al arte clásico del tatuaje americano.',
      immagineCarosello: '/images/carosello-tradizionale.jpg',
      immaginiGalleria: [
        { id: 'tradizionale-1', title: 'Pieza Tradicional 1', price: 25.00, url: '/images/tradizionale/1.jpg', alt: 'Tatuaje tradicional', description: 'Una pieza clásica con líneas audaces y colores vibrantes.' },
        { id: 'tradizionale-2', title: 'Pieza Tradicional 2', price: 30.00, url: '/images/tradizionale/2.jpg', alt: 'Tatuaje tradicional', description: 'Un diseño tradicional icónico, perfecto para los amantes del arte del tatuaje americano.' },
        // ... Agrega tus otras piezas aquí
      ],
    },
    {
      slug: 'blackwork',
      nome: 'Blackwork',
      description: 'La elegancia del negro. Estilo minimalista o geométrico para un impacto visual fuerte y decidido.',
      immagineCarosello: '/images/carosello-blackwork.jpg',
      immaginiGalleria: [
        { id: 'blackwork-1', title: 'Pieza Blackwork 1', price: 22.00, url: '/images/blackwork/1.jpg', alt: 'Tatuaje blackwork', description: 'Una pieza blackwork minimalista y potente.' },
        // ... Agrega tus otras piezas aquí
      ],
    },
    {
      slug: 'flash',
      nome: 'Flash',
      description: 'Tatuajes rápidos y pequeños, perfectos para un toque de estilo espontáneo.',
      immagineCarosello: '/images/carosello-flash.jpg',
      immaginiGalleria: [
        { id: 'flash-1', title: 'Pieza Flash 1', price: 15.00, url: '/images/flash/1.jpg', alt: 'Flash tattoo', description: 'Un diseño flash simple y rápido.' },
        // ... Agrega tus otras piezas aquí
      ],
    },
  ],
};