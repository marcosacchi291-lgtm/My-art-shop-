// components/LanguageSwitcherDropdown.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css'; // <-- 1. Importa il file di stile

const LanguageSwitcherDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const currentLocale = router.locale;

  const getLabel = (locale) => {
    switch (locale) {
      case 'it': return 'Italiano';
      case 'en': return 'English';
      case 'es': return 'Español';
      default: return 'Lingua';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.langButton} // <-- 2. Applica la nuova classe
      >
        {getLabel(currentLocale)}
        <span style={{ fontSize: '0.8rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
      </button>

      {isOpen && (
        <ul style={{ position: 'absolute', top: '150%', right: 0, listStyle: 'none', margin: 0, padding: '0.5rem 0', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '5px', zIndex: 100 }}>
          {router.locales.map((locale) => (
            <li key={locale}>
              <Link
                href={{ pathname, query }}
                locale={locale}
                onClick={() => setIsOpen(false)}
                style={{ display: 'block', padding: '0.75rem 1.5rem', textDecoration: 'none', color: '#fff', whiteSpace: 'nowrap' }}
              >
                {getLabel(locale)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcherDropdown;