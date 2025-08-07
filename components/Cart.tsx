// components/Cart.tsx
'use client';
import useMediaQuery from '../hooks/useMediaQuery';
import CartDesktop from './CartDesktop';
import CartMobile from './CartMobile';

const Cart = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <CartMobile /> : <CartDesktop />;
};

export default Cart;