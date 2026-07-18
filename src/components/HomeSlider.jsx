import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function HomeSlider({ products, onAddToCart, onOpenProduct }) {
  return (
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
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl cursor-pointer transform transition-all hover:scale-105"
            onClick={() => onOpenProduct(product)}
            role="button"
            tabIndex={0}
          >
            <div className="relative h-80 md:h-96">
              <img
                src={product.image}
                alt={product.title}
                width="350"
                height="384"
                loading="lazy"
                className="w-full h-full object-cover"
              />
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
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
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
  );
}
