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
            <button onClick={() => handleCategoryClick('ساعات')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'ساعات' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">ساعات</h4>
            </button>
            <button onClick={() => handleCategoryClick('حقائب')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'حقائب' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">حقائب</h4>
            </button>
            <button onClick={() => handleCategoryClick('عطور')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'عطور' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">عطور</h4>
            </button>
            <button onClick={() => handleCategoryClick('أدوات مطبخ')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أدوات مطبخ' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">مطبخ</h4>
            </button>
            <button onClick={() => handleCategoryClick('إضاءة')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'إضاءة' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">إضاءة</h4>
            </button>
            <button onClick={() => handleCategoryClick('صحة وعناية')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'صحة وعناية' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">صحة</h4>
            </button>
            <button onClick={() => handleCategoryClick('إكسسوارات سيارات')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'إكسسوارات سيارات' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">سيارات</h4>
            </button>
            <button onClick={() => handleCategoryClick('أطفال')} className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center ${selectedCategory === 'أطفال' ? 'ring-2 ring-primary' : ''}`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-dark text-sm">أطفال</h4>
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
                  placeholder="ابحث عن منتج..."
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
                    placeholder="من"
                    className="w-full px-3 py-2 border border-light-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    placeholder="إلى"
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
