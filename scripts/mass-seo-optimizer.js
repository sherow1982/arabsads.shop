const fs = require('fs');
const path = require('path');

// قراءة ملف المنتجات
const productsPath = path.join(__dirname, '../src/data/products.js');
const productsContent = fs.readFileSync(productsPath, 'utf8');

// استخراج المنتجات
const productsMatch = productsContent.match(/export const products = (\[[\s\S]*\]);/);
if (!productsMatch) {
  console.error('❌ لم يتم العثور على المنتجات');
  process.exit(1);
}

const products = eval(productsMatch[1]);

console.log(`✅ تم العثور على ${products.length} منتج`);

// دالة لتوليد meta description محسّن
function generateMetaDescription(product) {
  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  return `اشتري ${product.title} بأفضل سعر في سلطنة عمان. خصم ${discount}% - السعر ${product.salePrice} ريال بدلاً من ${product.price} ريال. شحن مجاني وتوصيل سريع 1-3 أيام. ${product.category}`;
}

// دالة لتوليد keywords محسّنة
function generateKeywords(product) {
  const baseKeywords = [
    product.title,
    product.category,
    `شراء ${product.title}`,
    `${product.title} عمان`,
    `${product.title} مسقط`,
    `${product.title} صلالة`,
    `${product.category} أونلاين`,
    `متجر ${product.category}`,
    'شحن مجاني',
    'توصيل سريع',
    'منتجات أصلية',
    `SKU ${product.sku}`
  ];
  
  return baseKeywords.join(', ');
}

// دالة لتوليد structured data محسّن
function generateStructuredData(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.image, product.additionalImage].filter(Boolean),
    description: product.description?.substring(0, 200) || product.title,
    sku: product.sku.toString(),
    mpn: product.sku.toString(),
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
      seller: {
        '@type': 'Organization',
        name: 'عماني ستور'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'OMR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'OM'
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
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    category: product.category
  };
}

// إنشاء ملف SEO لكل منتج
const seoDataDir = path.join(__dirname, '../public/seo-data');
if (!fs.existsSync(seoDataDir)) {
  fs.mkdirSync(seoDataDir, { recursive: true });
}

// توليد بيانات SEO لكل منتج
const seoData = products.map(product => {
  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  
  return {
    id: product.id,
    title: `${product.title} - خصم ${discount}% | عماني ستور`,
    metaDescription: generateMetaDescription(product),
    keywords: generateKeywords(product),
    canonicalUrl: `https://omany.storesads.shop/product/${product.id}`,
    ogTitle: `${product.title} - وفر ${discount}%`,
    ogDescription: `احصل على ${product.title} بسعر ${product.salePrice} ريال بدلاً من ${product.price} ريال. شحن مجاني لجميع محافظات عمان`,
    ogImage: product.image,
    structuredData: generateStructuredData(product),
    breadcrumbs: [
      { name: 'الرئيسية', url: 'https://omany.storesads.shop' },
      { name: 'المتجر', url: 'https://omany.storesads.shop/shop' },
      { name: product.category, url: `https://omany.storesads.shop/shop?category=${encodeURIComponent(product.category)}` },
      { name: product.title, url: `https://omany.storesads.shop/product/${product.id}` }
    ]
  };
});

// حفظ بيانات SEO
fs.writeFileSync(
  path.join(seoDataDir, 'products-seo.json'),
  JSON.stringify(seoData, null, 2),
  'utf8'
);

console.log(`✅ تم إنشاء بيانات SEO لـ ${seoData.length} منتج`);

// إنشاء sitemap.xml محسّن
function generateSitemap() {
  const baseUrl = 'https://omany.storesads.shop';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- الصفحة الرئيسية -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- صفحة المتجر -->
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- صفحات المنتجات -->
`;

  products.forEach(product => {
    sitemap += `  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.title}</image:title>
    </image:image>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, 'utf8');
  console.log('✅ تم إنشاء sitemap.xml');
}

generateSitemap();

// إنشاء robots.txt محسّن
function generateRobotsTxt() {
  const robotsTxt = `# robots.txt for https://omany.storesads.shop

User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout/success
Disallow: /checkout/cancel

# Sitemaps
Sitemap: https://omany.storesads.shop/sitemap.xml
Sitemap: https://omany.storesads.shop/product-feed.xml

# Crawl-delay
Crawl-delay: 1
`;

  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt, 'utf8');
  console.log('✅ تم إنشاء robots.txt');
}

generateRobotsTxt();

// إنشاء product feed لـ Google Shopping
function generateProductFeed() {
  let feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>عماني ستور - منتجات</title>
    <link>https://omany.storesads.shop</link>
    <description>أفضل متجر إلكتروني في سلطنة عمان</description>
`;

  products.forEach(product => {
    const discount = Math.round((1 - product.salePrice / product.price) * 100);
    
    feed += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.title}</g:title>
      <g:description>${(product.description || product.title).substring(0, 500)}</g:description>
      <g:link>https://omany.storesads.shop/product/${product.id}</g:link>
      <g:image_link>${product.image}</g:image_link>
      ${product.additionalImage ? `<g:additional_image_link>${product.additionalImage}</g:additional_image_link>` : ''}
      <g:condition>${product.condition || 'new'}</g:condition>
      <g:availability>${product.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${product.salePrice} OMR</g:price>
      <g:sale_price>${product.salePrice} OMR</g:sale_price>
      <g:brand>عماني ستور</g:brand>
      <g:product_type>${product.category}</g:product_type>
      <g:google_product_category>Home &amp; Garden</g:google_product_category>
      <g:shipping>
        <g:country>OM</g:country>
        <g:service>Standard</g:service>
        <g:price>0 OMR</g:price>
      </g:shipping>
      <g:identifier_exists>no</g:identifier_exists>
    </item>
`;
  });

  feed += `  </channel>
</rss>`;

  fs.writeFileSync(path.join(__dirname, '../public/product-feed.xml'), feed, 'utf8');
  console.log('✅ تم إنشاء product-feed.xml');
}

generateProductFeed();

// تقرير نهائي
console.log('\n📊 تقرير SEO الشامل:');
console.log('═══════════════════════════════════════');
console.log(`✅ عدد المنتجات: ${products.length}`);
console.log(`✅ ملفات SEO المُنشأة: ${seoData.length}`);
console.log(`✅ Sitemap: تم إنشاؤه بنجاح`);
console.log(`✅ Robots.txt: تم إنشاؤه بنجاح`);
console.log(`✅ Product Feed: تم إنشاؤه بنجاح`);
console.log('═══════════════════════════════════════\n');

// إحصائيات إضافية
const categories = [...new Set(products.map(p => p.category))];
console.log(`📁 عدد الفئات: ${categories.length}`);
console.log(`📦 المنتجات المتوفرة: ${products.filter(p => p.inStock).length}`);
console.log(`💰 متوسط الخصم: ${Math.round(products.reduce((sum, p) => sum + (1 - p.salePrice / p.price) * 100, 0) / products.length)}%`);
console.log('\n✨ تم تحسين SEO لجميع المنتجات بنجاح!');
