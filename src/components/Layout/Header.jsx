import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Header() {
  const { items } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <div className="flex flex-wrap gap-3 md:gap-6 justify-center md:justify-start">
              <span className="hidden sm:inline">📧 sherow1982@gmail.com</span>
              <span>📱 +201110760081</span>
            </div>
            <div>
              <span className="font-bold">🚚 شحن مجاني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="cursor-pointer hover:opacity-90 transition flex items-center gap-3">
                <img src="/logo.jpg" alt="إماراتي ستور" className="h-12 md:h-16 w-auto object-contain" />
                <div>
                  <h1 className="text-xl md:text-3xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    إماراتي ستور
                  </h1>
                  <p className="text-xs md:text-sm font-bold text-accent">مخزونك في جيبك</p>
                </div>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link href="/" className="text-dark hover:text-primary transition font-medium">الرئيسية</Link>
              <Link href="/shop" className="text-dark hover:text-primary transition font-medium">المتجر</Link>
              <Link href="/about" className="text-dark hover:text-primary transition font-medium">من نحن</Link>
              <Link href="/cart" className="relative">
                <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-md hover:opacity-90 transition font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>السلة</span>
                  {mounted && items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
              </Link>
            </nav>

            {/* Mobile Menu Button & Cart */}
            <div className="flex md:hidden items-center gap-3">
              <Link href="/cart" className="relative">
                <div className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {mounted && items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-dark p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-dark hover:text-primary transition font-medium py-2">الرئيسية</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-dark hover:text-primary transition font-medium py-2">المتجر</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-dark hover:text-primary transition font-medium py-2">من نحن</Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
