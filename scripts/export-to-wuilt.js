const fs = require('fs');
const path = require('path');

const data = require('../src/data/products-data.json');
const filtered = data; // جميع المنتجات بما فيها الساعات

const rows = [
  'Handle,Title,Description,SEO Title,SEO Description,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,SKU,Quantity,Regular Price,Sale Price,Cost,Images,Variant Image,Status,URL,Created,Updated,Collections,Length,Width,Height,Weight'
];

filtered.forEach(p => {
  const handle = `product-${p.id}`;
  const title = p.name.replace(/"/g, '""');
  const desc = (p.description || '').replace(/"/g, '""').substring(0, 500);
  const price = parseFloat(String(p.price).split(/\s/)[0]);
  const salePrice = p.sale_price ? parseFloat(String(p.sale_price).split(/\s/)[0]) : '';
  
  const images = [p.mainImage];
  if (p.gallery && p.gallery.length > 0) {
    images.push(...p.gallery.slice(0, 9));
  }
  const imagesStr = images.filter(Boolean).join(' ');
  
  const row = [
    handle,
    `"${title}"`,
    `"${desc}"`,
    `"${title}"`,
    `"${desc}"`,
    '', '', '', '', '', '',
    p.id,
    '100',
    price,
    salePrice,
    '',
    imagesStr,
    p.mainImage || '',
    'ACTIVE',
    `https://omany.storesads.shop/product/${p.id}`,
    '',
    '',
    `"${p.category}"`,
    '', '', '', ''
  ].join(',');
  
  rows.push(row);
});

const csv = rows.join('\r\n');
fs.writeFileSync('C:\\Users\\sherow\\Desktop\\wuilt-bulk-upload.csv', csv, 'utf-8');

console.log(`✅ تم تصدير ${filtered.length} منتج إلى wuilt-bulk-upload.csv`);
