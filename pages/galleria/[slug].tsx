// pages/galleria/[slug].tsx
'use client';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import styles from './Galleria.module.css';
import gallerie from '../../data/gallerie';
import Link from 'next/link';
import Header from '../../components/Header';
import { useState } from 'react';

const Galleria = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();
  const galleria = gallerie.find((g) => g.slug === slug);
  const [modalProduct, setModalProduct] = useState(null);

  if (!slug) {
    return null;
  }
  
  if (!galleria || !galleria.immaginiGalleria) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>
        <p>Galleria non trovata o immagini mancanti.</p>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    setModalProduct(null); 
  };

  return (
    <>
      <Head>
        <title>{galleria.nome} - Trieste Sadness Digital Arts Shop</title>
      </Head>
      
      <Header />

      <main className={styles.main} style={{ paddingTop: '6rem' }}>
        <h1 className={styles.title}>{galleria.nome}</h1>
        <p className={styles.description}>{galleria.description}</p>
        <div className={styles.grid}>
          {galleria.immaginiGalleria.map((item) => (
            <div
              key={item.id}
              className={styles.gridItem}
            >
              <div
                className={styles.imageContainer}
                onClick={() => setModalProduct(item)}
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

      {modalProduct && (
        <div className={styles.modalBackdrop} onClick={() => setModalProduct(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setModalProduct(null)}>&times;</button>
            
            <div className={styles.modalGrid}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={modalProduct.url}
                  alt={modalProduct.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className={styles.modalDetails}>
                <h2 className={styles.modalTitle}>{modalProduct.title}</h2>
                <p className={styles.modalDescription}>{modalProduct.description}</p>
                <p className={styles.modalPrice}>€{modalProduct.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(modalProduct)}
                  className={styles.modalAddToCartButton}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Galleria;