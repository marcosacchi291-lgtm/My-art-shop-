// pages/_app.tsx
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

// Usiamo la scorciatoia '@/' che abbiamo configurato
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
 
  return (
    <CartProvider>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Rome" // Puoi cambiare il fuso orario se necessario
        messages={pageProps.messages}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextIntlClientProvider>
    </CartProvider>
  );
}