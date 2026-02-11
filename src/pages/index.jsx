import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getAverageRating, getProductReviews } from '@/data/productReviews';
import { toast } from 'react-toastify';
import SEO from '@/components/SEO';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('تمت إضافة المنتج إلى السلة');
  };
  
  return (
    <>
      <SEO 
        title="إماراتي ستور - مخزونك في جيبك | شحن مجاني"
        description="أفضل متجر إلكتروني في 7 دول عربية. شحن مجاني لجميع الطلبات. توصيل سريع 1-3 أيام. منتجات أصلية 100%. تسوق في الإمارات والسعودية ومصر"
        keywords="متجر إلكتروني, تسوق أونلاين, شحن مجاني, إماراتي ستور, تسوق في الإمارات, تسوق في السعودية, تسوق في مصر, توصيل سريع"
        url="https://emeratis-store.com"
      />
      <Head>
        <title>إماراتي ستور - الصفحة الرئيسية</title>
        <meta name="description" content="إماراتي ستور - مخزونك في جيبك" />
      </Head>

      {/* Hero Slider */}
      <section className="relative bg-gradient-to-l from-primary to-primary-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 text-center md:text-right">
              <h2 className="text-3xl md:text-6xl font-bold leading-tight">مرحباً بك في إماراتي ستور</h2>
              <p className="text-xl md:text-2xl opacity-95 font-bold">مخزونك في جيبك</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/shop" className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-bold hover:bg-light-gray transition shadow-lg">
                  تسوق الآن
                </Link>
                <Link href="/shop" className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-md text-base md:text-lg font-bold hover:bg-white hover:text-primary transition">
                  عرض المنتجات
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white bg-opacity-20 rounded-xl p-6">
                    <div className="text-4xl font-bold">500+</div>
                    <div className="text-sm opacity-90">منتج</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6">
                    <div className="text-4xl font-bold">100%</div>
                    <div className="text-sm opacity-90">ضمان</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6">
                    <div className="text-4xl font-bold">مجاني</div>
                    <div className="text-sm opacity-90">الشحن</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6">
                    <div className="text-4xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">دعم</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-6 md:py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
              <div className="bg-primary bg-opacity-10 p-3 md:p-4 rounded-full">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm md:text-base">شحن مجاني</h3>
                <p className="text-xs md:text-sm text-dark-3">لجميع الطلبات</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
              <div className="bg-primary bg-opacity-10 p-3 md:p-4 rounded-full">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm md:text-base">توصيل سريع</h3>
                <p className="text-xs md:text-sm text-dark-3">1-3 أيام</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
              <div className="bg-primary bg-opacity-10 p-3 md:p-4 rounded-full">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm md:text-base">دفع آمن</h3>
                <p className="text-xs md:text-sm text-dark-3">100% مضمون</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
              <div className="bg-primary bg-opacity-10 p-3 md:p-4 rounded-full">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-dark text-sm md:text-base">إرجاع سهل</h3>
                <p className="text-xs md:text-sm text-dark-3">14 يوم</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-dark mb-2 md:mb-4">المنتجات المميزة</h2>
            <p className="text-dark-3 text-base md:text-lg">اكتشف أحدث منتجاتنا بأفضل الأسعار</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-hover transition-all duration-300 group">
                <div className="relative h-48 md:h-64 overflow-hidden cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {product.salePrice < product.price && (
                    <span className="absolute top-2 md:top-3 right-2 md:right-3 bg-danger text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold shadow-lg">
                      -{Math.round((1 - product.salePrice / product.price) * 100)}%
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 bg-primary text-white py-1.5 md:py-2 rounded-md font-bold text-xs md:text-base opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    أضف للسلة
                  </button>
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-dark font-semibold mb-1 md:mb-2 h-10 md:h-12 overflow-hidden cursor-pointer hover:text-primary transition text-xs md:text-base line-clamp-2" onClick={() => router.push(`/product/${product.id}`)}>
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.round(getAverageRating(product.id)) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({getProductReviews(product.id).length})</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-lg md:text-2xl font-bold text-primary">{product.salePrice} د.إ</span>
                    {product.salePrice < product.price && (
                      <span className="text-gray-400 line-through text-xs md:text-base">{product.price} د.إ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link href="/shop" className="inline-block bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-primary-dark transition shadow-lg text-base md:text-lg">
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-secondary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">احصل على خصم حتى 50%</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">على جميع المنتجات المختارة + شحن مجاني</p>
          <Link href="/shop" className="inline-block bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-primary-dark transition shadow-lg text-base md:text-lg">
            تسوق الآن
          </Link>
        </div>
      </section>
    </>
  );
}
