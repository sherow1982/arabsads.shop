#!/usr/bin/env node

const fs = require('fs');
const { saveHistory } = require('./auto-history');

// الفئات الصحيحة من بيانات المنتجات
const CORRECT_CATEGORIES = {
  'ساعات وإكسسوارات': 'ساعات',
  'أدوات مطبخ': 'أدوات مطبخ', 
  'صحة وعناية': 'صحة وعناية',
  'إلكترونيات': 'إلكترونيات',
  'أطفال': 'أطفال',
  'إكسسوارات سيارات': 'إكسسوارات سيارات',
  'إضاءة': 'إضاءة',
  'حقائب': 'حقائب',
  'عطور': 'عطور'
};

// دالة إزالة صور placeholder
function removePlaceholderImages() {
  console.log('🧹 إزالة صور placeholder...');
  
  const productsDataPath = 'src/data/products-data.json';
  if (!fs.existsSync(productsDataPath)) {
    console.log('❌ ملف المنتجات غير موجود');
    return { removed: 0 };
  }
  
  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  let removedCount = 0;
  
  productsData.forEach(product => {
    // إزالة صور placeholder من الصورة الرئيسية
    if (product.mainImage && (
      product.mainImage.includes('placeholder') ||
      product.mainImage.includes('via.placeholder') ||
      product.mainImage.includes('example.com') ||
      product.mainImage === '' ||
      product.mainImage === 'https://via.placeholder.com/300'
    )) {
      // استخدام أول صورة صالحة من الجاليري أو صورة افتراضية
      const validGalleryImage = product.gallery?.find(img => 
        img && !img.includes('placeholder') && !img.includes('example.com')
      );
      
      if (validGalleryImage) {
        product.mainImage = validGalleryImage;
      } else {
        product.mainImage = '/logo.jpg'; // صورة افتراضية
      }
      removedCount++;
      console.log(`🔧 إصلاح صورة: ${product.name}`);
    }
    
    // تنظيف الجاليري من صور placeholder
    if (product.gallery && Array.isArray(product.gallery)) {
      const originalLength = product.gallery.length;
      product.gallery = product.gallery.filter(img => 
        img && 
        !img.includes('placeholder') && 
        !img.includes('via.placeholder') &&
        !img.includes('example.com') &&
        img !== ''
      );
      
      if (product.gallery.length !== originalLength) {
        removedCount++;
        console.log(`🧹 تنظيف جاليري: ${product.name}`);
      }
    }
  });
  
  if (removedCount > 0) {
    fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2), 'utf8');
    console.log(`✅ تم إزالة ${removedCount} صورة placeholder`);
  }
  
  return { removed: removedCount };
}

// دالة تحديد الفئة الصحيحة للمنتج
function getCategoryForProduct(productName) {
  const name = productName.toLowerCase();
  
  if (name.includes('ساعة') || name.includes('rolex') || name.includes('watch')) return 'ساعات';
  if (name.includes('عطر') || name.includes('perfume') || name.includes('بودرة معطرة')) return 'عطور';
  if (name.includes('حقيبة') || name.includes('bag') || name.includes('vuitton')) return 'حقائب';
  if (name.includes('خلاط') || name.includes('مطحنة') || name.includes('قطاعة') || name.includes('غلاية') || 
      name.includes('شواية') || name.includes('صانعة') || name.includes('ماكينة') || name.includes('موقد') ||
      name.includes('مفرمة') || name.includes('عصارة') || name.includes('وعاء الطهي')) return 'أدوات مطبخ';
  if (name.includes('جهاز') || name.includes('شاحن') || name.includes('محول') || name.includes('استشوار') ||
      name.includes('مجفف') || name.includes('فرشاة') || name.includes('مكواة') || name.includes('مكنسة')) return 'إلكترونيات';
  if (name.includes('مصباح') || name.includes('إضاءة') || name.includes('led') || name.includes('نور')) return 'إضاءة';
  if (name.includes('أطفال') || name.includes('طفل') || name.includes('بوتي') || name.includes('حصالة') ||
      name.includes('طائرة') || name.includes('دراجة أطفال')) return 'أطفال';
  if (name.includes('سيارة') || name.includes('حامل اكواب') || name.includes('مرآة سيارة') ||
      name.includes('منفاخ') || name.includes('رافعة')) return 'إكسسوارات سيارات';
  if (name.includes('تدليك') || name.includes('مساج') || name.includes('سيروم') || name.includes('كريم') ||
      name.includes('كحل') || name.includes('كونسيلر') || name.includes('قلم روج') || name.includes('جل') ||
      name.includes('مجموعة العناية') || name.includes('ميزان') || name.includes('وسادة')) return 'صحة وعناية';
  
  return 'منتجات متنوعة';
}

// دالة إصلاح الفئات
function fixCategories() {
  console.log('🔧 إصلاح الفئات...');
  
  const productsDataPath = 'src/data/products-data.json';
  const productsPath = 'src/data/products.js';
  
  if (!fs.existsSync(productsDataPath)) {
    console.log('❌ ملف المنتجات غير موجود');
    return { fixed: 0 };
  }
  
  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  let fixedCount = 0;
  
  // إصلاح الفئات في products-data.json
  productsData.forEach(product => {
    const correctCategory = getCategoryForProduct(product.name);
    if (product.category !== correctCategory) {
      console.log(`🔧 إصلاح فئة: ${product.name} من "${product.category}" إلى "${correctCategory}"`);
      product.category = correctCategory;
      fixedCount++;
    }
  });
  
  if (fixedCount > 0) {
    fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2), 'utf8');
  }
  
  // تحديث ملف products.js
  if (fs.existsSync(productsPath)) {
    let productsContent = fs.readFileSync(productsPath, 'utf8');
    
    // تحديث mapping الفئات
    const newMapping = `export const products = productsData.map(product => ({
  id: product.id,
  title: product.name,
  price: parseFloat(product.price.replace(/[^\\d.]/g, '')),
  salePrice: parseFloat(product.sale_price.replace(/[^\\d.]/g, '')),
  image: product.mainImage,
  additionalImage: product.gallery && product.gallery.length > 0 ? product.gallery[0] : product.mainImage,
  gallery: product.gallery || [],
  description: product.description || product.name,
  category: product.category,
  inStock: true,
  sku: \`OM-\${product.id}\`,
  rating: 4.5,
  reviews: []
}));`;
    
    // استبدال المحتوى
    productsContent = productsContent.replace(
      /export const products = productsData\.map\([\s\S]*?\}\)\);/,
      newMapping
    );
    
    fs.writeFileSync(productsPath, productsContent, 'utf8');
    console.log('✅ تم تحديث ملف products.js');
  }
  
  return { fixed: fixedCount };
}

// دالة إزالة placeholder من الملفات
function removePlaceholderFromFiles() {
  console.log('🧹 إزالة placeholder من الملفات...');
  
  const filesToCheck = [
    'src/pages/index.jsx',
    'src/pages/shop.jsx',
    'src/pages/product/[id].jsx',
    'src/components/Layout/Header.jsx',
    'src/components/Layout/Footer.jsx'
  ];
  
  let removedCount = 0;
  
  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // إزالة placeholder attributes
      content = content.replace(/placeholder\s*=\s*["'][^"']*["']/gi, '');
      content = content.replace(/src\s*=\s*["'][^"']*placeholder[^"']*["']/gi, 'src=""');
      content = content.replace(/alt\s*=\s*["']placeholder[^"']*["']/gi, 'alt=""');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        removedCount++;
        console.log(`🧹 تم تنظيف: ${filePath}`);
      }
    }
  });
  
  return { removed: removedCount };
}

// دالة التشغيل الرئيسية
async function main() {
  console.log('🚀 بدء إزالة placeholder وإصلاح الفئات...');
  
  const startTime = Date.now();
  
  // إزالة صور placeholder
  const imageResults = removePlaceholderImages();
  
  // إصلاح الفئات
  const categoryResults = fixCategories();
  
  // إزالة placeholder من الملفات
  const fileResults = removePlaceholderFromFiles();
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n📊 النتائج النهائية:');
  console.log(`   🖼️ صور placeholder مُزالة: ${imageResults.removed}`);
  console.log(`   🏷️ فئات مُصلحة: ${categoryResults.fixed}`);
  console.log(`   📄 ملفات مُنظفة: ${fileResults.removed}`);
  console.log(`   ⏱️ الوقت المستغرق: ${duration}s`);
  
  // حفظ في الهيستوري
  saveHistory(
    'إزالة placeholder وإصلاح الفئات',
    'إزالة جميع صور placeholder وإصلاح فئات المنتجات في المتجر',
    `إزالة ${imageResults.removed} صورة placeholder وإصلاح ${categoryResults.fixed} فئة وتنظيف ${fileResults.removed} ملف`,
    'src/data/products-data.json, src/data/products.js, src/pages/shop.jsx'
  );
  
  console.log('\n✅ تم الانتهاء بنجاح!');
  
  return {
    placeholdersRemoved: imageResults.removed,
    categoriesFixed: categoryResults.fixed,
    filesCleaned: fileResults.removed
  };
}

// تشغيل تلقائي
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { removePlaceholderImages, fixCategories, removePlaceholderFromFiles };