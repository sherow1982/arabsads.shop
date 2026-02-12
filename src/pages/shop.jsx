import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getAverageRating, getProductReviews } from '@/data/productReviews';
import { toast } from 'react-toastify';

export default function Shop() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    if (router.query.category) {
      setSelectedCategory(router.query.category);
    }
  }, [router.query.category]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    router.push(`/shop?category=${encodeURIComponent(category)}`, undefined, { shallow: true });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <>
      <Head>
        <title>المتجر - عماني ستور</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-10 overflow-x-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dark mb-2">جميع المنتجات</h2>
          <p className="text-dark-3">عدد المنتجات: {filteredProducts.length}</p>
        </div>

        {/* Categories Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">تسوق حسب الفئة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <button onClick={() => handleCategoryClick('ساعات وإكسسوارات')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'ساعات وإكسسوارات' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">ساعات وإكسسوارات</h4>
            </button>
            <button onClick={() => handleCategoryClick('أدوات تصفيف الشعر')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أدوات تصفيف الشعر' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">أدوات تصفيف الشعر</h4>
            </button>
            <button onClick={() => handleCategoryClick('مستلزمات منزلية')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'مستلزمات منزلية' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">مستلزمات منزلية</h4>
            </button>
            <button onClick={() => handleCategoryClick('أجهزة مطبخ')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أجهزة مطبخ' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">أجهزة مطبخ</h4>
            </button>
            <button onClick={() => handleCategoryClick('أدوات مطبخ')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أدوات مطبخ' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">أدوات مطبخ</h4>
            </button>
            <button onClick={() => handleCategoryClick('أجهزة منزلية')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أجهزة منزلية' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">أجهزة منزلية</h4>
            </button>
            <button onClick={() => handleCategoryClick('إلكترونيات ذكية')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'إلكترونيات ذكية' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">إلكترونيات ذكية</h4>
            </button>
            <button onClick={() => handleCategoryClick('العناية بالبشرة')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'العناية بالبشرة' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h4 className="font-bold text-dark text-sm">العناية بالبشرة</h4>
            </button>
          </div>
          {selectedCategory && (
            <div className="text-center mt-4">
              <button onClick={() => { setSelectedCategory(''); router.push('/shop', undefined, { shallow: true }); }} className="text-primary hover:underline font-semibold">
                إلغاء التصفية ×
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-dark mb-3">البحث</h3>
                <input
                  type="text"
                  
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-light-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-dark mb-3">نطاق السعر</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    
                    className="w-full px-3 py-2 border border-light-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    
                    className="w-full px-3 py-2 border border-light-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-hover transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    {product.salePrice < product.price && (
                      <span className="absolute top-3 right-3 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 left-3 right-3 bg-primary text-white py-2 rounded-md font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      أضف للسلة
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-dark font-semibold mb-2 h-12 overflow-hidden cursor-pointer hover:text-primary transition" onClick={() => router.push(`/product/${product.id}`)}>
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({getProductReviews(product.id).length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{product.salePrice} ر.ع</span>
                      {product.salePrice < product.price && (
                        <span className="text-gray-400 line-through">{product.price} ر.ع</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setDisplayCount(displayCount + 12)}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-md font-bold hover:opacity-90 transition shadow-lg text-lg"
                >
                  مشاهدة المزيد
                </button>
              </div>
            )}

            {!hasMore && filteredProducts.length > 12 && (
              <div className="text-center mt-12">
                <p className="text-dark-3 text-lg">تم عرض جميع المنتجات</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
