import Head from 'next/head';

export default function SEO({ 
  title = 'إعلانات العرب الكويت - تسوق أونلاين',
  description = 'أفضل متجر إلكتروني في الكويت. شحن مجاني لجميع الطلبات. توصيل سريع من 1-3 أيام. منتجات أصلية 100%. تسوق الآن واحصل على أفضل العروض',
  keywords = 'متجر إلكتروني الكويت, تسوق أونلاين الكويت, شحن مجاني الكويت, إعلانات العرب, تسوق في الكويت, منتجات كويتية, arabsads',
  image = 'https://arabsads.shop/og-image.jpg',
  url = 'https://arabsads.shop',
  type = 'website',
  product = null
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'إعلانات العرب الكويت',
    alternateName: 'Arabs Ads Kuwait',
    url: 'https://arabsads.shop',
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://arabsads.shop/shop?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'إعلانات العرب الكويت',
    alternateName: 'Arabs Ads Kuwait',
    url: 'https://arabsads.shop',
    logo: 'https://arabsads.shop/logo.jpg',
    description: 'أفضل متجر إلكتروني في الكويت',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KW',
      addressLocality: 'الكويت',
      addressRegion: 'محافظة العاصمة'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201110760081',
      email: 'info@arabsads.shop',
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
      name: 'إعلانات العرب الكويت'
    },
    offers: {
      '@type': 'Offer',
      url: `https://arabsads.shop/product/${product.id}`,
      priceCurrency: 'KWD',
      price: product.salePrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'KWD'
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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="إعلانات العرب الكويت" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="إعلانات العرب الكويت" />
      <meta property="og:locale" content="ar_KW" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

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

      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </Head>
  );
}
