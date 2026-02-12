import Head from 'next/head';

export default function SEO({ 
  title = 'عماني ستور - مخزونك في جيبك',
  description = 'أفضل متجر إلكتروني في سلطنة عمان. شحن مجاني لجميع الطلبات. توصيل سريع من 1-3 أيام. منتجات أصلية 100%. تسوق الآن واحصل على أفضل العروض',
  keywords = 'متجر إلكتروني عمان, تسوق أونلاين عمان, شحن مجاني عمان, عماني ستور, تسوق في مسقط, تسوق في صلالة, منتجات عمانية',
  image = 'https://omany.storesads.shop/og-image.jpg',
  url = 'https://omany.storesads.shop',
  type = 'website',
  product = null
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'عماني ستور',
    alternateName: 'Omany Store',
    url: 'https://omany.storesads.shop',
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://omany.storesads.shop/shop?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'عماني ستور',
    alternateName: 'Omany Store',
    url: 'https://omany.storesads.shop',
    logo: 'https://omany.storesads.shop/logo.jpg',
    description: 'أفضل متجر إلكتروني في سلطنة عمان',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'OM',
      addressLocality: 'مسقط',
      addressRegion: 'محافظة مسقط'
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
      name: 'عماني ستور'
    },
    offers: {
      '@type': 'Offer',
      url: `https://omany.storesads.shop/product/${product.id}`,
      priceCurrency: 'OMR',
      price: product.salePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'OMR'
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
      <meta name="author" content="عماني ستور" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="عماني ستور" />
      <meta property="og:locale" content="ar_OM" />

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
