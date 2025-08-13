// components/Layout.tsx
import React, { ReactNode } from 'react';
import Header from '@/components/Header'; // Uso l'alias per coerenza

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> se ne avessi uno */}
    </>
  );
};

export default Layout;