const fs = require('fs');
const path = require('path');

// قراءة ملف JSON
const rawData = fs.readFileSync('D:\\E-stores\\emeratis\\data\\makhzoon-products.json', 'utf8');
const products = JSON.parse(rawData);

// تحويل المنتجات
const convertedProducts = products.map(product => ({
  id: product.id,
  title: product.title,
  description: product.description || '',
  image: product["image link"],
  additionalImage: product["additional image link"] || product["image link"],
  price: product.price,
  salePrice: product["sale price"],
  category: getCategoryFromTitle(product.title),
  inStock: product.availability === "in_stock",
  sku: product.sku,
  condition: product.condition
}));

// تحديد الفئة بناءً على العنوان
function getCategoryFromTitle(title) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('ساعة') || lowerTitle.includes('watch') || lowerTitle.includes('rolex')) {
    return 'ساعات';
  } else if (lowerTitle.includes('حقيبة') || lowerTitle.includes('bag')) {
    return 'حقائب';
  } else if (lowerTitle.includes('عطر') || lowerTitle.includes('perfume')) {
    return 'عطور';
  } else if (lowerTitle.includes('طفل') || lowerTitle.includes('أطفال') || lowerTitle.includes('kids')) {
    return 'أطفال';
  } else if (lowerTitle.includes('مطبخ') || lowerTitle.includes('طبخ') || lowerTitle.includes('kitchen')) {
    return 'أدوات مطبخ';
  } else if (lowerTitle.includes('سيارة') || lowerTitle.includes('car')) {
    return 'إكسسوارات سيارات';
  } else if (lowerTitle.includes('مساج') || lowerTitle.includes('massage') || lowerTitle.includes('صحة')) {
    return 'صحة وعناية';
  } else if (lowerTitle.includes('إضاءة') || lowerTitle.includes('مصباح') || lowerTitle.includes('light')) {
    return 'إضاءة';
  } else if (lowerTitle.includes('تخييم') || lowerTitle.includes('camping') || lowerTitle.includes('رحلات')) {
    return 'رحلات وتخييم';
  } else {
    return 'منتجات متنوعة';
  }
}

// كتابة الملف
const output = `export const products = ${JSON.stringify(convertedProducts, null, 2)};
`;

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'products.js'),
  output,
  'utf8'
);

console.log(`✅ تم تحويل ${convertedProducts.length} منتج بنجاح!`);
