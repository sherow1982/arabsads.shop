#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { saveHistory } = require('./auto-history');

// قائمة الصور البديلة عالية الجودة
const HIGH_QUALITY_IMAGES = {
  // صور المنتجات العمانية عالية الجودة
  'default': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&crop=center',
  'jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center',
  'watches': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop&crop=center',
  'perfume': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop&crop=center',
  'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=800&fit=crop&crop=center',
  'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop&crop=center',
  'home': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center',
  'beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&crop=center'
};

// دالة فحص صحة الرابط
function checkImageUrl(url) {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string') {
      resolve(false);
      return;
    }

    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve(res.statusCode === 200 && res.headers['content-type']?.startsWith('image/'));
    });
    
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// دالة تحديد نوع المنتج
function getProductCategory(productName) {
  const name = productName.toLowerCase();
  
  if (name.includes('ساعة') || name.includes('watch')) return 'watches';
  if (name.includes('عطر') || name.includes('perfume')) return 'perfume';
  if (name.includes('مجوهرات') || name.includes('jewelry') || name.includes('خاتم') || name.includes('سوار')) return 'jewelry';
  if (name.includes('إلكترون') || name.includes('هاتف') || name.includes('جهاز')) return 'electronics';
  if (name.includes('ملابس') || name.includes('فستان') || name.includes('قميص')) return 'fashion';
  if (name.includes('منزل') || name.includes('ديكور')) return 'home';
  if (name.includes('تجميل') || name.includes('مكياج') || name.includes('كريم')) return 'beauty';
  
  return 'default';
}

// دالة إصلاح الصور المكسورة
async function fixBrokenImages() {
  console.log('🔍 فحص الصور المكسورة...');
  
  // قراءة بيانات المنتجات
  const productsDataPath = 'src/data/products-data.json';
  if (!fs.existsSync(productsDataPath)) {
    console.log('❌ ملف المنتجات غير موجود');
    return;
  }
  
  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  let fixedCount = 0;
  let brokenImages = [];
  
  console.log(`📊 فحص ${productsData.length} منتج...`);
  
  // فحص كل منتج
  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    const progress = `[${i + 1}/${productsData.length}]`;
    
    console.log(`${progress} فحص: ${product.name}`);
    
    // فحص الصورة الرئيسية
    const mainImageValid = await checkImageUrl(product.mainImage);
    if (!mainImageValid) {
      const category = getProductCategory(product.name);
      const newImage = HIGH_QUALITY_IMAGES[category];
      
      console.log(`🔧 إصلاح صورة: ${product.name}`);
      brokenImages.push({
        id: product.id,
        name: product.name,
        oldImage: product.mainImage,
        newImage: newImage,
        category: category
      });
      
      product.mainImage = newImage;
      fixedCount++;
    }
    
    // فحص معرض الصور
    if (product.gallery && Array.isArray(product.gallery)) {
      for (let j = 0; j < product.gallery.length; j++) {
        const galleryImageValid = await checkImageUrl(product.gallery[j]);
        if (!galleryImageValid) {
          const category = getProductCategory(product.name);
          product.gallery[j] = HIGH_QUALITY_IMAGES[category];
          fixedCount++;
        }
      }
    }
  }
  
  // حفظ البيانات المحدثة
  if (fixedCount > 0) {
    fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2), 'utf8');
    console.log(`✅ تم إصلاح ${fixedCount} صورة مكسورة`);
    
    // إنشاء تقرير
    const reportPath = 'reports/broken-images-report.md';
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    
    let report = `# تقرير إصلاح الصور المكسورة\n\n`;
    report += `**التاريخ:** ${new Date().toLocaleString('ar-EG')}\n`;
    report += `**إجمالي المنتجات:** ${productsData.length}\n`;
    report += `**الصور المُصلحة:** ${fixedCount}\n\n`;
    report += `## الصور المُصلحة:\n\n`;
    
    brokenImages.forEach((item, index) => {
      report += `### ${index + 1}. ${item.name}\n`;
      report += `- **ID:** ${item.id}\n`;
      report += `- **الفئة:** ${item.category}\n`;
      report += `- **الصورة القديمة:** ${item.oldImage}\n`;
      report += `- **الصورة الجديدة:** ${item.newImage}\n\n`;
    });
    
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`📄 تم إنشاء التقرير: ${reportPath}`);
  } else {
    console.log('✅ جميع الصور سليمة');
  }
  
  return { total: productsData.length, fixed: fixedCount, brokenImages };
}

// دالة مسح العناصر النائبة
function removePlaceholderElements() {
  console.log('🧹 مسح العناصر النائبة...');
  
  const filesToCheck = [
    'src/pages/index.jsx',
    'src/pages/shop.jsx',
    'src/pages/product/[id].jsx',
    'src/pages/seo/[slug].jsx',
    'src/components/Layout/Header.jsx',
    'src/components/Layout/Footer.jsx'
  ];
  
  let removedCount = 0;
  const removedItems = [];
  
  // قائمة العناصر النائبة للإزالة
  const placeholderPatterns = [
    /placeholder\s*=\s*["'][^"']*["']/gi,
    /alt\s*=\s*["']placeholder[^"']*["']/gi,
    /title\s*=\s*["']placeholder[^"']*["']/gi,
    /src\s*=\s*["'].*placeholder.*["']/gi,
    /href\s*=\s*["']#placeholder["']/gi,
    /className\s*=\s*["'][^"']*placeholder[^"']*["']/gi,
    /\/\*\s*placeholder\s*\*\//gi,
    /\/\/\s*placeholder.*/gi,
    /<!\-\-\s*placeholder.*?\-\->/gi
  ];
  
  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      placeholderPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, '');
          removedCount += matches.length;
          removedItems.push(...matches.map(match => ({ file: filePath, content: match })));
        }
      });
      
      // إزالة الأسطر الفارغة الزائدة
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🧹 تم تنظيف: ${filePath}`);
      }
    }
  });
  
  console.log(`✅ تم مسح ${removedCount} عنصر نائب`);
  return { removedCount, removedItems };
}

// دالة التشغيل الرئيسية
async function main() {
  console.log('🚀 بدء إصلاح الصور والعناصر النائبة...');
  
  const startTime = Date.now();
  
  // إصلاح الصور المكسورة
  const imageResults = await fixBrokenImages();
  
  // مسح العناصر النائبة
  const placeholderResults = removePlaceholderElements();
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n📊 النتائج النهائية:');
  console.log(`   🖼️ صور مُصلحة: ${imageResults.fixed}`);
  console.log(`   🧹 عناصر نائبة مُزالة: ${placeholderResults.removedCount}`);
  console.log(`   ⏱️ الوقت المستغرق: ${duration}s`);
  
  // حفظ في الهيستوري
  saveHistory(
    'إصلاح الصور والعناصر النائبة',
    `فحص ${imageResults.total} منتج ومسح العناصر النائبة`,
    `إصلاح ${imageResults.fixed} صورة ومسح ${placeholderResults.removedCount} عنصر نائب`,
    'src/data/products-data.json, reports/broken-images-report.md'
  );
  
  console.log('\n✅ تم الانتهاء بنجاح!');
}

// تشغيل تلقائي
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixBrokenImages, removePlaceholderElements };