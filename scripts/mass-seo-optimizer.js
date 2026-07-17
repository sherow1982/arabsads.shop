const fs = require('fs');
const path = require('path');

// قراءة ملف المنتجات JSON
const productsData = require('../src/data/products-data.json');

if (!productsData || productsData.length === 0) {
  console.log('❌ لم يتم العثور على المنتجات');
  process.exit(0);
}

const products = productsData;

console.log(`✅ تم العثور على ${products.length} منتج`);

// دالة لتوليد meta description محسّن
function generateMetaDescription(product) {
  return `اشتري ${product.name} بأفضل سعر في دولة الكويت. السعر ${product.price} دينار. شحن مجاني وتوصيل سريع 1-3 أيام. ${product.category}`;
}

// دالة لتوليد keywords محسّنة
function generateKeywords(product) {
  const baseKeywords = [
    product.name,
    product.category,
    `شراء ${product.name}`,
    `${product.name} الكويت`,
    `${product.name} الكويت العاصمة`,
    `${product.name} حولي`,
    `${product.category} أونلاين`,
    `متجر ${product.category}`,
    'شحن مجاني',
    'توصيل سريع',
    'منتجات أصلية'
  ];
  
  return baseKeywords.join(', ');
}

// دالة لتوليد structured data محسّن
function generateStructuredData(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.mainImage].filter(Boolean),
    description: product.description?.substring(0, 200) || product.name,
    brand: {
      '@type': 'Brand',
      name: 'إعلانات العرب الكويت'
    },
    offers: {
      '@type': 'Offer',
      url: `https://arabsads.shop/product/${product.id}`,
      priceCurrency: 'KWD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'إعلانات العرب الكويت'
      }
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
  return {
    id: product.id,
    title: `${product.name} | إعلانات العرب الكويت`,
    metaDescription: generateMetaDescription(product),
    keywords: generateKeywords(product),
    canonicalUrl: `https://arabsads.shop/product/${product.id}`,
    ogTitle: product.name,
    ogDescription: product.description?.substring(0, 150) || product.name,
    ogImage: product.mainImage,
    structuredData: generateStructuredData(product)
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
  const baseUrl = 'https://arabsads.shop';
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
      <image:loc>${product.mainImage}</image:loc>
      <image:title>${product.name}</image:title>
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
  const robotsTxt = `# robots.txt for https://arabsads.shop

User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout/success
Disallow: /checkout/cancel

# Sitemaps
Sitemap: https://arabsads.shop/sitemap.xml
Sitemap: https://arabsads.shop/product-feed.xml

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
    <title>إعلانات العرب الكويت - منتجات</title>
    <link>https://arabsads.shop</link>
    <description>أفضل متجر إلكتروني في دولة الكويت</description>
`;

  products.forEach(product => {
    feed += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${(product.description || product.name).substring(0, 500)}</g:description>
      <g:link>https://arabsads.shop/product/${product.id}</g:link>
      <g:image_link>${product.mainImage}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${product.price} KWD</g:price>
      <g:brand>إعلانات العرب الكويت</g:brand>
      <g:product_type>${product.category}</g:product_type>
      <g:google_product_category>Home &amp; Garden</g:google_product_category>
      <g:shipping>
        <g:country>OM</g:country>
        <g:service>Standard</g:service>
        <g:price>0 KWD</g:price>
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
console.log('\n✨ تم تحسين SEO لجميع المنتجات بنجاح!');
