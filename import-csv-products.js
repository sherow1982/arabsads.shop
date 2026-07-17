const fs = require('fs');
const path = require('path');

const csvDir = 'C:/Users/sherow/Desktop/منتجات ايكوميرج الكويت/شغل خلصان/تم';
const productsFile = 'src/data/products-data.json';

// قراءة CSV بسيطة بدون مكتبة خارجية
function parseCSV(content) {
  const lines = content.split('\n');
  const headers = lines[0].replace(/^\uFEFF/, '').split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // تقسيم مع مراعاة الفواصل داخل quotes
    const values = [];
    let current = '';
    let inQuote = false;
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; }
      else if (ch === ',' && !inQuote) { values.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    values.push(current.trim());
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = values[idx] || ''; });
    rows.push(row);
  }
  return rows;
}

// تحديد الكاتيجوري من اسم الملف
function getCategoryFromFile(filename) {
  if (filename.includes('مستلزمات المنزل')) return 'مستلزمات منزلية';
  if (filename.includes('مستلزمات المطبخ')) return 'مستلزمات المطبخ';
  if (filename.includes('اجهزة منزلية')) return 'أجهزة منزلية';
  if (filename.includes('الكترونيات')) return 'إلكترونيات';
  if (filename.includes('كوزماتكس')) return 'مستحضرات تجميل';
  if (filename.includes('عطور')) return 'عطور';
  if (filename.includes('مستلزمات السيارات')) return 'مستلزمات السيارات';
  if (filename.includes('مستلزمات رياضية')) return 'مستلزمات رياضية';
  if (filename.includes('مستلزمات طبية')) return 'مستلزمات طبية';
  if (filename.includes('مشدات')) return 'مشدات وملابس';
  if (filename.includes('العاب')) return 'ألعاب';
  if (filename.includes('العدد والادوات')) return 'عدد وأدوات';
  return 'متنوع';
}

// قراءة products-data.json الحالي
const currentProducts = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

// بناء map من SKU إلى المنتج الحالي
const skuMap = {};
for (const p of currentProducts) {
  if (p.sku) skuMap[String(p.sku)] = p;
}

// قراءة كل ملفات CSV
const csvFiles = fs.readdirSync(csvDir).filter(f => f.endsWith('_wuilt.csv'));
console.log(`وجدت ${csvFiles.length} ملف CSV`);

let updatedCount = 0;
let notFoundCount = 0;

for (const csvFile of csvFiles) {
  const category = getCategoryFromFile(csvFile);
  const content = fs.readFileSync(path.join(csvDir, csvFile)).toString('utf8');
  const rows = parseCSV(content);
  
  for (const row of rows) {
    const sku = String(row['Handle'] || '').trim();
    const title = (row['Title'] || '').trim();
    const price = parseFloat(row['Regular Price']) || 0;
    const salePrice = parseFloat(row['Sale Price']) || 0;
    const description = (row['Description'] || '').trim();
    const images = (row['Images'] || '').trim();
    
    if (!sku || !title) continue;
    
    const product = skuMap[sku];
    if (product) {
      // تحديث البيانات
      product.title = title;
      product.name = title;
      if (price > 0) product.price = price;
      if (salePrice > 0) product.salePrice = salePrice;
      if (description) product.description = description;
      if (images) {
        const imgList = images.split('|').map(i => i.trim()).filter(Boolean);
        if (imgList.length > 0) {
          product.image = imgList[0];
          product.mainImage = imgList[0];
          product.images = imgList;
          if (imgList[1]) product.additionalImage = imgList[1];
        }
      }
      product.category = category;
      updatedCount++;
    } else {
      notFoundCount++;
    }
  }
}

// إصلاح undefined المتبقي في specs و reviews و faqs
for (const p of currentProducts) {
  const name = p.title || p.name || '';
  if (!name) continue;
  
  // إصلاح specs
  if (p.specs) {
    const specStr = JSON.stringify(p.specs)
      .split('undefined').join(name)
      .split('**' + name + '**').join(name)
      .replace(/[\x00-\x1F\x7F]/g, ' ');
    try { p.specs = JSON.parse(specStr); } catch(e) {}
  }
  // إصلاح reviews
  if (p.reviews) {
    p.reviews = p.reviews.map(r => ({
      ...r,
      comment: (r.comment || '').split('undefined').join(name)
    }));
  }
  // إصلاح faqs
  if (p.faqs) {
    p.faqs = p.faqs.map(f => ({
      ...f,
      q: (f.q || '').split('undefined').join(name),
      a: (f.a || '').split('undefined').join(name)
    }));
  }
  // إصلاح richSchema
  if (p.richSchema) {
    const schemaStr = JSON.stringify(p.richSchema)
      .split('undefined').join(name)
      .split('"addressCountry":"OM"').join('"addressCountry":"KW"')
      .split('"addressCountry": "OM"').join('"addressCountry": "KW"')
      .replace(/[\x00-\x1F\x7F]/g, ' ');
    try {
      p.richSchema = JSON.parse(schemaStr);
      if (p.mainImage || p.image) p.richSchema.image = [p.mainImage || p.image];
      p.richSchema.name = name;
    } catch(e) {}
  }
  // إضافة name إذا مش موجود
  p.name = name;
}

fs.writeFileSync(productsFile, JSON.stringify(currentProducts, null, 2), 'utf8');

console.log(`✅ تم تحديث ${updatedCount} منتج من CSV`);
console.log(`⚠️  ${notFoundCount} صف في CSV مش موجود في products-data.json`);
console.log(`📦 إجمالي المنتجات: ${currentProducts.length}`);

// تحقق
const sample = currentProducts.find(p => p.id === 1);
console.log('\nمثال المنتج 1:');
console.log('  name:', sample.name);
console.log('  title:', sample.title);
console.log('  price:', sample.price);
console.log('  image:', sample.image ? sample.image.substring(0, 60) + '...' : 'لا يوجد');
