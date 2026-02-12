const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// تصنيف دقيق لكل منتج بناءً على ID
const exactMapping = {
  67: 'أجهزة مطبخ',
  68: 'أدوات حدائق',
  69: 'أجهزة مطبخ',
  70: 'ألعاب الأطفال',
  71: 'أثاث',
  74: 'أجهزة مطبخ',
  76: 'أدوات تصفيف الشعر',
  77: 'إكسسوارات تصوير',
  78: 'أجهزة مطبخ',
  80: 'أجهزة مطبخ',
  81: 'أدوات تصفيف الشعر',
  82: 'أدوات تصفيف الشعر',
  83: 'أدوات تنظيف',
  84: 'أدوات تصفيف الشعر',
  85: 'أدوات مطبخ',
  86: 'أدوات مطبخ',
  87: 'أدوات مطبخ',
  92: 'أدوات خياطة',
  93: 'أجهزة مطبخ',
  94: 'أجهزة مطبخ',
  95: 'أجهزة العناية الشخصية',
  96: 'أجهزة منزلية',
  97: 'أجهزة منزلية',
  98: 'أدوات مطبخ',
  99: 'أدوات مطبخ',
  100: 'أجهزة العناية الشخصية',
  110: 'أدوات كهربائية',
  112: 'أدوات تصفيف الشعر',
  113: 'إلكترونيات ذكية',
  114: 'إلكترونيات ذكية',
  115: 'إلكترونيات ذكية',
  116: 'أدوات تصفيف الشعر',
  117: 'أجهزة مطبخ',
  118: 'أجهزة مطبخ',
  119: 'أدوات تنظيف',
  120: 'أجهزة مطبخ',
  121: 'أجهزة مطبخ',
  122: 'أدوات مطبخ',
  123: 'إلكترونيات ذكية',
  124: 'إلكترونيات ذكية',
  125: 'أدوات تنظيف',
  126: 'أدوات تصفيف الشعر',
  127: 'أدوات تصفيف الشعر',
  128: 'أدوات تصفيف الشعر',
  129: 'أدوات تصفيف الشعر',
  130: 'أدوات تصفيف الشعر',
  131: 'أدوات تصفيف الشعر',
  132: 'أدوات تصفيف الشعر',
  133: 'أدوات تصفيف الشعر',
  134: 'أجهزة منزلية',
  135: 'أدوات تنظيف',
  136: 'أدوات تنظيف',
  137: 'أدوات كهربائية',
  141: 'أجهزة طبية',
  142: 'أجهزة مطبخ',
};

let updated = 0;

products.forEach(product => {
  if (exactMapping[product.id]) {
    const oldCat = product.category;
    product.category = exactMapping[product.id];
    updated++;
    console.log(`✓ ${product.id}. ${product.name}`);
    console.log(`  ${oldCat} → ${product.category}\n`);
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log(`✅ تم تحديث ${updated} منتج\n`);

// عرض الفئات النهائية
const finalCategories = {};
products.forEach(p => {
  finalCategories[p.category] = (finalCategories[p.category] || 0) + 1;
});

console.log('📊 الفئات النهائية:');
Object.entries(finalCategories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});

// التحقق من عدم وجود مستلزمات منزلية
const remaining = products.filter(p => p.category === 'مستلزمات منزلية');
if (remaining.length === 0) {
  console.log('\n✅ تم تصنيف جميع المنتجات بدقة!');
} else {
  console.log(`\n⚠️ متبقي ${remaining.length} منتج في مستلزمات منزلية`);
}
