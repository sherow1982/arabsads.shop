const fs = require('fs');
const path = require('path');

const CSV_DIR = 'C:\\Users\\sherow\\Desktop\\منتجات ايكوميرج الكويت\\شغل خلصان\\تم';

// اسم الفئة من اسم الملف
function getCategoryName(filename) {
  return filename
    .replace('_wuilt.csv', '')
    .replace('_الكويت', '')
    .replace('الكويت', '')
    .trim();
}

// تحليل CSV مع دعم الحقول التي تحتوي على فواصل داخل quotes
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  
  const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || '').replace(/^"|"$/g, '').trim();
    });
    rows.push(row);
  }
  return rows;
}

let allProducts = [];
let globalId = 1;

const csvFiles = fs.readdirSync(CSV_DIR).filter(f => f.endsWith('_wuilt.csv'));

for (const file of csvFiles) {
  const category = getCategoryName(file);
  const content = fs.readFileSync(path.join(CSV_DIR, file), 'utf8');
  const rows = parseCSV(content);
  
  console.log(`${file}: ${rows.length} products -> category: ${category}`);
  
  for (const row of rows) {
    const title = row['Title'] || '';
    if (!title) continue;
    
    const regularPrice = parseFloat(row['Regular Price']) || 0;
    const salePrice = parseFloat(row['Sale Price']) || regularPrice;
    const description = row['Description'] || '';
    const sku = row['SKU'] || row['Handle'] || String(globalId);
    const status = row['Status'] || 'ACTIVE';
    
    if (status !== 'ACTIVE' && status !== 'Available') {
      // تخطي المنتجات غير النشطة
    }
    
    // الصور - مفصولة بمسافة
    const imagesRaw = row['Images'] || row['Variant Image'] || '';
    const images = imagesRaw.split(' ').map(u => u.trim()).filter(u => u.startsWith('http'));
    const mainImage = images[0] || '';
    const additionalImages = images.slice(1, 5);
    
    if (!mainImage) continue;
    
    allProducts.push({
      id: globalId++,
      title,
      description,
      category,
      price: regularPrice,
      salePrice,
      image: mainImage,
      additionalImage: additionalImages[0] || mainImage,
      images: images.slice(0, 5),
      sku: String(sku),
      inStock: true,
      specs: {
        description,
        features: []
      }
    });
  }
}

console.log(`\nTotal products: ${allProducts.length}`);

// كتابة ملف products.js
const output = `// Auto-generated from CSV files - ${new Date().toISOString()}
export const products = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'products.js'),
  output,
  'utf8'
);

// كتابة ملف products-data.json أيضاً
fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'products-data.json'),
  JSON.stringify(allProducts, null, 2),
  'utf8'
);

console.log('Done! products.js and products-data.json updated.');

// طباعة الفئات
const categories = [...new Set(allProducts.map(p => p.category))];
console.log('\nCategories:', categories);
