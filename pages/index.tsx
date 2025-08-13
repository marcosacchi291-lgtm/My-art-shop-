// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { gallerieData } from '@/data/gallerie-i18n.ts';
import pick from 'lodash/pick';

const Home = () => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const { locale } = router;
  
  const validGalleries = gallerieData[locale] || gallerieData.it;
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>{`${t('title')}`}</title>
      </Head>

      <main style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center', minHeight: '100vh',
        backgroundImage: 'url("/new-background.jpg")', backgroundSize: 'cover',
        backgroundPosition: 'center 25%', backgroundAttachment: 'fixed',
        backgroundColor: '#121212', color: '#fff',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{
            position: 'relative', width: '100%', height: '70vh', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            overflow: 'hidden', padding: '0 1rem',
          }}>
            <h1 style={{
              fontSize: '2.8rem', color: '#fff', margin: 0,
              textShadow: '0px 2px 5px rgba(0, 0, 0, 0.7)', // <-- OMBRA AGGIUNTA
            }}>
              {t('heroTitle')} <br />
              <span style={{ fontSize: '1.5rem', color: '#ddd' }}>{t('heroSubtitle')}</span>
            </h1>
            <p style={{
              marginTop: '1rem', fontSize: '1.5rem', color: '#ddd',
              textShadow: '0px 2px 5px rgba(0, 0, 0, 0.7)', // <-- OMBRA AGGIUNTA
            }}>
              {t('heroDescription')}
            </p>
          </div>
          <nav style={{
            padding: '1rem 0', width: '100%', textAlign: 'center', display: 'flex',
            justifyContent: 'center', gap: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}>
            <Link href="/disegni-su-richiesta" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem' }}>
              {t('requestDrawing')}
            </Link>
          </nav>
          <div style={{ padding: '2rem 0', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              {t('galleriesTitle')}
            </h2>
            <div style={{
              display: 'flex', gap: '1rem', maxWidth: '1200px', margin: '0 auto',
              ...(!isMobile && { justifyContent: 'center', alignItems: 'center' }),
              ...(isMobile && { overflowX: 'auto', padding: '0 2rem' }),
              scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
            }}>
              {validGalleries.map((galleria, index) => (
                <div
                  key={galleria.slug}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    flexShrink: 0, width: '250px', height: '370px',
                    borderRadius: '10px', overflow: 'hidden', position: 'relative',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredIndex === index ? '0 8px 30px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  <Link href={`/galleria/${galleria.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <div style={{
                      width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
                      backgroundImage: `url(${galleria.immagineCarosello})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '1rem',
                    }}>
                      <h3 style={{ color: '#fff', fontSize: '1.5rem', textShadow: '0 0 5px black' }}>
                        {galleria.nome}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps({locale}) {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return {
    props: {
      messages: pick(messages, ['HomePage', 'Header', 'Cart'])
    }
  };
}

export default Home;