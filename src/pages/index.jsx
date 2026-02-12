import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getAverageRating, getProductReviews } from '@/data/productReviews';
import { toast } from 'react-toastify';
import SEO from '@/components/SEO';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

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
        title="عماني ستور - مخزونك في جيبك | شحن مجاني"
        description="أفضل متجر إلكتروني في سلطنة عمان. شحن مجاني لجميع الطلبات. توصيل سريع 1-3 أيام. منتجات أصلية 100%. تسوق في مسقط وصلالة"
        keywords="متجر إلكتروني عمان, تسوق أونلاين عمان, شحن مجاني عمان, عماني ستور, تسوق في مسقط, تسوق في صلالة, توصيل سريع"
        url="https://omany.storesads.shop"
      />
      <Head>
        <title>عماني ستور - الصفحة الرئيسية</title>
        <meta name="description" content="عماني ستور - مخزونك في جيبك" />
      </Head>

      {/* Hero Slider */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">منتجاتنا المميزة</h2>
            <p className="text-xl md:text-2xl text-white opacity-90">اكتشف أفضل العروض</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="product-slider"
            breakpoints={{
              320: {
                coverflowEffect: {
                  rotate: 20,
                  depth: 80,
                }
              },
              768: {
                coverflowEffect: {
                  rotate: 50,
                  depth: 100,
                }
              }
            }}
          >
            {products.slice(0, 12).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform transition-all hover:scale-105" onClick={() => router.push(`/product/${product.id}`)}>
                  <div className="relative h-80 md:h-96">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    {product.salePrice < product.price && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-pulse">
                        -{Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-6 bg-gradient-to-t from-white to-gray-50">
                    <h3 className="text-xl font-bold text-dark mb-3 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-black text-primary">{product.salePrice} ر.ع</span>
                        {product.salePrice < product.price && (
                          <span className="text-lg text-gray-400 line-through ml-2">{product.price} ر.ع</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-dark transition shadow-lg"
                      >
                        أضف للسلة
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-dark mb-2">تسوق حسب الفئة</h2>
            <p className="text-dark-3">اختر الفئة المناسبة لك</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link href="/shop?category=ساعات" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">ساعات</h3>
              <p className="text-sm text-dark-3">ساعات فاخرة</p>
            </Link>
            <Link href="/shop?category=حقائب" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">حقائب</h3>
              <p className="text-sm text-dark-3">حقائب عصرية</p>
            </Link>
            <Link href="/shop?category=عطور" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">عطور</h3>
              <p className="text-sm text-dark-3">عطور فاخرة</p>
            </Link>
            <Link href="/shop?category=أدوات مطبخ" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">أدوات مطبخ</h3>
              <p className="text-sm text-dark-3">أدوات عملية</p>
            </Link>
            <Link href="/shop?category=إضاءة" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">إضاءة</h3>
              <p className="text-sm text-dark-3">إضاءة مميزة</p>
            </Link>
            <Link href="/shop?category=صحة وعناية" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">صحة وعناية</h3>
              <p className="text-sm text-dark-3">منتجات صحية</p>
            </Link>
            <Link href="/shop?category=إكسسوارات سيارات" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">إكسسوارات سيارات</h3>
              <p className="text-sm text-dark-3">ملحقات السيارات</p>
            </Link>
            <Link href="/shop?category=أطفال" className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-dark mb-1">أطفال</h3>
              <p className="text-sm text-dark-3">منتجات الأطفال</p>
            </Link>
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
                    <span className="text-lg md:text-2xl font-bold text-primary">{product.salePrice} ر.ع</span>
                    {product.salePrice < product.price && (
                      <span className="text-gray-400 line-through text-xs md:text-base">{product.price} ر.ع</span>
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
