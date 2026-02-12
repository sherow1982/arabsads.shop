const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// تصنيف دقيق لكل منتج
const exactCategories = {
  66: 'علاجات الشعر',
  72: 'أدوات مطبخ',
  75: 'أجهزة التدليك',
  79: 'أدوات غسيل',
  88: 'مستحضرات التجميل',
  89: 'مستحضرات التجميل',
  91: 'مستحضرات التجميل',
  101: 'أدوات مطبخ',
  102: 'العناية بالبشرة',
  103: 'العناية بالبشرة',
  104: 'العناية بالبشرة',
  105: 'العناية بالبشرة',
  106: 'علاجات الشعر',
  107: 'أجهزة التدليك',
  108: 'أجهزة التدليك',
  109: 'إلكترونيات السيارات',
  111: 'ملابس وإكسسوارات',
  140: 'أجهزة طبية',
};

let updated = 0;

products.forEach(product => {
  if (exactCategories[product.id]) {
    product.category = exactCategories[product.id];
    updated++;
    console.log(`✓ ${product.id}. ${product.name} → ${product.category}`);
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log(`\n✅ تم تحديث ${updated} منتج`);

// عرض الفئات النهائية
const finalCategories = {};
products.forEach(p => {
  finalCategories[p.category] = (finalCategories[p.category] || 0) + 1;
});

console.log('\n📊 الفئات النهائية:');
Object.entries(finalCategories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});

// عرض المتبقي في مستلزمات منزلية
const remaining = products.filter(p => p.category === 'مستلزمات منزلية');
console.log(`\n⚠️ متبقي في مستلزمات منزلية: ${remaining.length}`);
if (remaining.length > 0) {
  remaining.forEach(p => console.log(`   ${p.id}. ${p.name}`));
}
