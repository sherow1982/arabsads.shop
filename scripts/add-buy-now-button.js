const fs = require('fs');
const path = require('path');

const seoPagePath = path.join(__dirname, '../src/pages/seo/[slug].jsx');
let content = fs.readFileSync(seoPagePath, 'utf8');

// إضافة زر اشتري الآن الثابت
const buyNowButton = `
        {/* زر اشتري الآن الثابت */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-primary">{product.price} ر.ع</span>
            </div>
            <button 
              onClick={() => {
                handleAddToCart();
                router.push('/checkout');
              }}
              className="flex-1 max-w-md bg-green-600 text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-green-700 transition shadow-lg"
            >
              🛒 اشتري الآن
            </button>
          </div>
        </div>`;

// إضافة mb-24 للمحتوى الأخير
if (!content.includes('زر اشتري الآن الثابت')) {
  content = content.replace(
    '<div className="mt-12 bg-white rounded-2xl shadow-card p-4 md:p-8 overflow-hidden">',
    buyNowButton + '\n\n        <div className="mt-12 mb-24 bg-white rounded-2xl shadow-card p-4 md:p-8 overflow-hidden">'
  );
  
  fs.writeFileSync(seoPagePath, content);
  console.log('✅ تم إضافة زر اشتري الآن لصفحات Mass-SEO');
} else {
  console.log('✅ زر اشتري الآن موجود بالفعل');
}
