// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcherDropdown from './LanguageSwitcherDropdown';

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const tHeader = useTranslations('Header');
  const tCart = useTranslations('Cart');
  const tHome = useTranslations('HomePage'); // <-- Carichiamo anche le traduzioni della home

  useEffect(() => {
    if (!isMobile) {
      setIsCartOpen(false);
    }
  }, [isMobile]);

  const renderCartContent = () => {
    if (cartItems.length === 0) return <p>{tCart('emptyCart')}</p>;
    return (
      <>
        <h4 style={{ marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>{tCart('summaryTitle')}</h4>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>{item.title} (x{item.quantity})</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr style={{ border: 'none', borderTop: '1px solid #444', margin: '1rem 0' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>{tCart('total')}:</span>
          <span>€{cartTotal}</span>
        </div>
        <Link href="/checkout" style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '1rem', backgroundColor: '#d62828', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '5px', fontWeight: 'bold' }}>
          {tCart('goToCheckout')}
        </Link>
      </>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        
        {/* Lato sinistro con la nuova logica */}
        {isHomePage ? (
          <Link href="/" className={styles.logo}>
            {tHome('logoText')}
          </Link>
        ) : (
          <Link href="/" className={styles.backLink} dangerouslySetInnerHTML={{ __html: tHeader('returnToHome') }} />
        )}
        
        {/* Lato destro */}
        <nav className={styles.nav}>
          <LanguageSwitcherDropdown />
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={!isMobile ? () => setIsCartOpen(true) : undefined}
            onMouseLeave={!isMobile ? () => setIsCartOpen(false) : undefined}
          >
            <button 
              onClick={() => setIsCartOpen(prev => !prev)}
              className={styles.cartButton}
            >
              🛒 ({totalItems})
            </button>
            <AnimatePresence>
              {isCartOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => isMobile && e.stopPropagation()}
                  className={styles.cartDropdown}
                >
                  {renderCartContent()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;