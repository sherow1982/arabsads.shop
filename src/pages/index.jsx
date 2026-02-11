import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { toast } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('تمت إضافة المنتج إلى السلة');
  };
  
  return (
    <>
      <Head>
        <title>متجر إماراتي - الصفحة الرئيسية</title>
        <meta name="description" content="متجر إماراتي للتسوق الإلكتروني" />
      </Head>

      <div className="bg-gray-1">
        {/* Header */}
        <header className="bg-white shadow-1 sticky top-0 z-999">
          <div className="max-w-[1170px] mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-dark">متجر إماراتي</h1>
              <nav className="flex gap-6">
                <Link href="/" className="text-dark-3 hover:text-blue transition">الرئيسية</Link>
                <Link href="/shop" className="text-dark-3 hover:text-blue transition">المتجر</Link>
                <Link href="/cart" className="text-dark-3 hover:text-blue transition">
                  السلة ({mounted ? items.length : 0})
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-r from-blue to-blue-dark text-white py-20">
          <div className="max-w-[1170px] mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-4">مرحباً بك في متجر إماراتي</h2>
            <p className="text-xl opacity-90">أفضل المنتجات بأفضل الأسعار</p>
          </div>
        </section>

        {/* Products */}
        <section className="py-16">
          <div className="max-w-[1170px] mx-auto px-4">
            <h2 className="text-3xl font-bold text-dark text-center mb-12">المنتجات المميزة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-1 overflow-hidden hover:shadow-2 transition group">
                  <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                    {product.salePrice < product.price && (
                      <span className="absolute top-3 right-3 bg-red text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-dark font-medium mb-2 h-12 overflow-hidden cursor-pointer hover:text-blue transition" onClick={() => router.push(`/product/${product.id}`)}>
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-blue">{product.salePrice} د.إ</span>
                      <span className="text-gray-5 line-through">{product.price} د.إ</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue text-white py-3 rounded-md font-medium hover:bg-blue-dark transition"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/shop" className="inline-block bg-dark text-white px-8 py-3 rounded-md font-medium hover:bg-dark-2 transition">
                عرض جميع المنتجات
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-white py-8 mt-16">
          <div className="max-w-[1170px] mx-auto px-4 text-center">
            <p>&copy; 2024 متجر إماراتي. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
