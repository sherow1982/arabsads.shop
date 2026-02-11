import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function FloatingCart() {
  const { items } = useSelector((state) => state.cart);
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setShow(true);
    }
  }, [items]);

  if (!show || items.length === 0) return null;

  return (
    <button
      onClick={() => router.push('/cart')}
      className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:scale-110"
      aria-label="Cart"
    >
      <div className="relative">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-danger text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {items.length}
        </span>
      </div>
    </button>
  );
}
