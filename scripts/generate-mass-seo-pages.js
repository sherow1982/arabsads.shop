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

// دالة لتوليد محتوى ثري واحترافي
function generateRichDescription(product, type, discount) {
  const descriptions = {
    buy: `هل تبحث عن ${product.title}؟ نوفر لك أفضل فرصة لشراء ${product.title} بسعر مميز ${product.salePrice} درهم فقط بدلاً من ${product.price} درهم. يمكنك الآن اقتناء ${product.title} من فئة ${product.category} بخصم يصل إلى ${discount}% مع ضمان الجودة العالية. نحن نقدم خدمة شحن مجاني لجميع إمارات الدولة سواء في دبي، أبوظبي، الشارقة، أو أي إمارة أخرى. عملية الشراء سهلة وآمنة، والتوصيل سريع خلال 1-3 أيام عمل. اطلب ${product.title} الآن واستمتع بأفضل تجربة تسوق إلكتروني في الإمارات.`,
    
    price: `كم سعر ${product.title} في الإمارات؟ السعر الحالي لـ ${product.title} هو ${product.salePrice} درهم فقط بعد الخصم، مقارنة بالسعر الأصلي ${product.price} درهم. هذا يعني أنك توفر ${discount}% من قيمة المنتج الأصلية. ${product.title} من فئة ${product.category} يتميز بجودة عالية وسعر تنافسي. نحن نضمن لك أفضل الأسعار في السوق الإماراتي مع توفير شحن مجاني لجميع المناطق. لا تفوت هذه الفرصة للحصول على ${product.title} بهذا السعر المميز. التوصيل متاح لجميع الإمارات بما فيها دبي وأبوظبي والشارقة.`,
    
    dubai: `${product.title} متوفر الآن في دبي بسعر ${product.salePrice} درهم. إذا كنت تبحث عن ${product.title} في دبي، نحن نوفر لك خدمة توصيل سريعة ومجانية لجميع مناطق دبي بما في ذلك دبي مارينا، داون تاون دبي، جميرا، ديرة، بر دبي، وجميع المناطق الأخرى. ${product.title} من فئة ${product.category} يأتي بخصم ${discount}% ويمكن توصيله خلال 24 ساعة فقط داخل دبي. نحن نضمن جودة المنتج وسرعة التوصيل. اطلب ${product.title} الآن واستمتع بأفضل خدمة توصيل في دبي.`,
    
    abudhabi: `احصل على ${product.title} في أبوظبي بسعر مميز ${product.salePrice} درهم. نوفر لك ${product.title} مع خدمة شحن مجاني لجميع مناطق أبوظبي والعين والمناطق المحيطة. ${product.title} من فئة ${product.category} متاح بخصم ${discount}% مع ضمان الجودة والتوصيل السريع. سواء كنت في جزيرة ياس، الكورنيش، المصفح، أو أي منطقة في أبوظبي، نضمن لك وصول ${product.title} بأمان وسرعة. التوصيل يتم خلال 1-3 أيام عمل. اطلب الآن واستفد من العرض الخاص على ${product.title} في أبوظبي.`,
    
    offer: `عرض خاص ومحدود على ${product.title}! وفر ${discount}% واحصل على ${product.title} بسعر ${product.salePrice} درهم فقط بدلاً من ${product.price} درهم. هذا العرض الحصري على ${product.title} من فئة ${product.category} لن يدوم طويلاً. نقدم لك فرصة ذهبية لاقتناء ${product.title} بأفضل سعر في الإمارات مع شحن مجاني لجميع الإمارات. العرض يشمل ضمان الجودة والاستبدال والتوصيل السريع خلال 1-3 أيام. لا تفوت هذه الفرصة المميزة، اطلب ${product.title} الآن قبل انتهاء العرض واستمتع بالتوفير والجودة العالية.`
  };
  return descriptions[type];
}

// الكلمات المفتاحية لكل صفحة
const pageTypes = [
  { slug: 'buy', title: 'شراء {product} في الإمارات', keywords: ['شراء', 'اشتري', 'طلب', 'الإمارات', 'دبي', 'أبوظبي'] },
  { slug: 'price', title: 'سعر {product} في الإمارات', keywords: ['سعر', 'أسعار', 'كم سعر', 'تكلفة', 'الإمارات'] },
  { slug: 'dubai', title: '{product} دبي - توصيل سريع', keywords: ['دبي', 'توصيل دبي', 'شحن دبي', 'دبي مول'] },
  { slug: 'abudhabi', title: '{product} أبوظبي - شحن مجاني', keywords: ['أبوظبي', 'توصيل أبوظبي', 'شحن أبوظبي', 'العاصمة'] },
  { slug: 'offer', title: 'عرض خاص {product} - خصم {discount}%', keywords: ['عرض', 'خصم', 'تخفيض', 'أوفر', 'عروض'] }
];

// توليد بيانات الصفحات
const massPages = [];
let pageId = 1;

products.forEach(product => {
  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  
  pageTypes.forEach(pageType => {
    const slug = `${pageType.slug}-${product.id}`;
    const title = pageType.title.replace('{product}', product.title).replace('{discount}', discount);
    const description = generateRichDescription(product, pageType.slug, discount);
    const keywords = [product.title, ...pageType.keywords, product.category, 'شحن مجاني', 'توصيل سريع', 'الإمارات'].join(', ');

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
