// components/Cart.tsx
'use client';

import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={styles.cartDesktopContainer} // Rilevanza: Desktop e Mobile
    >
      <button className={styles.cartButton}>
        Carrello ({cartItems.length})
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.cartDesktopPopup} // Rilevanza: Desktop e Mobile
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className={styles.cartListDesktop}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItemDesktop}>
                  <span>
                    {item.title} - {item.price}€
                  </span>
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