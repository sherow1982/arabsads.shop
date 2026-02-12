const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// قاموس الفئات بناءً على الكلمات المفتاحية
const categoryMap = {
  'إلكترونيات': ['سماعة', 'شاحن', 'كيبل', 'بطارية', 'هاتف', 'تابلت', 'لابتوب', 'كمبيوتر', 'ماوس', 'كيبورد', 'USB', 'بلوتوث', 'واي فاي'],
  'أدوات منزلية': ['مقلاة', 'قدر', 'طنجرة', 'صحن', 'كوب', 'ملعقة', 'سكين', 'مطبخ', 'فرن', 'خلاط', 'عصارة', 'غلاية'],
  'أدوات تنظيف': ['مكنسة', 'ممسحة', 'منظف', 'صابون', 'مسحوق', 'فرشاة', 'إسفنجة', 'قفازات', 'دلو'],
  'ملابس وإكسسوارات': ['قميص', 'بنطلون', 'فستان', 'حذاء', 'جزمة', 'شنطة', 'حقيبة', 'محفظة', 'حزام', 'ساعة', 'نظارة', 'قبعة', 'وشاح'],
  'مستحضرات تجميل': ['كريم', 'شامبو', 'صابون', 'عطر', 'مكياج', 'مرطب', 'واقي شمس', 'ماسك', 'سيروم'],
  'أدوات رياضية': ['كرة', 'حبل', 'دمبل', 'مضرب', 'سجادة يوغا', 'أثقال', 'جهاز رياضي'],
  'ألعاب وترفيه': ['لعبة', 'دمية', 'بازل', 'مكعبات', 'سيارة لعبة', 'طائرة لعبة'],
  'قرطاسية ومكتبية': ['قلم', 'دفتر', 'كراسة', 'مسطرة', 'ممحاة', 'مقص', 'دباسة', 'ورق', 'ملف'],
  'أدوات سيارات': ['منظف سيارة', 'معطر سيارة', 'حامل هاتف سيارة', 'شاحن سيارة', 'كفر سيارة'],
  'أثاث وديكور': ['كرسي', 'طاولة', 'رف', 'مرآة', 'ساعة حائط', 'إطار', 'وسادة', 'سجادة', 'ستارة'],
  'أدوات حدائق': ['مقص حديقة', 'خرطوم', 'رشاش', 'أصيص', 'سماد', 'بذور'],
  'صحة وعناية': ['ميزان', 'جهاز قياس', 'فيتامين', 'مكمل غذائي', 'كمامة', 'معقم'],
  'أطعمة ومشروبات': ['شاي', 'قهوة', 'عصير', 'حلوى', 'شوكولاتة', 'بسكويت', 'معكرونة', 'أرز', 'زيت'],
  'أدوات كهربائية': ['مفك', 'كماشة', 'مطرقة', 'مثقاب', 'منشار', 'شريط قياس', 'مسامير', 'براغي'],
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

// تصنيف المنتجات
let categorized = 0;
const updatedProducts = products.map(product => {
  if (!product.category || product.category === 'undefined') {
    product.category = categorizeProduct(product.name);
    categorized++;
  }
  return product;
});

// حفظ الملف
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

// عرض الإحصائيات
const categories = {};
updatedProducts.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});

console.log('✅ تم تصنيف المنتجات بنجاح!\n');
console.log('📊 الإحصائيات:');
console.log(`   - تم تصنيف: ${categorized} منتج`);
console.log(`   - إجمالي الفئات: ${Object.keys(categories).length}\n`);
console.log('📁 توزيع الفئات:');
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count} منتج`);
  });
