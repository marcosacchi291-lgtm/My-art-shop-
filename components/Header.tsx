// components/Header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/router'; 
import Cart from './Cart';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <header className={styles.header}>
      {isHomePage ? (
        <Link href="/" className={styles.logo}>
          Trieste Sadness
        </Link>
      ) : (
        <Link href="/" className={styles.logo}>
          &larr; Torna alla Home
        </Link>
      )}
      <nav className={styles.nav}>
        <Cart />
      </nav>
    </header>
  );
};

export default Header;