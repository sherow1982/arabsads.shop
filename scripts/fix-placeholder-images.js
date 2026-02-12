const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let fixed = 0;

products.forEach(product => {
  let changed = false;
  
  // إصلاح الصورة الرئيسية إذا كانت placeholder
  if (product.mainImage && product.mainImage.includes('unsplash.com')) {
    // استخدام أول صورة من الجاليري إذا كانت موجودة
    if (product.gallery && product.gallery.length > 0) {
      const validImage = product.gallery.find(img => img && !img.includes('unsplash.com'));
      if (validImage) {
        product.mainImage = validImage;
        changed = true;
      }
    }
  }
  
  // تنظيف الجاليري من الصور النائبة
  if (product.gallery && product.gallery.length > 0) {
    const cleanGallery = product.gallery.filter(img => img && !img.includes('unsplash.com'));
    if (cleanGallery.length !== product.gallery.length) {
      product.gallery = cleanGallery;
      changed = true;
    }
  }
  
  if (changed) {
    fixed++;
    console.log(`✓ تم إصلاح المنتج ${product.id}: ${product.name}`);
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

console.log(`\n✅ تم إصلاح ${fixed} منتج`);
console.log(`✅ تم إزالة جميع الصور النائبة من المتجر`);
