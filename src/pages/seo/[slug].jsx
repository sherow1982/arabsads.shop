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
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const page = pages.find(p => p.slug === params.slug);
  if (!page) return { notFound: true };
  
  const productsData = require(path.join(process.cwd(), 'src/data/products-data.json'));
  const product = productsData.find(p => p.id === page.productId);
  if (!product) return { notFound: true };
  
  return { props: { page, product } };
}

export default function MassSEOPage({ page, product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const reviews = getProductReviews(product?.id);
  const faqs = getProductFAQs(product?.id);
  const averageRating = getAverageRating(product?.id);

  useEffect(() => {
    if (product) gtag.viewItem(product);
  }, [product]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
    gtag.addToCart(product, quantity);
    toast.success(`تمت إضافة ${quantity} من ${product.name} إلى السلة`);
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords} />
        <link rel="canonical" href={page.canonicalUrl} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={product.mainImage} />
        <meta property="og:url" content={page.canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.mainImage,
            description: page.description,
            offers: { '@type': 'Offer', price: product.price, priceCurrency: 'OMR', availability: 'https://schema.org/InStock' }
          })
        }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-12 overflow-x-hidden">
        <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg mb-8 hover:bg-light-gray transition" onClick={() => router.back()}>← العودة</button>

        <div className="bg-white rounded-2xl shadow-card p-8 grid md:grid-cols-2 gap-12 overflow-hidden">
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden bg-light-gray">
              <img src={selectedImage || product.mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <img src={product.mainImage} alt={product.name} onClick={() => setSelectedImage(product.mainImage)} className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === product.mainImage || !selectedImage ? 'border-primary' : 'border-transparent'}`} />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-dark">{page.title}</h1>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">{product.category}</span>
              <span className="bg-green-100 text-success px-3 py-1 rounded-lg text-sm">متوفر</span>
            </div>
            <div className="flex items-center gap-4 pb-6 border-b">
              <span className="text-5xl font-bold text-primary">{product.price} ر.ع</span>
            </div>
            {page.description && (
              <div>
                <h3 className="text-xl font-bold text-dark mb-3">وصف المنتج</h3>
                <p className="text-gray-800 leading-relaxed text-base font-medium whitespace-pre-line">{page.description}</p>
              </div>
            )}
            <div className="flex gap-3 text-sm">
              <Link href="/return-policy" className="text-primary hover:underline">🔄 سياسة الإرجاع</Link>
              <span className="text-gray-300">|</span>
              <Link href="/shipping-policy" className="text-primary hover:underline">🚚 سياسة الشحن</Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-bold text-dark">الكمية:</label>
                <div className="flex items-center gap-4 bg-light-gray px-4 py-2 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">-</button>
                  <span className="text-xl font-bold min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-lg font-bold text-primary hover:bg-primary hover:text-white transition">+</button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="w-full bg-primary text-white py-4 rounded-full text-lg font-bold hover:bg-primary-dark transition shadow-lg hover:shadow-xl">أضف إلى السلة</button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-card p-4 md:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b mb-6 overflow-x-auto">
            <button onClick={() => setActiveTab('description')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'description' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>الوصف</button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>التقييمات ({reviews.length})</button>
            <button onClick={() => setActiveTab('faqs')} className={`pb-4 px-4 sm:px-6 font-bold transition whitespace-nowrap ${activeTab === 'faqs' ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`}>الأسئلة الشائعة</button>
          </div>

          {activeTab === 'description' && <div className="prose max-w-none"><p className="text-gray-800 leading-relaxed text-base font-medium whitespace-pre-line">{page.description}</p></div>}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.length > 0 ? (
                <>
                  <div className="flex items-center gap-4 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{averageRating}</div>
                      <div className="flex gap-1 mt-2">{[...Array(5)].map((_, i) => <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}</div>
                      <div className="text-gray-500 mt-1">{reviews.length} تقييم</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-dark">{review.name}</h4>
                              {review.verified && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">✓ مشتري موثق</span>}
                            </div>
                            <div className="flex gap-1 mt-1">{[...Array(5)].map((_, i) => <span key={i} className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}</div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : <div className="text-center py-12 text-gray-500"><p className="text-xl">لا توجد تقييمات بعد</p><p className="mt-2">كن أول من يقيم هذا المنتج</p></div>}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              {faqs.length > 0 ? faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-md transition">
                  <h4 className="font-bold text-dark mb-3 flex items-start gap-2"><span className="text-primary text-xl">❓</span>{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed mr-7">{faq.a}</p>
                </div>
              )) : <div className="text-center py-12 text-gray-500"><p className="text-xl">لا توجد أسئلة شائعة لهذا المنتج</p></div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
