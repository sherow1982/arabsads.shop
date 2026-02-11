import Head from 'next/head';

export default function SEO({ 
  title = 'إماراتي ستور - مخزونك في جيبك',
  description = 'أفضل متجر إلكتروني في 7 دول عربية. شحن مجاني لجميع الطلبات. توصيل سريع من 1-3 أيام. منتجات أصلية 100%',
  keywords = 'متجر إلكتروني, تسوق أونلاين, شحن مجاني, إماراتي ستور, تسوق في الإمارات, تسوق في السعودية, تسوق في مصر',
  image = 'https://emirates.storesads.shop/og-image.jpg',
  url = 'https://emirates.storesads.shop',
  type = 'website',
  product = null
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'إماراتي ستور',
    alternateName: 'Emeratis Store',
    url: 'https://emirates.storesads.shop',
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://emirates.storesads.shop/shop?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'إماراتي ستور',
    alternateName: 'Emeratis Store',
    url: 'https://emirates.storesads.shop',
    logo: 'https://emirates.storesads.shop/logo.jpg',
    description: 'أفضل متجر إلكتروني في 7 دول عربية',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: '6 أكتوبر',
      addressRegion: 'الجيزة'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201110760081',
      email: 'sherow1982@gmail.com',
      contactType: 'Customer Service',
      availableLanguage: ['ar', 'en']
    },
    sameAs: [
      'https://wa.me/201110760081'
    ]
  };

  const productStructuredData = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.image, product.additionalImage].filter(Boolean),
    description: product.description || product.title,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'إماراتي ستور'
    },
    offers: {
      '@type': 'Offer',
      url: `https://emirates.storesads.shop/product/${product.id}`,
      priceCurrency: 'AED',
      price: product.salePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'AED'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="إماراتي ستور" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="إماراتي ستور" />
      <meta property="og:locale" content="ar_AE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Arabic" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />
      )}

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </Head>
  );
}
