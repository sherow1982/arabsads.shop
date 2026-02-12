#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const http = require('http');
const { saveHistory } = require('./auto-history');

// دالة فحص صحة الرابط
function checkImageUrl(url) {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string' || url.includes('placeholder')) {
      resolve(false);
      return;
    }

    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      resolve(res.statusCode === 200 && res.headers['content-type']?.startsWith('image/'));
    });
    
    req.on('error', () => resolve(false));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// دالة العثور على أول صورة صالحة من الجاليري
async function findValidGalleryImage(gallery) {
  if (!gallery || !Array.isArray(gallery)) return null;
  
  for (const imageUrl of gallery) {
    if (await checkImageUrl(imageUrl)) {
      return imageUrl;
    }
  }
  return null;
}

// دالة إزالة صور placeholder من الجاليري
function removePlaceholderImages(gallery) {
  if (!gallery || !Array.isArray(gallery)) return [];
  
  return gallery.filter(url => 
    url && 
    typeof url === 'string' && 
    !url.includes('placeholder') && 
    !url.includes('example.com') &&
    !url.includes('via.placeholder')
  );
}

// دالة إصلاح الصور الرئيسية والجاليري
async function fixMainImagesFromGallery() {
  console.log('🔍 إصلاح الصور الرئيسية من الجاليري...');
  
  const productsDataPath = 'src/data/products-data.json';
  if (!fs.existsSync(productsDataPath)) {
    console.log('❌ ملف المنتجات غير موجود');
    return { total: 0, fixed: 0, cleaned: 0 };
  }
  
  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  let fixedMainImages = 0;
  let cleanedGalleries = 0;
  const fixedProducts = [];
  
  console.log(`📊 فحص ${productsData.length} منتج...`);
  
  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    const progress = `[${i + 1}/${productsData.length}]`;
    
    console.log(`${progress} فحص: ${product.name}`);
    
    // تنظيف الجاليري من صور placeholder
    const originalGalleryLength = product.gallery ? product.gallery.length : 0;
    product.gallery = removePlaceholderImages(product.gallery);
    
    if (originalGalleryLength !== product.gallery.length) {
      cleanedGalleries++;
      console.log(`🧹 تنظيف جاليري: ${product.name}`);
    }
    
    // فحص الصورة الرئيسية
    const mainImageValid = await checkImageUrl(product.mainImage);
    
    if (!mainImageValid) {
      // البحث عن صورة صالحة من الجاليري
      const validGalleryImage = await findValidGalleryImage(product.gallery);
      
      if (validGalleryImage) {
        console.log(`🔧 إصلاح صورة رئيسية: ${product.name}`);
        product.mainImage = validGalleryImage;
        fixedMainImages++;
        
        fixedProducts.push({
          id: product.id,
          name: product.name,
          oldImage: 'مكسورة',
          newImage: validGalleryImage
        });
      }
    }
  }
  
  // حفظ البيانات المحدثة
  if (fixedMainImages > 0 || cleanedGalleries > 0) {
    fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2), 'utf8');
    console.log(`✅ تم إصلاح ${fixedMainImages} صورة رئيسية`);
    console.log(`✅ تم تنظيف ${cleanedGalleries} جاليري`);
    
    // إنشاء تقرير
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    
    let report = `# تقرير إصلاح الصور الرئيسية من الجاليري\n\n`;
    report += `**التاريخ:** ${new Date().toLocaleString('ar-EG')}\n`;
    report += `**إجمالي المنتجات:** ${productsData.length}\n`;
    report += `**الصور الرئيسية المُصلحة:** ${fixedMainImages}\n`;
    report += `**الجاليريات المُنظفة:** ${cleanedGalleries}\n\n`;
    
    if (fixedProducts.length > 0) {
      report += `## الصور الرئيسية المُصلحة:\n\n`;
      fixedProducts.forEach((item, index) => {
        report += `### ${index + 1}. ${item.name}\n`;
        report += `- **ID:** ${item.id}\n`;
        report += `- **الصورة الجديدة:** ${item.newImage}\n\n`;
      });
    }
    
    const reportPath = 'reports/main-images-fix-report.md';
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`📄 تم إنشاء التقرير: ${reportPath}`);
  } else {
    console.log('✅ جميع الصور الرئيسية سليمة والجاليريات نظيفة');
  }
  
  return { 
    total: productsData.length, 
    fixed: fixedMainImages, 
    cleaned: cleanedGalleries,
    fixedProducts 
  };
}

// دالة إزالة صور placeholder من الملفات
function removePlaceholderFromFiles() {
  console.log('🧹 إزالة صور placeholder من الملفات...');
  
  const filesToCheck = [
    'src/pages/index.jsx',
    'src/pages/shop.jsx', 
    'src/pages/product/[id].jsx',
    'src/pages/seo/[slug].jsx',
    'src/components/Layout/Header.jsx',
    'src/components/Layout/Footer.jsx',
    'public/banner.jpg',
    'public/logo.jpg'
  ];
  
  let removedCount = 0;
  const removedItems = [];
  
  const placeholderPatterns = [
    /src\s*=\s*["'][^"']*placeholder[^"']*["']/gi,
    /src\s*=\s*["'][^"']*via\.placeholder[^"']*["']/gi,
    /src\s*=\s*["'][^"']*example\.com[^"']*["']/gi,
    /image\s*:\s*["'][^"']*placeholder[^"']*["']/gi,
    /mainImage\s*:\s*["'][^"']*placeholder[^"']*["']/gi
  ];
  
  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      placeholderPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          content = content.replace(pattern, 'src=""');
          removedCount += matches.length;
          removedItems.push(...matches.map(match => ({ file: filePath, content: match })));
        }
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🧹 تم تنظيف: ${filePath}`);
      }
    }
  });
  
  console.log(`✅ تم إزالة ${removedCount} صورة placeholder`);
  return { removedCount, removedItems };
}

// دالة التشغيل الرئيسية
async function main() {
  console.log('🚀 بدء إصلاح الصور الرئيسية وإزالة placeholder...');
  
  const startTime = Date.now();
  
  // إصلاح الصور الرئيسية من الجاليري
  const imageResults = await fixMainImagesFromGallery();
  
  // إزالة صور placeholder من الملفات
  const placeholderResults = removePlaceholderFromFiles();
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n📊 النتائج النهائية:');
  console.log(`   🖼️ صور رئيسية مُصلحة: ${imageResults.fixed}`);
  console.log(`   🧹 جاليريات مُنظفة: ${imageResults.cleaned}`);
  console.log(`   🗑️ صور placeholder مُزالة: ${placeholderResults.removedCount}`);
  console.log(`   ⏱️ الوقت المستغرق: ${duration}s`);
  
  // حفظ في الهيستوري
  saveHistory(
    'إصلاح الصور الرئيسية وإزالة placeholder',
    `فحص ${imageResults.total} منتج وإزالة صور placeholder`,
    `إصلاح ${imageResults.fixed} صورة رئيسية وتنظيف ${imageResults.cleaned} جاليري وإزالة ${placeholderResults.removedCount} placeholder`,
    'src/data/products-data.json, reports/main-images-fix-report.md'
  );
  
  console.log('\n✅ تم الانتهاء بنجاح!');
  
  return {
    mainImagesFixed: imageResults.fixed,
    galleriesCleaned: imageResults.cleaned,
    placeholdersRemoved: placeholderResults.removedCount
  };
}

// تشغيل تلقائي
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixMainImagesFromGallery, removePlaceholderFromFiles };