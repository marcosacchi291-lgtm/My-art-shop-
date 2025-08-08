'use client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import styles from './Galleria.module.css';
import { MedievalSharp } from 'next/font/google';
import  gallerie  from '../data/gallerie';
import Link from 'next/link';
import CartMobile from '../../components/Cart';
import { useState } from 'react';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const Galleria = () => {
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
        <p className={styles.description}>{galleria.description}</p>
        <div className={styles.grid}>
          {galleria.immaginiGalleria.map((item) => (
            <div
              key={item.id}
              className={styles.gridItem}
            >
              <div
                className={styles.imageContainer}
                onClick={() => setModalImage(item.url)}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                />
              </div>
              <div className={styles.itemDetails}>
                <h2 className={styles.itemTitle}>{item.title}</h2>
                <p className={styles.itemPrice}>€{item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className={styles.addToCartButton}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* La modale è qui, come nella versione desktop */}
      {modalImage && (
        <div className={styles.modalBackdrop} onClick={() => setModalImage(null)}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()} 
          >
            <Image 
              src={modalImage} 
              alt="Immagine ingrandita" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Galleria;