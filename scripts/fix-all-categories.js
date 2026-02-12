const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const categoryMap = {
  // أجهزة كهربائية
  'مكواة': 'أدوات تصفيف الشعر',
  'استشوار': 'أدوات تصفيف الشعر',
  'فرشاة': 'أدوات تصفيف الشعر',
  'مجفف': 'أدوات تصفيف الشعر',
  'مصفف': 'أدوات تصفيف الشعر',
  
  // أجهزة مطبخ
  'خلاط': 'أجهزة مطبخ',
  'عصارة': 'أجهزة مطبخ',
  'مطحنة': 'أجهزة مطبخ',
  'مفرمة': 'أجهزة مطبخ',
  'صانعة': 'أجهزة مطبخ',
  'شواية': 'أجهزة مطبخ',
  'موقد': 'أجهزة مطبخ',
  'غلاية': 'أجهزة مطبخ',
  'وعاء': 'أجهزة مطبخ',
  
  // أدوات مطبخ
  'قطاعة': 'أدوات مطبخ',
  'مبشرة': 'أدوات مطبخ',
  'مقشرة': 'أدوات مطبخ',
  'رف': 'أدوات مطبخ',
  
  // تنظيف
  'مكنسة': 'أدوات تنظيف',
  'ممسحة': 'أدوات تنظيف',
  'فرشاة تنظيف': 'أدوات تنظيف',
  'بخار': 'أدوات تنظيف',
  'تلميع': 'أدوات تنظيف',
  'معجون': 'أدوات تنظيف',
  
  // أجهزة منزلية
  'مكيف': 'أجهزة منزلية',
  'مبخرة': 'أجهزة منزلية',
  'مصباح': 'إضاءة وديكور',
  
  // إلكترونيات
  'شاحن': 'شواحن ومحولات',
  'مكبر صوت': 'إلكترونيات ذكية',
  'قران': 'إلكترونيات ذكية',
  'قرآن': 'إلكترونيات ذكية',
  
  // رياضة
  'تمرين': 'أجهزة رياضية',
  'دواسة': 'أجهزة رياضية',
  
  // أطفال
  'حصالة': 'ألعاب الأطفال',
  'طائرة': 'ألعاب الأطفال',
  
  // أخرى
  'خاتم': 'إكسسوارات',
  'طاولة': 'أثاث',
  'ركن': 'أدوات حمام',
  'وسادة': 'أجهزة طبية',
  'ماكينة خياطة': 'أدوات خياطة',
  'مسدس': 'أدوات كهربائية',
  'منفاخ': 'أدوات كهربائية',
  'مج': 'أدوات مطبخ',
  'صاروخ': 'أدوات حدائق',
  'عصا': 'إكسسوارات تصوير',
};

let updated = 0;

products.forEach(product => {
  if (product.category === 'مستلزمات منزلية') {
    const name = product.name.toLowerCase();
    
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (name.includes(keyword.toLowerCase())) {
        product.category = category;
        updated++;
        console.log(`✓ ${product.name} → ${category}`);
        break;
      }
    }
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
