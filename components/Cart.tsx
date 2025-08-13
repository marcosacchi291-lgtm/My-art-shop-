// components/Cart.tsx
'use client';

import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import styles from './Cart.module.css';
import useMediaQuery from '../hooks/useMediaQuery';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Chiudi il carrello se si cambia da mobile a desktop, per evitare che rimanga aperto
    if (!isMobile) {
      setIsCartOpen(false);
    }
  }, [isMobile]);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  // Se è mobile, rendiamo il pulsante fisso e l'overlay a schermo intero
  if (isMobile) {
    return (
      <>
        <div className={styles.cartMobileButtonFixed}>
          <button onClick={() => setIsCartOpen(true)} className={styles.cartButton}>
            Carrello ({cartItems.length})
          </button>
        </div>
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              className={styles.cartMobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                className={styles.cartMobilePanel}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.cartMobileHeader}>
                  <h3>Carrello</h3>
                  <button onClick={() => setIsCartOpen(false)} className={styles.closeMobileCartButton}>
                    &times;
                  </button>
                </div>
                <ul className={styles.cartListMobile}>
                  {cartItems.map((item) => (
                    <li key={item.id} className={styles.cartItemMobile}>
                      <span>{item.title} - {item.price}€</span>
                      <div className={styles.quantityControlsMobile}>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.totalMobile}>
                  <span>Totale:</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <Link href="/checkout" className={styles.checkoutButton} onClick={() => setIsCartOpen(false)}>
                  Vai al Checkout
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Se non è mobile, rendiamo il carrello desktop
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={styles.cartDesktopContainer}
    >
      <button className={styles.cartButton}>
        Carrello ({cartItems.length})
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.cartDesktopPopup}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className={styles.cartListDesktop}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItemDesktop}>
                  <span>{item.title} - {item.price}€</span>
                  <div className={styles.quantityControlsDesktop}>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.totalDesktop}>
              <span>Totale:</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <Link href="/checkout" className={styles.checkoutButton}>
              Vai al Checkout
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;