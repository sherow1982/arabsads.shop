import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { toast } from 'react-toastify';

export default function Shop() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [displayCount, setDisplayCount] = useState(12);

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

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <>
      <Head>
        <title>المتجر - إماراتي ستور</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-dark mb-2">جميع المنتجات</h2>
          <p className="text-dark-3">عدد المنتجات: {filteredProducts.length}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">{product.salePrice} د.إ</span>
                      {product.salePrice < product.price && (
                        <span className="text-gray-400 line-through">{product.price} د.إ</span>
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
