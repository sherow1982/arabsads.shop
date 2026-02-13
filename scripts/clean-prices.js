const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

products.forEach(product => {
  delete product.originalPrice;
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
console.log('✅ تم حذف originalPrice من جميع المنتجات');
