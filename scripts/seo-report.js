const fs = require('fs');
const path = require('path');

// قراءة بيانات SEO
const seoDataPath = path.join(__dirname, '../public/seo-data/products-seo.json');
const productsPath = path.join(__dirname, '../src/data/products.js');

if (!fs.existsSync(seoDataPath)) {
  console.error('❌ لم يتم العثور على بيانات SEO. قم بتشغيل: npm run seo:optimize');
  process.exit(1);
}

const seoData = JSON.parse(fs.readFileSync(seoDataPath, 'utf8'));
const productsContent = fs.readFileSync(productsPath, 'utf8');
const productsMatch = productsContent.match(/export const products = (\[[\s\S]*\]);/);
const products = eval(productsMatch[1]);

console.log('\n🔍 تقرير SEO التفصيلي');
console.log('═══════════════════════════════════════════════════════════\n');

// 1. إحصائيات عامة
console.log('📊 الإحصائيات العامة:');
console.log('─────────────────────────────────────');
console.log(`✅ إجمالي المنتجات: ${products.length}`);
console.log(`✅ منتجات بـ SEO محسّن: ${seoData.length}`);
console.log(`✅ نسبة التغطية: ${Math.round((seoData.length / products.length) * 100)}%`);

// 2. تحليل الفئات
const categories = {};
products.forEach(p => {
  if (!categories[p.category]) {
    categories[p.category] = { count: 0, avgDiscount: 0, inStock: 0 };
  }
  categories[p.category].count++;
  categories[p.category].avgDiscount += (1 - p.salePrice / p.price) * 100;
  if (p.inStock) categories[p.category].inStock++;
});

console.log('\n📁 تحليل الفئات:');
console.log('─────────────────────────────────────');
Object.entries(categories).forEach(([cat, data]) => {
  const avgDiscount = Math.round(data.avgDiscount / data.count);
  console.log(`\n${cat}:`);
  console.log(`  • عدد المنتجات: ${data.count}`);
  console.log(`  • متوفر: ${data.inStock}`);
  console.log(`  • متوسط الخصم: ${avgDiscount}%`);
});

// 3. تحليل الأسعار
const prices = products.map(p => p.salePrice);
const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

console.log('\n💰 تحليل الأسعار:');
console.log('─────────────────────────────────────');
console.log(`• متوسط السعر: ${avgPrice} درهم`);
console.log(`• أقل سعر: ${minPrice} درهم`);
console.log(`• أعلى سعر: ${maxPrice} درهم`);

// 4. تحليل الخصومات
const discounts = products.map(p => Math.round((1 - p.salePrice / p.price) * 100));
const avgDiscount = Math.round(discounts.reduce((a, b) => a + b, 0) / discounts.length);
const maxDiscount = Math.max(...discounts);
const minDiscount = Math.min(...discounts);

console.log('\n🎯 تحليل الخصومات:');
console.log('─────────────────────────────────────');
console.log(`• متوسط الخصم: ${avgDiscount}%`);
console.log(`• أقل خصم: ${minDiscount}%`);
console.log(`• أعلى خصم: ${maxDiscount}%`);

// 5. تحليل Meta Tags
const titleLengths = seoData.map(s => s.title.length);
const descLengths = seoData.map(s => s.metaDescription.length);

console.log('\n📝 تحليل Meta Tags:');
console.log('─────────────────────────────────────');
console.log(`• متوسط طول العنوان: ${Math.round(titleLengths.reduce((a, b) => a + b, 0) / titleLengths.length)} حرف`);
console.log(`• متوسط طول الوصف: ${Math.round(descLengths.reduce((a, b) => a + b, 0) / descLengths.length)} حرف`);

const goodTitles = titleLengths.filter(l => l >= 50 && l <= 60).length;
const goodDescs = descLengths.filter(l => l >= 150 && l <= 160).length;

console.log(`• عناوين مثالية (50-60): ${goodTitles} (${Math.round((goodTitles / titleLengths.length) * 100)}%)`);
console.log(`• أوصاف مثالية (150-160): ${goodDescs} (${Math.round((goodDescs / descLengths.length) * 100)}%)`);

// 6. تحليل Keywords
const allKeywords = seoData.flatMap(s => s.keywords.split(', '));
const uniqueKeywords = [...new Set(allKeywords)];

console.log('\n🔑 تحليل الكلمات المفتاحية:');
console.log('─────────────────────────────────────');
console.log(`• إجمالي الكلمات: ${allKeywords.length}`);
console.log(`• كلمات فريدة: ${uniqueKeywords.length}`);
console.log(`• متوسط الكلمات لكل منتج: ${Math.round(allKeywords.length / seoData.length)}`);

// 7. أهم الكلمات المفتاحية
const keywordFreq = {};
allKeywords.forEach(k => {
  keywordFreq[k] = (keywordFreq[k] || 0) + 1;
});

const topKeywords = Object.entries(keywordFreq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

console.log('\n🏆 أكثر 10 كلمات تكراراً:');
console.log('─────────────────────────────────────');
topKeywords.forEach(([keyword, count], i) => {
  console.log(`${i + 1}. ${keyword}: ${count} مرة`);
});

// 8. تحليل الصور
const imagesWithAlt = products.filter(p => p.image && p.additionalImage).length;

console.log('\n🖼️ تحليل الصور:');
console.log('─────────────────────────────────────');
console.log(`• منتجات بصورة رئيسية: ${products.filter(p => p.image).length}`);
console.log(`• منتجات بصورة إضافية: ${imagesWithAlt}`);
console.log(`• نسبة التغطية: ${Math.round((imagesWithAlt / products.length) * 100)}%`);

// 9. تحليل التوفر
const inStock = products.filter(p => p.inStock).length;
const outOfStock = products.length - inStock;

console.log('\n📦 تحليل التوفر:');
console.log('─────────────────────────────────────');
console.log(`• متوفر: ${inStock} (${Math.round((inStock / products.length) * 100)}%)`);
console.log(`• غير متوفر: ${outOfStock} (${Math.round((outOfStock / products.length) * 100)}%)`);

// 10. توصيات SEO
console.log('\n💡 توصيات التحسين:');
console.log('─────────────────────────────────────');

const recommendations = [];

if (goodTitles / titleLengths.length < 0.8) {
  recommendations.push('⚠️ قم بتحسين طول العناوين (50-60 حرف)');
}

if (goodDescs / descLengths.length < 0.8) {
  recommendations.push('⚠️ قم بتحسين طول الأوصاف (150-160 حرف)');
}

if (imagesWithAlt / products.length < 0.9) {
  recommendations.push('⚠️ أضف صور إضافية للمنتجات');
}

if (outOfStock > products.length * 0.1) {
  recommendations.push('⚠️ حدّث حالة التوفر للمنتجات');
}

if (recommendations.length === 0) {
  console.log('✅ ممتاز! جميع معايير SEO مطبّقة بشكل صحيح');
} else {
  recommendations.forEach(rec => console.log(rec));
}

// 11. ملفات SEO
console.log('\n📄 ملفات SEO المُنشأة:');
console.log('─────────────────────────────────────');

const files = [
  { name: 'products-seo.json', path: '../public/seo-data/products-seo.json' },
  { name: 'sitemap.xml', path: '../public/sitemap.xml' },
  { name: 'robots.txt', path: '../public/robots.txt' },
  { name: 'product-feed.xml', path: '../public/product-feed.xml' }
];

files.forEach(file => {
  const filePath = path.join(__dirname, file.path);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${file.name} (${size} KB)`);
  } else {
    console.log(`❌ ${file.name} (غير موجود)`);
  }
});

// 12. روابط مفيدة
console.log('\n🔗 روابط مفيدة:');
console.log('─────────────────────────────────────');
console.log('• Sitemap: https://emirates.storesads.shop/sitemap.xml');
console.log('• Product Feed: https://emirates.storesads.shop/product-feed.xml');
console.log('• Robots: https://emirates.storesads.shop/robots.txt');
console.log('• Google Search Console: https://search.google.com/search-console');
console.log('• Rich Results Test: https://search.google.com/test/rich-results');

// 13. الخطوات التالية
console.log('\n🚀 الخطوات التالية:');
console.log('─────────────────────────────────────');
console.log('1. ارفع الموقع على السيرفر');
console.log('2. أرسل Sitemap لـ Google Search Console');
console.log('3. راقب الفهرسة والأداء');
console.log('4. حدّث المحتوى بانتظام');
console.log('5. راجع التقارير شهرياً');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✨ تم إنشاء التقرير بنجاح!\n');

// حفظ التقرير في ملف
const reportDate = new Date().toISOString().split('T')[0];
const reportContent = `
# تقرير SEO - ${reportDate}

## الإحصائيات العامة
- إجمالي المنتجات: ${products.length}
- منتجات بـ SEO محسّن: ${seoData.length}
- نسبة التغطية: ${Math.round((seoData.length / products.length) * 100)}%

## تحليل الفئات
${Object.entries(categories).map(([cat, data]) => `
### ${cat}
- عدد المنتجات: ${data.count}
- متوفر: ${data.inStock}
- متوسط الخصم: ${Math.round(data.avgDiscount / data.count)}%
`).join('\n')}

## تحليل الأسعار
- متوسط السعر: ${avgPrice} درهم
- أقل سعر: ${minPrice} درهم
- أعلى سعر: ${maxPrice} درهم

## تحليل الخصومات
- متوسط الخصم: ${avgDiscount}%
- أقل خصم: ${minDiscount}%
- أعلى خصم: ${maxDiscount}%

## أهم الكلمات المفتاحية
${topKeywords.map(([keyword, count], i) => `${i + 1}. ${keyword}: ${count} مرة`).join('\n')}

## التوصيات
${recommendations.length === 0 ? '✅ ممتاز! جميع معايير SEO مطبّقة بشكل صحيح' : recommendations.join('\n')}
`;

const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

fs.writeFileSync(
  path.join(reportsDir, `seo-report-${reportDate}.md`),
  reportContent,
  'utf8'
);

console.log(`📄 تم حفظ التقرير في: reports/seo-report-${reportDate}.md\n`);
