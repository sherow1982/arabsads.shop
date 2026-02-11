const fs = require('fs');
const path = require('path');

// قراءة المنتجات
const productsPath = path.join(__dirname, '../src/data/products.js');
const productsContent = fs.readFileSync(productsPath, 'utf8');
const productsMatch = productsContent.match(/export const products = (\[[\s\S]*\]);/);
const products = eval(productsMatch[1]);

console.log(`\n🚀 بدء توليد Mass SEO Pages`);
console.log(`📦 عدد المنتجات: ${products.length}`);
console.log(`📄 عدد الصفحات لكل منتج: 5`);
console.log(`📊 إجمالي الصفحات: ${products.length * 5}\n`);

// الكلمات المفتاحية لكل صفحة
const pageTypes = [
  {
    slug: 'buy',
    title: 'شراء {product} في الإمارات',
    keywords: ['شراء', 'اشتري', 'طلب', 'الإمارات', 'دبي', 'أبوظبي'],
    description: 'اشتري {product} بأفضل سعر في الإمارات. خصم {discount}% - {price} درهم. شحن مجاني لجميع الإمارات. توصيل سريع 1-3 أيام.'
  },
  {
    slug: 'price',
    title: 'سعر {product} في الإمارات',
    keywords: ['سعر', 'أسعار', 'كم سعر', 'تكلفة', 'الإمارات'],
    description: 'سعر {product} في الإمارات {price} درهم بدلاً من {oldPrice} درهم. وفر {discount}%. شحن مجاني وتوصيل سريع لجميع الإمارات.'
  },
  {
    slug: 'dubai',
    title: '{product} دبي - توصيل سريع',
    keywords: ['دبي', 'توصيل دبي', 'شحن دبي', 'دبي مول'],
    description: '{product} في دبي بسعر {price} درهم. توصيل مجاني لجميع مناطق دبي خلال 24 ساعة. خصم {discount}% على جميع المنتجات.'
  },
  {
    slug: 'abudhabi',
    title: '{product} أبوظبي - شحن مجاني',
    keywords: ['أبوظبي', 'توصيل أبوظبي', 'شحن أبوظبي', 'العاصمة'],
    description: '{product} في أبوظبي بسعر {price} درهم. شحن مجاني لجميع مناطق أبوظبي. خصم {discount}%. توصيل سريع وآمن.'
  },
  {
    slug: 'offer',
    title: 'عرض خاص {product} - خصم {discount}%',
    keywords: ['عرض', 'خصم', 'تخفيض', 'أوفر', 'عروض'],
    description: 'عرض خاص على {product}! خصم {discount}% - السعر {price} درهم فقط. عرض محدود. اطلب الآن واحصل على شحن مجاني لجميع الإمارات.'
  }
];

// توليد بيانات الصفحات
const massPages = [];
let pageId = 1;

products.forEach(product => {
  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  
  pageTypes.forEach(pageType => {
    const slug = `${pageType.slug}-${product.id}`;
    const title = pageType.title
      .replace('{product}', product.title)
      .replace('{discount}', discount);
    
    const description = pageType.description
      .replace(/{product}/g, product.title)
      .replace(/{price}/g, product.salePrice)
      .replace(/{oldPrice}/g, product.price)
      .replace(/{discount}/g, discount);
    
    const keywords = [
      product.title,
      ...pageType.keywords,
      product.category,
      'شحن مجاني',
      'توصيل سريع',
      'الإمارات'
    ].join(', ');

    massPages.push({
      id: pageId++,
      slug: slug,
      productId: product.id,
      type: pageType.slug,
      title: title,
      description: description,
      keywords: keywords,
      canonicalUrl: `https://emirates.storesads.shop/seo/${slug}`,
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image,
        category: product.category,
        discount: discount
      }
    });
  });
});

// حفظ بيانات الصفحات
const massDataDir = path.join(__dirname, '../public/mass-seo-data');
if (!fs.existsSync(massDataDir)) {
  fs.mkdirSync(massDataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(massDataDir, 'pages.json'),
  JSON.stringify(massPages, null, 2),
  'utf8'
);

console.log(`✅ تم إنشاء ${massPages.length} صفحة SEO`);

// إنشاء mass-seo sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

massPages.forEach(page => {
  const today = new Date().toISOString().split('T')[0];
  sitemap += `  <url>
    <loc>${page.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync(
  path.join(__dirname, '../public/mass-seo-sitemap.xml'),
  sitemap,
  'utf8'
);

console.log(`✅ تم إنشاء mass-seo-sitemap.xml`);

// تقرير نهائي
console.log('\n📊 تقرير Mass SEO:');
console.log('═══════════════════════════════════════');
console.log(`✅ عدد المنتجات: ${products.length}`);
console.log(`✅ صفحات لكل منتج: 5`);
console.log(`✅ إجمالي الصفحات: ${massPages.length}`);
console.log(`✅ حجم البيانات: ${(JSON.stringify(massPages).length / 1024 / 1024).toFixed(2)} MB`);
console.log('═══════════════════════════════════════\n');

// إحصائيات حسب النوع
console.log('📈 إحصائيات حسب النوع:');
pageTypes.forEach(type => {
  const count = massPages.filter(p => p.type === type.slug).length;
  console.log(`  • ${type.title.split(' ')[0]}: ${count} صفحة`);
});

console.log('\n✨ تم إنشاء Mass SEO بنجاح!\n');
