const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

console.log('🔧 تحديث بيانات المنتجات...\n');

let updated = 0;

products.forEach(product => {
  let changed = false;
  
  // استخراج السعر الرقمي
  const priceStr = String(product.price).replace(/[^\d.]/g, '');
  const price = parseFloat(priceStr);
  
  // 1. إضافة السعر قبل وبعد الخصم
  if (!product.originalPrice && price) {
    product.originalPrice = Math.round(price * 1.3 * 100) / 100;
    changed = true;
  }
  
  // 2. جعل جميع المنتجات في المخزون
  if (!product.inStock) {
    product.inStock = true;
    changed = true;
  }
  
  // 3. إضافة صور المنتجات من mainImage
  if (product.mainImage && (!product.images || product.images.length === 0)) {
    product.images = [product.mainImage];
    changed = true;
  }
  
  // 4. إضافة image للتوافق
  if (product.mainImage && !product.image) {
    product.image = product.mainImage;
    changed = true;
  }
  
  if (changed) updated++;
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');

console.log(`✅ تم تحديث ${updated} منتج`);
console.log('📊 التحديثات:');
console.log('  - السعر قبل وبعد الخصم');
console.log('  - جميع المنتجات في المخزون');
console.log('  - صور المنتجات');
