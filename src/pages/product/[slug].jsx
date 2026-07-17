import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { products } from '@/data/products';
import { getProductReviews, getProductFAQs, getAverageRating } from '@/data/productReviews';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import * as gtag from '@/lib/gtag';

export async function getStaticPaths() {
  const paths = products.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

function cleanDesc(text) {
  return (text || '')
    .replace(/^الوصف\s*/g, '')
    .replace(/وصف المنتج\s*:?\s*/g, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

const TABS = [
  { key: 'description', label: 'الوصف', icon: '📋' },
  { key: 'shipping',    label: 'الشحن',  icon: '🚚' },
  { key: 'returns',     label: 'الإرجاع', icon: '🔄' },
  { key: 'reviews',     label: 'التقييمات', icon: '⭐' },
  { key: 'faqs',        label: 'الأسئلة', icon: '❓' },
];

export default function ProductDetail({ product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const reviews = getProductReviews(product?.id);
  const faqs = getProductFAQs(product?.id);
  const averageRating = getAverageRating(product?.id);

  useEffect(() => { if (product) gtag.viewItem(product); }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
    gtag.addToCart(product, quantity);
    toast.success(`تمت إضافة ${quantity} من ${product.title} إلى السلة`);
  };

  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  const canonicalUrl = `https://arabsads.shop/product/${product.slug}`;
  const allImages = (product.images?.length ? product.images : [product.image]).slice(0, 5);
  const metaDesc = `${product.title} بسعر ${product.salePrice.toFixed(3)} د.ك. ${(product.description || '').replace(/الوصف\s*/g, '').substring(0, 100)}. شحن مجاني داخل الكويت.`;

  return (
    <>
      <Head>
        <title>{product.title} - إعلانات العرب الكويت | {product.salePrice.toFixed(3)} د.ك</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={`${product.title}, ${product.category}, شراء ${product.title}, ${product.title} الكويت, إعلانات العرب الكويت`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.title} - إعلانات العرب الكويت`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="إعلانات العرب الكويت" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="product:price:amount" content={product.salePrice} />
        <meta property="product:price:currency" content="KWD" />
        <meta property="product:availability" content="in stock" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={product.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: (product.description || '').replace(/الوصف\s*/g, '').substring(0, 300),
          image: allImages,
          sku: product.sku,
          brand: { '@type': 'Brand', name: 'إعلانات العرب الكويت' },
          offers: {
            '@type': 'Offer',
            url: canonicalUrl,
            priceCurrency: 'KWD',
            price: product.salePrice,
            priceValidUntil: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'KWD' },
              deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' } }
            }
          },
          ...(reviews.length > 0 && { aggregateRating: { '@type': 'AggregateRating', ratingValue: averageRating, reviewCount: reviews.length } })
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://arabsads.shop' },
            { '@type': 'ListItem', position: 2, name: 'المتجر', item: 'https://arabsads.shop/shop' },
            { '@type': 'ListItem', position: 3, name: product.category, item: `https://arabsads.shop/shop?category=${encodeURIComponent(product.category)}` },
            { '@type': 'ListItem', position: 4, name: product.title, item: canonicalUrl }
          ]
        }) }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary transition">الرئيسية</Link>
          <span className="mx-1 text-gray-300">/</span>
          <Link href="/shop" className="hover:text-primary transition">المتجر</Link>
          <span className="mx-1 text-gray-300">/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition">{product.category}</Link>
          <span className="mx-1 text-gray-300">/</span>
          <span className="text-dark font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-card p-4 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12">

          {/* Images */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-square">
              <img
                src={selectedImage || product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
              {discount > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow">
                  خصم {discount}%
                </span>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${(selectedImage === img || (!selectedImage && i === 0)) ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <span className="inline-block bg-primary bg-opacity-10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">{product.category}</span>
              <h1 className="text-2xl md:text-3xl font-bold text-dark leading-relaxed">{product.title}</h1>
            </div>

            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({reviews.length} تقييم)</span>
              </div>
            )}

            {/* Price */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
              <div className="flex items-end gap-2 flex-wrap">
                <span className="text-4xl md:text-5xl font-black text-primary">{product.salePrice.toFixed(3)}</span>
                <span className="text-xl font-bold text-primary mb-1">د.ك</span>
                {discount > 0 && (
                  <div className="flex flex-col mr-2">
                    <span className="text-base text-gray-400 line-through">{product.price.toFixed(3)} د.ك</span>
                    <span className="text-xs font-bold text-green-600">وفر {(product.price - product.salePrice).toFixed(3)} د.ك</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-600 font-medium">متوفر في المخزون</span>
              </div>
            </div>

            {/* Short desc */}
            {product.description && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {(product.description || '').replace(/الوصف\s*/g, '').replace(/وصف المنتج\s*:?\s*/g, '').replace(/\*\*(.+?)\*\*/g, '$1').substring(0, 200)}...
              </p>
            )}

            {/* Policy badges */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '🚚', title: 'شحن مجاني', sub: 'لجميع مناطق الكويت', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', href: '/shipping-policy' },
                { icon: '🔄', title: 'إرجاع مجاني', sub: '14 يوم ضمان', bg: 'bg-green-50 border-green-200', text: 'text-green-700', href: '/return-policy' },
                { icon: '✅', title: 'منتج أصلي', sub: 'جودة مضمونة 100%', bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', href: null },
                { icon: '💳', title: 'دفع آمن', sub: 'عند الاستلام', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', href: null },
              ].map((b, i) => {
                const inner = (
                  <div className={`flex items-center gap-2 p-3 rounded-xl border ${b.bg} ${b.text} transition hover:shadow-sm`}>
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <p className="font-bold text-xs">{b.title}</p>
                      <p className="text-xs opacity-75">{b.sub}</p>
                    </div>
                  </div>
                );
                return b.href ? <Link key={i} href={b.href}>{inner}</Link> : <div key={i}>{inner}</div>;
              })}
            </div>

            {/* Quantity + Add to cart */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-4">
                <span className="font-bold text-dark text-sm">الكمية:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition shadow-sm text-xl leading-none">−</button>
                  <span className="text-lg font-bold min-w-[32px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition shadow-sm text-xl leading-none">+</button>
                </div>
              </div>
              <button onClick={handleAddToCart}
                className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                أضف إلى السلة
              </button>
            </div>

            <p className="text-xs text-gray-400">رقم المنتج: {product.sku}</p>
          </div>
        </div>

        {/* Sticky Buy Now */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 p-3 shadow-2xl z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 truncate max-w-[160px]">{product.title}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary">{product.salePrice.toFixed(3)}</span>
                <span className="text-sm font-bold text-primary">د.ك</span>
                {discount > 0 && <span className="text-xs text-gray-400 line-through mr-1">{product.price.toFixed(3)}</span>}
              </div>
            </div>
            <button onClick={() => { handleAddToCart(); router.push('/checkout'); }}
              className="flex-1 max-w-xs bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition shadow-lg">
              🛒 اشتري الآن
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 mb-28 bg-white rounded-2xl shadow-card overflow-hidden">
          {/* Tab headers */}
          <div className="flex border-b overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-4 font-bold text-sm whitespace-nowrap transition border-b-2 flex-shrink-0 ${activeTab === tab.key ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                <span className="text-base">{tab.icon}</span>
                <span>{tab.key === 'reviews' ? `${tab.label} (${reviews.length})` : tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 md:p-8">

            {/* Description */}
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: cleanDesc(product.description || '') }} />
            )}

            {/* Shipping */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="text-5xl">🚚</span>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">شحن مجاني 100%</h3>
                    <p className="text-blue-600">لجميع الطلبات داخل دولة الكويت بدون حد أدنى للطلب</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: '⏱️', title: 'مدة التوصيل', desc: '1 إلى 3 أيام عمل من تأكيد الطلب' },
                    { icon: '📍', title: 'مناطق التوصيل', desc: 'جميع محافظات الكويت الست' },
                    { icon: '📦', title: 'تتبع الشحنة', desc: 'رقم تتبع عبر واتساب أو SMS' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h4 className="font-bold text-dark mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-dark mb-3 text-sm">المحافظات المشمولة:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['العاصمة', 'حولي', 'الفروانية', 'الأحمدي', 'الجهراء', 'مبارك الكبير'].map(gov => (
                      <div key={gov} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500 font-bold">✓</span> {gov}
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/shipping-policy" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                  قراءة سياسة الشحن الكاملة ←
                </Link>
              </div>
            )}

            {/* Returns */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-100">
                  <span className="text-5xl">🔄</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-1">ضمان الإرجاع 14 يوم</h3>
                    <p className="text-green-600">إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: '✅', title: 'شروط الإرجاع', items: ['المنتج في حالته الأصلية', 'التغليف الأصلي سليم', 'جميع الملحقات موجودة', 'إيصال الشراء'] },
                    { icon: '💰', title: 'استرداد الأموال', items: ['خلال 7-10 أيام عمل', 'بنفس طريقة الدفع', 'استرداد كامل للمبلغ', 'بدون رسوم إضافية'] },
                  ].map((sec, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5">
                      <h4 className="font-bold text-dark mb-3 flex items-center gap-2 text-sm">
                        <span>{sec.icon}</span> {sec.title}
                      </h4>
                      <ul className="space-y-2">
                        {sec.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-green-500 font-bold">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-5">
                  <h4 className="font-bold text-dark mb-3 text-sm">خطوات طلب الإرجاع:</h4>
                  <ol className="space-y-2">
                    {['تواصل معنا عبر واتساب', 'أرسل رقم الطلب وسبب الإرجاع', 'احصل على موافقة الإرجاع', 'أرسل المنتج إلينا'].map((step, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <Link href="/return-policy" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                  قراءة سياسة الإرجاع الكاملة ←
                </Link>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  <>
                    <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-5xl font-black text-primary">{averageRating}</div>
                        <div className="flex gap-1 mt-1 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xl ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{reviews.length} تقييم</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      {reviews.map((review, i) => (
                        <div key={i} className="border-b pb-5 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-dark text-sm">{review.name}</h4>
                                {review.verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">✓ موثق</span>}
                              </div>
                              <div className="flex gap-0.5 mt-1">
                                {[...Array(5)].map((_, j) => (
                                  <span key={j} className={j < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-5xl mb-3">⭐</div>
                    <p className="text-lg font-medium">لا توجد تقييمات بعد</p>
                  </div>
                )}
              </div>
            )}

            {/* FAQs */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                {faqs.length > 0 ? faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition hover:border-primary/20">
                    <h4 className="font-bold text-dark mb-2 flex items-start gap-2 text-sm">
                      <span className="text-primary text-lg flex-shrink-0">❓</span>
                      {faq.q}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mr-7">{faq.a}</p>
                  </div>
                )) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-5xl mb-3">❓</div>
                    <p className="text-lg font-medium">لا توجد أسئلة شائعة</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
