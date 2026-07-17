import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductSEO({ product, seoData }) {
  const router = useRouter();
  const canonicalUrl = `https://arabsads.shop${router.asPath}`;
  
  const seo = seoData || {
    title: `${product.title} - إعلانات العرب الكويت`,
    metaDescription: product.description?.substring(0, 160) || product.title,
    keywords: `${product.title}, ${product.category}`,
    canonicalUrl: canonicalUrl
  };

  const structuredData = product.richSchema || seo.structuredData || {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: 'إعلانات العرب الكويت' },
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'KWD',
      price: product.salePrice,
      availability: 'https://schema.org/InStock'
    }
  };

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
      <meta property="og:site_name" content="إعلانات العرب الكويت" />
      <meta property="og:locale" content="ar_KW" />
      <meta property="product:price:amount" content={product.salePrice} />
      <meta property="product:price:currency" content="KWD" />
      <meta property="product:availability" content={product.inStock ? 'in stock' : 'out of stock'} />
      <meta property="product:condition" content="new" />
      <meta property="product:brand" content="إعلانات العرب الكويت" />
      <meta property="product:category" content={product.category} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.metaDescription} />
      <meta name="twitter:image" content={product.image} />
      <meta name="twitter:label1" content="السعر" />
      <meta name="twitter:data1" content={`${product.salePrice} د.ك`} />
      <meta name="twitter:label2" content="التوفر" />
      <meta name="twitter:data2" content={product.inStock ? 'متوفر' : 'غير متوفر'} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="إعلانات العرب الكويت" />
      <meta name="publisher" content="إعلانات العرب الكويت" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
            priceCurrency: 'KWD',
            price: product.salePrice,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@type': 'Organization',
              name: 'إعلانات العرب الكويت'
            }
          })
        }}
      />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://arabsads.shop" />
      <link rel="dns-prefetch" href="https://arabsads.shop" />
      
      <link rel="alternate" hrefLang="ar" href={seo.canonicalUrl} />
      <link rel="alternate" hrefLang="ar-KW" href={seo.canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={seo.canonicalUrl} />
    </Head>
  );
}
