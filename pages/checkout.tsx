// pages/checkout.tsx
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { MedievalSharp } from 'next/font/google';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';
import pick from 'lodash/pick';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const CheckoutPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const t = useTranslations('CheckoutPage');
  const tCart = useTranslations('Cart');

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Head>
        <title>{`${t('pageTitle')} | Trieste Sadness Digital Arts Shop`}</title>
      </Head>
      
      <main className={styles.checkoutContainer} style={{ paddingTop: '6rem' }}>
        <h1 className={`${medieval.className} ${styles.title}`} style={{
          // --- OMBRA AGGIUNTA ---
          textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)'
        }}>
          {t('mainTitle')}
        </h1>
        
        <div className={styles.contentWrapper}>
          <div className={styles.orderSummary}>
            <h2 className={medieval.className}>{t('orderSummaryTitle')}</h2>
            {cartItems.length === 0 ? (
              <p>{tCart('emptyCart')}</p>
            ) : (
              <ul className={styles.cartList}>
                {cartItems.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <div>
                      <span>{item.title}</span>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.quantityButton}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.quantityButton}>+</button>
                        <button onClick={() => removeFromCart(item.id)} className={styles.quantityButton} style={{ marginLeft: '0.5rem' }}>&times;</button>
                      </div>
                    </div>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <div className={styles.total}>
                  <span>{t('total')}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </ul>
            )}
          </div>
          
          <div className={styles.paymentForm}>
            <h2 className={medieval.className}>{t('paymentDetailsTitle')}</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="email">{t('emailLabel')}</label>
                <input id="email" type="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="paymentMethod">{t('paymentMethodLabel')}</label>
                <select id="paymentMethod">
                  <option>{t('creditCard')}</option>
                  <option>{t('paypal')}</option>
                </select>
              </div>
              <button type="submit" className={styles.confirmButton}>
                {t('confirmButton')}
              </button>
            </form>
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
      messages: pick(messages, ['CheckoutPage', 'HomePage', 'Header', 'Cart'])
    }
  };
}

export default CheckoutPage;