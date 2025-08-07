// pages/checkout.tsx
import Head from 'next/head';
import Link from 'next/link';
import { MedievalSharp } from 'next/font/google';
import { useCart } from '../context/CartContext';
import styles from './Checkout.module.css';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Head>
        <title>Checkout | Trieste Sadness Digital Arts Shop</title>
      </Head>
      
      <main className={styles.checkoutContainer}>
        <Link href="/" className={styles.backLink}>
          &larr; Torna alla Home
        </Link>
        
        <h1 className={`${medieval.className} ${styles.title}`}>Checkout</h1>
        
        <div className={styles.contentWrapper}>
          
          {/* Riepilogo dell'ordine */}
          <div className={styles.orderSummary}>
            <h2 className={medieval.className}>Il tuo ordine</h2>
            {cartItems.length === 0 ? (
              <p>Il carrello è vuoto.</p>
            ) : (
              <ul className={styles.cartList}>
                {cartItems.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <div>
                      <span>{item.title}</span>
                      <div className={styles.quantityControls}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={styles.quantityButton}>-</button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={styles.quantityButton}>+</button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className={styles.quantityButton} style={{ marginLeft: '0.5rem' }}>x</button>
                      </div>
                    </div>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <div className={styles.total}>
                  <span>Totale:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </ul>
            )}
          </div>
          
          {/* Form per il pagamento */}
          <div className={styles.paymentForm}>
            <h2 className={medieval.className}>Dettagli per il pagamento</h2>
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label>Indirizzo email</label>
                <input type="email" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Metodo di pagamento</label>
                <select>
                  <option>Carta di credito</option>
                  <option>PayPal</option>
                </select>
              </div>
              <button
                type="submit"
                className={styles.confirmButton}
              >
                Conferma ordine
              </button>
            </form>
          </div>
          
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;