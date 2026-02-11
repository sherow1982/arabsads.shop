import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { toast } from 'react-toastify';

export default function Shop() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <>
      <Head>
        <title>المتجر - متجر إماراتي</title>
      </Head>

      <div className="bg-gray-1 min-h-screen">
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

        {/* Shop Content */}
        <div className="max-w-[1170px] mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-2">جميع المنتجات</h2>
            <p className="text-dark-4">عدد المنتجات: {filteredProducts.length}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-1 p-6 sticky top-24">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-dark mb-3">البحث</h3>
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-dark mb-3">نطاق السعر</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      placeholder="من"
                      className="w-full px-3 py-2 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      placeholder="إلى"
                      className="w-full px-3 py-2 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-1 overflow-hidden hover:shadow-2 transition group cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <div className="relative h-64 overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                      {product.salePrice < product.price && (
                        <span className="absolute top-3 right-3 bg-red text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{Math.round((1 - product.salePrice / product.price) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-dark font-medium mb-2 h-12 overflow-hidden">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-blue">{product.salePrice} د.إ</span>
                        <span className="text-gray-5 line-through">{product.price} د.إ</span>
                      </div>
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full bg-blue text-white py-3 rounded-md font-medium hover:bg-blue-dark transition"
                      >
                        أضف للسلة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
