// pages/galleria/GalleriaMobile.tsx

'use client';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import styles from './Galleria.module.css';
import { MedievalSharp } from 'next/font/google';
import { gallerie } from '../data/gallerie';
import Link from 'next/link';
import CartMobile from '../../components/Cart';
import { useState } from 'react';
import ImageModal from '../../components/ImageModal';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const GalleriaMobile = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();
  const galleria = gallerie.find((g) => g.slug === slug);
  const [modalImage, setModalImage] = useState<string | null>(null);

  if (!galleria || !galleria.immaginiGalleria) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>
        <p>Galleria non trovata o immagini mancanti.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{galleria.nome} - Trieste Sadness Digital Arts Shop</title>
      </Head>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>&larr; Torna alla Home</Link>
        <CartMobile />
      </header>
      <main className={styles.main}>
        <h1 className={`${medieval.className} ${styles.title}`}>{galleria.nome}</h1>
        <p className={styles.description}>{galleria.descrizione}</p>
        <div className={styles.grid}>
          {galleria.immaginiGalleria.map((item) => (
            <div
              key={item.id}
              className={styles.gridItem}
            >
              <div
                className={styles.imageContainer}
                onClick={() => setModalImage(item.url)} // Il click sull'immagine apre il modale
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.image}
                />
              </div>
              <div className={styles.itemDetails}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemPrice}>€{item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart({ ...item, quantity: 1, title: item.title, price: item.price })}
                  className={styles.addToCartButton}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalImage && <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />}
    </>
  );
};

export default GalleriaMobile;