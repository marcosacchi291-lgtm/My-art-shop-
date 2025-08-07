// pages/HomeMobile.tsx
'use client';

import Head from 'next/head';
import { MedievalSharp } from 'next/font/google';
import Link from 'next/link';
import { motion, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

import { gallerie } from './data/gallerie';
import Cart from '../components/Cart';
import mobileStyles from './index.mobile.module.css';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const HomeMobile = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = 260;
  const gap = 16;
  const validGalleries = gallerie || [];
  const offset = windowWidth / 2 - cardWidth / 2;

  const carouselX = useMotionValue(-currentIndex * (cardWidth + gap) + offset);

  useEffect(() => {
    carouselX.set(-currentIndex * (cardWidth + gap) + offset);
  }, [currentIndex, windowWidth]);

  const handleDragEnd = (event: any, info: any) => {
    const swipe = info.velocity.x;
    const dragDirection = swipe < 0 ? 1 : -1;

    let newIndex = currentIndex + dragDirection;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > validGalleries.length - 1) newIndex = validGalleries.length - 1;

    setCurrentIndex(newIndex);
  };
  
  return (
    <>
      <Head>
        <title>Trieste Sadness Digital Arts Shop</title>
      </Head>
      <main 
        className={mobileStyles.mainMobile}
        style={{
          // MODIFICA QUI: Sfondo applicato all'intero main
          backgroundImage: 'url("/new-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          backgroundAttachment: 'fixed',
          backgroundColor: '#121212',
          color: '#fff',
        }}
      >
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Cart />
        </div>

        <div 
          className={mobileStyles.heroMobile}
          style={{
            // MODIFICA QUI: Rimosso l'img e aggiunto un colore semi-trasparente
            position: 'relative',
            zIndex: 1, 
            padding: '0 1rem', 
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, padding: '0 1rem' }}>
            <h1 className={`${medieval.className} ${mobileStyles.heroTitleMobile}`} style={{ color: '#fff', margin: 0 }}>
              It's a sad world we live in <br />
              <span>Trieste Sadness Tattoo</span>
            </h1>
            <p className={`${medieval.className} ${mobileStyles.heroSubtitleMobile}`} style={{ marginTop: '1rem', color: '#ddd' }}>
              Digital arts for sad people made by a sad guy.
            </p>
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'center', padding: '1rem 0', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <Link href="/disegni-su-richiesta" className={medieval.className} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem' }}>
            Disegni su Richiesta
          </Link>
        </div>

        <div className={mobileStyles.gallerieSectionMobile} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <h2 className={`${medieval.className} ${mobileStyles.galleriaH2Mobile}`}>Gallerie</h2>
          <motion.div
            className={mobileStyles.carouselWrapper}
            style={{ x: carouselX }}
            drag="x"
            dragConstraints={{ left: - (validGalleries.length - 1) * (cardWidth + gap), right: 0 }}
            onDragEnd={handleDragEnd}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          >
            {validGalleries.map((galleria) => (
              <motion.div
                key={galleria.slug}
                className={mobileStyles.galleriaCard}
              >
                <Link href={`/galleria/${galleria.slug}`} legacyBehavior>
                  <a style={{ display: 'block', width: '100%', height: '100%' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${galleria.immagineCarosello})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        borderRadius: '10px',
                      }}
                    >
                      <div className={mobileStyles.galleriaOverlay}>
                        <h3 className={medieval.className}>{galleria.nome}</h3>
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className={mobileStyles.carouselControls}>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className={mobileStyles.controlButton}
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, validGalleries.length - 1))}
              disabled={currentIndex === validGalleries.length - 1}
              className={mobileStyles.controlButton}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeMobile;