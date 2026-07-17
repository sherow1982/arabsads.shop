const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync('public/mass-seo-data/pages.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('src/data/products-data.json', 'utf8'));

// بناء map من id إلى اسم المنتج
const productMap = {};
for (const p of products) {
  productMap[p.id] = p.name || p.title || '';
}

let fixed = 0;
for (const page of pages) {
  const productName = productMap[page.productId] || '';
  if (!productName) continue;

  let changed = false;
  for (const key of ['title', 'description', 'h1', 'content', 'keywords']) {
    if (page[key] && page[key].includes('undefined')) {
      page[key] = page[key].split('undefined').join(productName);
      changed = true;
    }
  }
  if (changed) fixed++;
}

fs.writeFileSync('public/mass-seo-data/pages.json', JSON.stringify(pages), 'utf8');
console.log(`✅ تم إصلاح ${fixed} صفحة`);

// تحقق
const sample = pages.find(p => p.slug === 'buy-1');
console.log('buy-1 title:', sample.title);
console.log('buy-1 h1:', sample.h1);
