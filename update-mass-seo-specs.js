const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'public', 'mass-seo-data', 'pages.json');
const descriptionsPath = path.join(__dirname, 'diamond_descriptions.json');

const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
const descriptions = JSON.parse(fs.readFileSync(descriptionsPath, 'utf8'));

const specsMap = {};
descriptions.forEach(item => {
  specsMap[item.product] = item.description;
});

let updatedCount = 0;
pages.forEach(page => {
  const productTitle = page.product?.title;
  if (productTitle) {
    page.specifications = specsMap[productTitle] || `${productTitle} منتج عالي الجودة بمواصفات ممتازة ومصمم بعناية فائقة ليلبي احتياجاتك.`;
    updatedCount++;
  }
});

fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');

console.log(`✅ تم تحديث ${updatedCount} صفحة`);
console.log(`📄 ${pagesPath}`);
