const fs = require('fs');
const path = require('path');

console.log('🔍 مراجعة شاملة للمشروع...\n');

const errors = [];
const warnings = [];
const fixed = [];

// 1. فحص خرائط الموقع
console.log('📍 فحص خرائط الموقع...');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const massSitemapPath = path.join(__dirname, '../public/mass-seo-sitemap.xml');

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  // فحص التواريخ المستقبلية
  if (sitemap.includes('2026') || sitemap.includes('2027')) {
    errors.push('❌ sitemap.xml يحتوي على تواريخ مستقبلية');
    // إصلاح
    const fixedSitemap = sitemap.replace(/202[6-9]-\d{2}-\d{2}/g, '2024-12-15');
    fs.writeFileSync(sitemapPath, fixedSitemap, 'utf8');
    fixed.push('✅ تم تصحيح التواريخ في sitemap.xml');
  } else {
    console.log('  ✅ sitemap.xml - التواريخ صحيحة');
  }
  
  // فحص النطاق
  if (sitemap.includes('oman-makhzoonk.shop')) {
    errors.push('❌ sitemap.xml يحتوي على نطاق خاطئ');
    const fixedSitemap = fs.readFileSync(sitemapPath, 'utf8')
      .replace(/oman-makhzoonk\.shop/g, 'arabsads.shop');
    fs.writeFileSync(sitemapPath, fixedSitemap, 'utf8');
    fixed.push('✅ تم تصحيح النطاق في sitemap.xml');
  } else {
    console.log('  ✅ sitemap.xml - النطاق صحيح');
  }
} else {
  errors.push('❌ sitemap.xml غير موجود');
}

if (fs.existsSync(massSitemapPath)) {
  const massSitemap = fs.readFileSync(massSitemapPath, 'utf8');
  
  if (massSitemap.includes('2026') || massSitemap.includes('2027')) {
    const fixedSitemap = massSitemap.replace(/202[6-9]-\d{2}-\d{2}/g, '2024-12-15');
    fs.writeFileSync(massSitemapPath, fixedSitemap, 'utf8');
    fixed.push('✅ تم تصحيح التواريخ في mass-seo-sitemap.xml');
  } else {
    console.log('  ✅ mass-seo-sitemap.xml - التواريخ صحيحة');
  }
  
  if (massSitemap.includes('oman-makhzoonk.shop')) {
    const fixedSitemap = fs.readFileSync(massSitemapPath, 'utf8')
      .replace(/oman-makhzoonk\.shop/g, 'arabsads.shop');
    fs.writeFileSync(massSitemapPath, fixedSitemap, 'utf8');
    fixed.push('✅ تم تصحيح النطاق في mass-seo-sitemap.xml');
  } else {
    console.log('  ✅ mass-seo-sitemap.xml - النطاق صحيح');
  }
} else {
  warnings.push('⚠️ mass-seo-sitemap.xml غير موجود');
}

// 2. فحص package.json
console.log('\n📦 فحص package.json...');
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // فحص التكرارات
  const scripts = {};
  const duplicates = [];
  Object.keys(pkg.scripts).forEach(key => {
    if (scripts[key]) {
      duplicates.push(key);
    } else {
      scripts[key] = pkg.scripts[key];
    }
  });
  
  if (duplicates.length > 0) {
    errors.push(`❌ package.json يحتوي على ${duplicates.length} سكريبت مكرر`);
    pkg.scripts = scripts;
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');
    fixed.push('✅ تم إزالة السكريبتات المكررة');
  } else {
    console.log('  ✅ package.json - لا توجد تكرارات');
  }
  
  console.log(`  📊 عدد السكريبتات: ${Object.keys(scripts).length}`);
} else {
  errors.push('❌ package.json غير موجود');
}

// 3. فحص next.config.js
console.log('\n⚙️ فحص next.config.js...');
const nextConfigPath = path.join(__dirname, '../next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (!nextConfig.includes("output: 'export'")) {
    errors.push('❌ next.config.js - output export غير مفعّل');
  } else {
    console.log('  ✅ next.config.js - output export مفعّل');
  }
  
  if (!nextConfig.includes('unoptimized: true')) {
    warnings.push('⚠️ next.config.js - images unoptimized غير مفعّل');
  } else {
    console.log('  ✅ next.config.js - images unoptimized مفعّل');
  }
} else {
  errors.push('❌ next.config.js غير موجود');
}

// 4. فحص robots.txt
console.log('\n🤖 فحص robots.txt...');
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  
  if (robots.includes('oman-makhzoonk.shop')) {
    const fixedRobots = robots.replace(/oman-makhzoonk\.shop/g, 'arabsads.shop');
    fs.writeFileSync(robotsPath, fixedRobots, 'utf8');
    fixed.push('✅ تم تصحيح النطاق في robots.txt');
  } else {
    console.log('  ✅ robots.txt - النطاق صحيح');
  }
  
  if (!robots.includes('Sitemap:')) {
    warnings.push('⚠️ robots.txt - لا يحتوي على رابط Sitemap');
  } else {
    console.log('  ✅ robots.txt - يحتوي على رابط Sitemap');
  }
} else {
  warnings.push('⚠️ robots.txt غير موجود');
}

// 5. فحص بيانات المنتجات
console.log('\n📦 فحص بيانات المنتجات...');
const productsDataPath = path.join(__dirname, '../src/data/products-data.json');
if (fs.existsSync(productsDataPath)) {
  const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
  
  console.log(`  📊 عدد المنتجات: ${productsData.length}`);
  
  // فحص الصور المكسورة
  let brokenImages = 0;
  let placeholderImages = 0;
  let externalImages = 0;
  
  productsData.forEach(product => {
    if (product.image && product.image.includes('placeholder')) {
      placeholderImages++;
    }
    if (!product.image || product.image === '' || product.image === 'undefined') {
      brokenImages++;
    }
    if (product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))) {
      externalImages++;
    }
  });
  
  if (brokenImages > 0) {
    warnings.push(`⚠️ ${brokenImages} منتج بدون صورة`);
  } else {
    console.log('  ✅ جميع المنتجات لديها صور');
  }
  
  if (placeholderImages > 0) {
    warnings.push(`⚠️ ${placeholderImages} منتج يستخدم صور placeholder`);
  } else {
    console.log('  ✅ لا توجد صور placeholder');
  }
  
  if (externalImages > 0) {
    console.log(`  📊 ${externalImages} منتج يستخدم صور خارجية`);
  }
} else {
  errors.push('❌ products-data.json غير موجود');
}

// 6. فحص ملفات SEO
console.log('\n🔍 فحص ملفات SEO...');
const seoDataPath = path.join(__dirname, '../public/seo-data/products-seo.json');
if (fs.existsSync(seoDataPath)) {
  const seoData = JSON.parse(fs.readFileSync(seoDataPath, 'utf8'));
  console.log(`  📊 عدد صفحات SEO: ${seoData.length}`);
  console.log('  ✅ products-seo.json موجود');
} else {
  warnings.push('⚠️ products-seo.json غير موجود');
}

const massSeoPath = path.join(__dirname, '../public/mass-seo-data/pages.json');
if (fs.existsSync(massSeoPath)) {
  const massSeoData = JSON.parse(fs.readFileSync(massSeoPath, 'utf8'));
  console.log(`  📊 عدد صفحات Mass SEO: ${massSeoData.length}`);
  console.log('  ✅ mass-seo pages.json موجود');
} else {
  warnings.push('⚠️ mass-seo pages.json غير موجود');
}

// النتيجة النهائية
console.log('\n' + '='.repeat(60));
console.log('📊 نتيجة المراجعة الشاملة');
console.log('='.repeat(60));

if (fixed.length > 0) {
  console.log('\n✅ الإصلاحات التلقائية:');
  fixed.forEach(fix => console.log(`  ${fix}`));
}

if (errors.length > 0) {
  console.log('\n❌ الأخطاء:');
  errors.forEach(error => console.log(`  ${error}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️ التحذيرات:');
  warnings.forEach(warning => console.log(`  ${warning}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n🎉 المشروع نظيف 100% - لا توجد أخطاء!');
} else {
  console.log(`\n📈 الإحصائيات:`);
  console.log(`  - الأخطاء: ${errors.length}`);
  console.log(`  - التحذيرات: ${warnings.length}`);
  console.log(`  - الإصلاحات: ${fixed.length}`);
}

console.log('\n✨ انتهت المراجعة الشاملة!');
