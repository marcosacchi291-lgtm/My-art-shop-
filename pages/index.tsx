// pages/index.tsx
'use client';
import useMediaQuery from '../hooks/useMediaQuery';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

const Home = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;