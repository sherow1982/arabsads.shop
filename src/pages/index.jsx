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

const CATEGORIES = [
  { name: 'اجهزة منزلية', icon: '🏠' },
  { name: 'العاب', icon: '🎮' },
  { name: 'العدد والادوات', icon: '🔧' },
  { name: 'الكترونيات', icon: '📱' },
  { name: 'عطور', icon: '🌸' },
  { name: 'مستلزمات السيارات', icon: '🚗' },
  { name: 'مستلزمات المطبخ', icon: '🍳' },
  { name: 'مستلزمات المنزل', icon: '🛋️' },
  { name: 'مستلزمات رياضية', icon: '⚽' },
  { name: 'مستلزمات طبية', icon: '💊' },
  { name: 'مشدات', icon: '👗' },
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('تمت إضافة المنتج إلى السلة');
  };

  const openProduct = (product) => router.push(`/product/${product.slug}`);
  
  return (
    <>
      <SEO 
        title="إعلانات العرب الكويت - تسوق أونلاين | شحن مجاني"
        description="أفضل متجر إلكتروني في الكويت. شحن مجاني لجميع الطلبات. توصيل سريع 1-3 أيام. منتجات أصلية 100%. تسوق في الكويت العاصمة والمحافظات"
        keywords="متجر إلكتروني الكويت, تسوق أونلاين الكويت, شحن مجاني الكويت, إعلانات العرب, arabsads"
        url="https://arabsads.shop"
      />

      {/* Hero Slider */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">منتجاتنا المميزة</h2>
            <p className="text-xl md:text-2xl text-white opacity-90">اكتشف أفضل العروض في الكويت 🇰🇼</p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            className="product-slider"
          >
            {products.slice(0, 12).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform transition-all hover:scale-105" onClick={() => openProduct(product)} role="button" tabIndex={0}>
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
                        <span className="text-3xl font-black text-primary">{product.salePrice.toFixed(3)} د.ك</span>
                        {product.salePrice < product.price && (
                          <span className="text-lg text-gray-400 line-through ml-2">{product.price.toFixed(3)} د.ك</span>
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
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-bold text-dark text-xs md:text-sm">{cat.name}</h3>
              </Link>
            ))}
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
                <div className="relative h-48 md:h-64 overflow-hidden cursor-pointer" onClick={() => openProduct(product)}>
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
                  <h3 className="text-dark font-semibold mb-1 md:mb-2 h-10 md:h-12 overflow-hidden cursor-pointer hover:text-primary transition text-xs md:text-base line-clamp-2" onClick={() => openProduct(product)}>
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
                    <span className="text-lg md:text-2xl font-bold text-primary">{product.salePrice.toFixed(3)} د.ك</span>
                    {product.salePrice < product.price && (
                      <span className="text-gray-400 line-through text-xs md:text-base">{product.price.toFixed(3)} د.ك</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link href="/shop" className="inline-block bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-primary-dark transition shadow-lg text-base md:text-lg">
              عرض جميع المنتجات ({products.length})
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-secondary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">احصل على خصم حتى 50%</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">على جميع المنتجات المختارة + شحن مجاني داخل الكويت 🇰🇼</p>
          <Link href="/shop" className="inline-block bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-primary-dark transition shadow-lg text-base md:text-lg">
            تسوق الآن
          </Link>
        </div>
      </section>
    </>
  );
}
