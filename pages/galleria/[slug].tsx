// pages/galleria/[slug].tsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import pick from 'lodash/pick'; // <-- Importa la funzione 'pick'

import { useCart } from '@/context/CartContext';
import styles from './Galleria.module.css';
import { gallerieData } from '@/data/gallerie-i18n.ts';

// L'Header è gestito dal Layout globale in _app.tsx, quindi non serve importarlo qui

const Galleria = () => {
  const router = useRouter();
  const { locale, query } = router;
  const { slug } = query;
  
  const t = useTranslations('GalleriaPage');
  const tHome = useTranslations('HomePage'); // Carichiamo anche HomePage per il titolo del sito
  const { addToCart } = useCart();
  
  const gallerie = gallerieData[locale] || gallerieData.it;
  const galleria = gallerie.find((g) => g.slug === slug);
  
  const [modalProduct, setModalProduct] = useState<any>(null); // Usiamo 'any' per semplicità o creiamo un tipo apposito

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  if (!galleria || !galleria.immaginiGalleria) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>
        <p>{t('notFound')}</p>
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
        <title>{`${galleria.nome} - ${tHome('title')}`}</title>
      </Head>
      
      <main className={styles.main}>
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
                  {t('addToCart')}
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
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- FUNZIONI OBBLIGATORIE PER PAGINE DINAMICHE E TRADOTTE ---

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const gallerie = gallerieData[locale] || gallerieData.it;
    for (const galleria of gallerie) {
      paths.push({
        params: { slug: galleria.slug },
        locale,
      });
    }
  }
  return {
    paths,
    fallback: false, 
  };
}

// --- FUNZIONE MODIFICATA PER CARICARE SOLO LE TRADUZIONI NECESSARIE ---
export async function getStaticProps({locale}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return {
    props: {
      // Passiamo le sezioni per la Galleria, l'Header, e il Carrello
      messages: pick(messages, ['GalleriaPage', 'HomePage', 'Header', 'Cart'])
    }
  };
}

export default Galleria;