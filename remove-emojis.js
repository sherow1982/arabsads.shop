const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'src', 'data', 'products.js');
const productsContent = fs.readFileSync(productsPath, 'utf8');

const productsMatch = productsContent.match(/export const products = (\[[\s\S]*\]);/);
if (!productsMatch) {
  console.error('لم يتم العثور على بيانات المنتجات');
  process.exit(1);
}

const products = JSON.parse(productsMatch[1]);

function removeEmojis(text) {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

products.forEach(product => {
  product.description = removeEmojis(product.description);
});

const updatedContent = `export const products = ${JSON.stringify(products, null, 2)};`;
fs.writeFileSync(productsPath, updatedContent, 'utf8');

console.log(`✅ تم إزالة الإيموجي من ${products.length} منتج`);
