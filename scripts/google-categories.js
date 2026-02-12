const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// فئات Google Merchant Center 2026
const googleCategories = {
  'Apparel & Accessories > Jewelry > Watches': ['ساعة', 'rolex', 'رولكس', 'watch', 'oyster'],
  'Health & Beauty > Personal Care > Hair Care > Hair Styling Tools': ['استشوار', 'straightener', 'curling', 'hair brush', 'مكواة شعر', 'فرد شعر', 'geepas', 'rosia', 'ceramic', 'جوي مجفف', 'جيباس مصفف', 'مصفف شعر'],
  'Health & Beauty > Personal Care > Massage & Relaxation': ['جهاز تدليك', 'مساج', 'massage'],
  'Health & Beauty > Personal Care > Hair Removal': ['جهاز إزالة الشعر', 'hair removal'],
  'Health & Beauty > Personal Care > Cosmetics > Makeup': ['ايلاينر', 'eyeliner', 'مكياج', 'makeup', 'topface'],
  'Health & Beauty > Personal Care > Cosmetics > Skin Care': ['جل مثبت', 'حواجب', 'شيجلام', 'gel', 'سيروم', 'serum', 'ريتينول', 'للبشرة'],
  'Health & Beauty > Personal Care > Bath & Body > Body Powder': ['بودرة معطرة', 'بودرة للجسم', 'body powder'],
  'Health & Beauty > Personal Care > Hair Care > Hair Treatments': ['زيت عشبي', 'للعناية بالشعر', 'نمو الشعر', 'واللحية', 'hair oil', 'hair growth'],
  'Home & Garden > Household Appliances > Climate Control Appliances': ['موقد', 'hamilton', 'heater'],
  'Home & Garden > Household Appliances > Small Kitchen Appliances > Blenders': ['خلاط كهربائي', 'blender'],
  'Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils > Dish Racks & Drain Boards': ['رف تجفيف الأطباق', 'dish rack'],
  'Home & Garden > Household Supplies > Laundry Supplies > Drying Racks': ['رف لتجفيف الملابس', 'clothes drying'],
  'Home & Garden > Bathroom Accessories > Bathroom Accessory Sets': ['ركن منظم لادوات الحمام', 'bathroom organizer'],
  'Home & Garden > Household Supplies > Household Cleaning Supplies': ['آلة غسل', 'منظف', 'بخاخ طلاء', 'spray paint'],
  'Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Care': ['آلة غسل سيارات', 'karcher', 'بندقية', 'فوم', 'car wash'],
  'Vehicles & Parts > Vehicle Parts & Accessories > Motor Vehicle Electronics > Motor Vehicle A/V Players & In-Dash Systems': ['حامل اكواب السيارة', 'cup holder'],
  'Electronics > Electronics Accessories > Power > Power Adapters & Chargers': ['شاحن سريع', 'للسيارة', 'usb c', 'charger'],
  'Baby & Toddler > Baby Safety > Potty Training': ['بوتي', 'سلم للأطفال', 'potty', 'ladder'],
  'Baby & Toddler > Baby & Toddler Toys > Piggy Banks': ['حصالة للنقود', 'للأطفال', 'piggy bank'],
  'Hardware > Building Materials > Hardware Accessories > Fasteners > Nails': ['مسمار', 'nail', '25 مسمار', '50 مسمار'],
  'Apparel & Accessories > Jewelry > Jewelry Boxes & Organizers': ['بوكس رولكس', 'box', 'jewelry box'],
  'Electronics > Electronics Accessories > Wearable Technology > Smart Jewelry': ['خاتم التسبيح الذكي', 'smart ring']
};

function findGoogleCategory(productName) {
  const nameLower = productName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(googleCategories)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  // تصنيف افتراضي بناءً على كلمات عامة
  if (nameLower.includes('جهاز') || nameLower.includes('device')) {
    return 'Electronics > Electronics Accessories';
  }
  
  return 'Home & Garden > Household Supplies';
}

// تحديث المنتجات
let updated = 0;
const updatedProducts = products.map(product => {
  const oldCategory = product.category;
  const newGoogleCategory = findGoogleCategory(product.name);
  
  // استخراج الفئة العربية من Google Category
  const arabicCategoryMap = {
    'Watches': 'ساعات وإكسسوارات',
    'Hair Styling Tools': 'أدوات تصفيف الشعر',
    'Hair Treatments': 'علاجات الشعر',
    'Massage': 'أجهزة التدليك',
    'Hair Removal': 'إزالة الشعر',
    'Makeup': 'مستحضرات التجميل',
    'Skin Care': 'العناية بالبشرة',
    'Body Powder': 'مستحضرات الجسم',
    'Climate Control': 'أجهزة منزلية',
    'Blenders': 'أجهزة مطبخ',
    'Dish Racks': 'أدوات مطبخ',
    'Drying Racks': 'أدوات غسيل',
    'Bathroom': 'أدوات حمام',
    'Cleaning Supplies': 'مستلزمات التنظيف',
    'Vehicle Care': 'العناية بالسيارات',
    'Motor Vehicle Electronics': 'إلكترونيات السيارات',
    'Chargers': 'شواحن ومحولات',
    'Potty Training': 'مستلزمات الأطفال',
    'Piggy Banks': 'ألعاب الأطفال',
    'Nails': 'أدوات البناء',
    'Jewelry Boxes': 'صناديق المجوهرات',
    'Smart Jewelry': 'إلكترونيات ذكية',
    'Electronics': 'إلكترونيات',
    'Household Supplies': 'مستلزمات منزلية'
  };
  
  let arabicCategory = 'مستلزمات منزلية';
  for (const [key, value] of Object.entries(arabicCategoryMap)) {
    if (newGoogleCategory.includes(key)) {
      arabicCategory = value;
      break;
    }
  }
  
  product.category = arabicCategory;
  product.googleCategory = newGoogleCategory;
  
  if (oldCategory !== arabicCategory) {
    updated++;
  }
  
  return product;
});

fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

// إحصائيات
const categories = {};
const googleCats = {};
updatedProducts.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
  googleCats[p.googleCategory] = (googleCats[p.googleCategory] || 0) + 1;
});

console.log('✅ تم التصنيف حسب Google Merchant Center 2026!\n');
console.log(`📊 تم تحديث: ${updated} منتج\n`);
console.log('📁 الفئات العربية:');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});
console.log('\n🌐 فئات Google:');
Object.entries(googleCats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});
