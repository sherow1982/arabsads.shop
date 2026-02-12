const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const categoryMap = {
  'إلكترونيات': ['موقد رقمي', 'hamilton'],
  'أدوات منزلية': ['آلة غسل'],
  'أدوات تنظيف': ['بخاخ طلاء'],
  'ملابس وإكسسوارات': ['rolex', 'رولكس', 'بوكس', 'oyster'],
  'مستحضرات تجميل': ['ايلاينر', 'topface', 'جل مثبت', 'حواجب', 'شيجلام'],
  'أجهزة العناية الشخصية': ['استشوار', 'straightener', 'hair brush', 'curling', 'ceramic', 'geepas', 'geekas', 'jeepas', 'rosia', 'روزيا', 'جهاز إزالة الشعر', 'جهاز تدليك', 'مساج'],
  'ألعاب وأطفال': ['بوتي', 'سلم للأطفال'],
  'أدوات كهربائية': ['مسمار', '25 مسمار', '50 مسمار'],
  'أدوات سيارات': ['آلة غسل سيارات', 'karcher', 'بندقية', 'فوم'],
  'منتجات متنوعة': []
};

function categorizeProduct(name) {
  const nameLower = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMap)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return 'منتجات متنوعة';
}

let categorized = 0;
const updatedProducts = products.map(product => {
  const newCategory = categorizeProduct(product.name);
  if (product.category !== newCategory) {
    product.category = newCategory;
    categorized++;
  }
  return product;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

const categories = {};
updatedProducts.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});

console.log('✅ تم تصنيف المنتجات!\n');
console.log('📊 تم تحديث: ' + categorized + ' منتج\n');
console.log('📁 الفئات:');
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count}`);
  });
