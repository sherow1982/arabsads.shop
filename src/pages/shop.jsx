import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getAverageRating, getProductReviews } from '@/data/productReviews';
import { toast } from 'react-toastify';

const CATEGORIES = [
  'اجهزة منزلية',
  'العاب',
  'العدد والادوات',
  'الكترونيات',
  'عطور',
  'مستلزمات السيارات',
  'مستلزمات المطبخ',
  'مستلزمات المنزل',
  'مستلزمات رياضية',
  'مستلزمات طبية',
  'مشدات',
];

export default function Shop() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(24);

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

  const openProduct = (product, e) => {
    if (e) e.stopPropagation();
    router.push(`/product/${product.slug}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDisplayCount(24);
    router.push(`/shop?category=${encodeURIComponent(category)}`, undefined, { shallow: true });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <>
      <Head>
        <title>المتجر - إعلانات العرب الكويت</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-10 overflow-x-hidden">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dark mb-2">جميع المنتجات</h2>
          <p className="text-dark-3">عدد المنتجات: {filteredProducts.length}</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => { setSelectedCategory(''); router.push('/shop', undefined, { shallow: true }); }}
              className={`px-4 py-2 rounded-full font-bold text-sm transition ${!selectedCategory ? 'bg-primary text-white' : 'bg-white text-dark border border-gray-200 hover:border-primary'}`}
            >
              الكل ({products.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white text-dark border border-gray-200 hover:border-primary'}`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
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
                <h3 className="text-lg font-bold text-dark mb-3">الفئات</h3>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => { setSelectedCategory(''); router.push('/shop', undefined, { shallow: true }); }} className={`w-full text-right py-1 px-2 rounded transition ${!selectedCategory ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}>
                      الكل ({products.length})
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button onClick={() => handleCategoryClick(cat)} className={`w-full text-right py-1 px-2 rounded transition ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}>
                        {cat} ({products.filter(p => p.category === cat).length})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-hover transition-all duration-300 group">
                  <div className="relative h-48 md:h-64 overflow-hidden cursor-pointer" onClick={(e) => openProduct(product, e)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    {product.salePrice < product.price && (
                      <span className="absolute top-3 right-3 bg-danger text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-3 left-3 right-3 bg-primary text-white py-2 rounded-md font-bold opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    >
                      أضف للسلة
                    </button>
                  </div>
                  <div className="p-3 md:p-4">
                    <span className="text-xs text-primary font-medium bg-primary bg-opacity-10 px-2 py-0.5 rounded mb-1 inline-block">{product.category}</span>
                    <h3 className="text-dark font-semibold mb-2 h-10 overflow-hidden cursor-pointer hover:text-primary transition text-sm line-clamp-2" onClick={(e) => openProduct(product, e)}>
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">{product.salePrice.toFixed(3)} د.ك</span>
                      {product.salePrice < product.price && (
                        <span className="text-gray-400 line-through text-sm">{product.price.toFixed(3)} د.ك</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setDisplayCount(displayCount + 24)}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-md font-bold hover:opacity-90 transition shadow-lg text-lg"
                >
                  مشاهدة المزيد ({filteredProducts.length - displayCount} منتج)
                </button>
              </div>
            )}

            {!hasMore && filteredProducts.length > 24 && (
              <div className="text-center mt-12">
                <p className="text-dark-3 text-lg">تم عرض جميع المنتجات ({filteredProducts.length})</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
