const fs = require('fs');

// قراءة المنتجات
const productsFile = fs.readFileSync('./src/data/products.js', 'utf8');
const productsMatch = productsFile.match(/export const products = (\[[\s\S]*\]);/);
const products = JSON.parse(productsMatch[1]);

// قراءة صفحات Mass SEO
const massSeoPages = JSON.parse(fs.readFileSync('./public/mass-seo-data/pages.json', 'utf8'));

// إنشاء خريطة للمنتجات حسب SKU
const productsBySku = {};
products.forEach(p => {
  productsBySku[p.sku] = p;
});

// تحديث الصفحات
let updated = 0;
massSeoPages.forEach(page => {
  const product = productsBySku[page.sku];
  if (product && product.description) {
    page.description = product.description;
    updated++;
  }
});

// حفظ الملف
fs.writeFileSync('./public/mass-seo-data/pages.json', JSON.stringify(massSeoPages, null, 2), 'utf8');

console.log(`✅ تم تحديث ${updated} صفحة من أصل ${massSeoPages.length}`);
