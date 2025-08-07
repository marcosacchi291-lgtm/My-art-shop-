// components/CartDesktop.tsx
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const CartDesktop = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      ref={cartRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.cartDesktopContainer} cart-container`} // Aggiungi la classe cart-container qui
      style={{ zIndex: 10 }}
    >
      <button
        className={styles.cartDesktopButton}
      >
        🛒 ({totalItems})
      </button>

      {isOpen && (
        <div
          className={styles.cartDesktopPopup}
        >
          <h3 style={{ margin: 0, borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
            Il tuo carrello
          </h3>
          {cartItems.length === 0 ? (
            <p>Il carrello è vuoto.</p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #444',
                      padding: '0.5rem 0',
                    }}
                  >
                    <div>
                      <p style={{ margin: 0 }}>{item.title}</p>
                      <span style={{ fontSize: '0.8rem', color: '#aaa' }}>€{item.price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '0.5rem' }}
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                  fontWeight: 'bold',
                }}
              >
                <span>Totale:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#d62828',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '5px',
                  marginTop: '1rem',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                  Vai al checkout
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDesktop;