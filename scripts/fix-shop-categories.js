const fs = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const shopPath = path.join(process.cwd(), 'src/pages/shop.jsx');

// قراءة المنتجات
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// استخراج الفئات الفعلية
const categories = {};
products.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});

// ترتيب حسب العدد
const sortedCategories = Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8); // أول 8 فئات

console.log('📊 الفئات الأكثر شيوعاً:');
sortedCategories.forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count} منتج`);
});

// توليد كود الفئات
const categoryButtons = sortedCategories.map(([cat]) => {
  const icon = getIcon(cat);
  return `            <button onClick={() => handleCategoryClick('${cat}')} className={\`group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 text-center \${selectedCategory === '${cat}' ? 'ring-2 ring-primary' : ''}\`}>
              <div className="bg-primary bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-opacity-20 transition">
                ${icon}
              </div>
              <h4 className="font-bold text-dark text-sm">${cat}</h4>
            </button>`;
}).join('\n');

// قراءة shop.jsx
let shopContent = fs.readFileSync(shopPath, 'utf8');

// استبدال قسم الفئات
const categorySection = shopContent.match(/<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">[\s\S]*?<\/div>\n          {selectedCategory/);

if (categorySection) {
  const newSection = `<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
${categoryButtons}
          </div>
          {selectedCategory`;
  
  shopContent = shopContent.replace(categorySection[0], newSection);
  fs.writeFileSync(shopPath, shopContent, 'utf8');
  console.log('\n✅ تم تحديث shop.jsx بالفئات الفعلية');
} else {
  console.log('\n❌ لم يتم العثور على قسم الفئات');
}

function getIcon(category) {
  const icons = {
    'ساعات وإكسسوارات': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    'أدوات تصفيف الشعر': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>',
    'أجهزة مطبخ': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
    'العناية بالبشرة': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>',
    'أدوات مطبخ': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    'أجهزة منزلية': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
    'أجهزة التدليك': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    'إلكترونيات ذكية': '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>',
  };
  
  return icons[category] || '<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>';
}
