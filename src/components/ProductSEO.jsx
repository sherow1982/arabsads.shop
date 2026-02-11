import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductSEO({ product, seoData }) {
  const router = useRouter();
  const canonicalUrl = `https://emirates.storesads.shop${router.asPath}`;
  
  // استخدام بيانات SEO المُحسّنة إذا كانت متوفرة
  const seo = seoData || {
    title: `${product.title} - إماراتي ستور`,
    metaDescription: product.description?.substring(0, 160) || product.title,
    keywords: `${product.title}, ${product.category}`,
    canonicalUrl: canonicalUrl
  };

  const discount = Math.round((1 - product.salePrice / product.price) * 100);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.metaDescription} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.metaDescription} />
      <meta property="og:image" content={seo.ogImage || product.image} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:site_name" content="إماراتي ستور" />
      <meta property="og:locale" content="ar_AE" />
      <meta property="product:price:amount" content={product.salePrice} />
      <meta property="product:price:currency" content="AED" />
      <meta property="product:availability" content={product.inStock ? 'in stock' : 'out of stock'} />
      <meta property="product:condition" content="new" />
      <meta property="product:brand" content="إماراتي ستور" />
      <meta property="product:category" content={product.category} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.metaDescription} />
      <meta name="twitter:image" content={product.image} />
      <meta name="twitter:label1" content="السعر" />
      <meta name="twitter:data1" content={`${product.salePrice} د.إ`} />
      <meta name="twitter:label2" content="التوفر" />
      <meta name="twitter:data2" content={product.inStock ? 'متوفر' : 'غير متوفر'} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="إماراتي ستور" />
      <meta name="publisher" content="إماراتي ستور" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Product */}
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      )}
      
      {/* Structured Data - BreadcrumbList */}
      {seo.breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: seo.breadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url
              }))
            })
          }}
        />
      )}
      
      {/* Structured Data - Offer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            url: seo.canonicalUrl,
            priceCurrency: 'AED',
            price: product.salePrice,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@type': 'Organization',
              name: 'إماراتي ستور'
            }
          })
        }}
      />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://m5zoon.com" />
      <link rel="dns-prefetch" href="https://m5zoon.com" />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="ar" href={seo.canonicalUrl} />
      <link rel="alternate" hrefLang="ar-AE" href={seo.canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={seo.canonicalUrl} />
    </Head>
  );
}
