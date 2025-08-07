// pages/prodotto/[id].tsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MedievalSharp } from 'next/font/google';
import Cart from '../../components/CartDesktop';
import { useCart } from '../../context/CartContext';

// Importa i dati delle gallerie
import { gallerie } from './../data/gallerie';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

// Funzione helper per trovare un prodotto in tutte le gallerie
const findProductById = (id: string) => {
  for (const galleria of gallerie) {
    const product = galleria.immaginiGalleria.find(item => item.id === id);
    if (product) {
      return product;
    }
  }
  return null;
};

const ProdottoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const product = findProductById(id as string);

  // Se il prodotto non viene trovato, mostra un messaggio di errore
  if (!product) {
    return <div>Prodotto non trovato.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Head>
        <title>{product.title} | Trieste Sadness Tattoo Shop</title>
      </Head>

      <main style={{ padding: '2rem' }}>
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10 }}>
          <Cart />
        </div>
        
        {/* Modificato il Link per tornare alla pagina precedente */}
        <a 
          onClick={() => router.back()} 
          style={{ color: '#aaa', textDecoration: 'none', marginBottom: '1rem', display: 'block', cursor: 'pointer' }}
        >
          &larr; Torna alla galleria
        </a>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={product.url}
            alt={product.alt}
            style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '8px' }}
          />
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <h1 className={medieval.className} style={{ fontSize: '2.5rem', margin: 0 }}>{product.title}</h1>
            <p style={{ marginTop: '0.5rem', color: '#888' }}>{product.description}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#d62828' }}>€{product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
                fontSize: '1.2rem',
              }}
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProdottoPage;