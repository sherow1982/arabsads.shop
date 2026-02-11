import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  
  const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
  
  if (!fs.existsSync(pagesPath)) {
    return { paths: [], fallback: false };
  }
  
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  
  const paths = pages.map(page => ({
    params: { slug: page.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  
  const page = pages.find(p => p.slug === params.slug);
  
  if (!page) {
    return { notFound: true };
  }

  return { props: { page } };
}

export default function MassSEOPage({ page }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords} />
        <link rel="canonical" href={page.canonicalUrl} />
        
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={page.product.image} />
        <meta property="og:url" content={page.canonicalUrl} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: page.product.title,
            image: page.product.image,
            description: page.description,
            offers: {
              '@type': 'Offer',
              price: page.product.salePrice,
              priceCurrency: 'AED',
              availability: 'https://schema.org/InStock'
            }
          })
        }} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <button onClick={() => router.back()} className="bg-white border px-6 py-2 rounded-lg mb-8 hover:bg-gray-50">
          ← العودة
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={page.product.image} alt={page.product.title} className="w-full rounded-xl" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
              
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-primary">{page.product.salePrice} د.إ</span>
                <span className="text-2xl text-gray-400 line-through">{page.product.price} د.إ</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold">
                  وفر {page.product.discount}%
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">{page.description}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <span>✓</span>
                  <span>شحن مجاني لجميع الإمارات</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span>✓</span>
                  <span>توصيل سريع خلال 1-3 أيام</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span>✓</span>
                  <span>ضمان الجودة والاستبدال</span>
                </div>
              </div>

              <Link href={`/product/${page.product.id}`}>
                <button className="w-full bg-primary text-white py-4 rounded-full text-lg font-bold hover:bg-primary-dark transition shadow-lg">
                  اطلب الآن
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">معلومات إضافية</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">الفئة</h3>
                <p className="text-gray-600">{page.product.category}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">السعر الأصلي</h3>
                <p className="text-gray-600">{page.product.price} درهم</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">السعر بعد الخصم</h3>
                <p className="text-gray-600">{page.product.salePrice} درهم</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
