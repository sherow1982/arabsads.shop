const fs = require('fs');
const path = require('path');

const feedPath = path.join(__dirname, '../public/product-feed.xml');

// قراءة الملف
let content = fs.readFileSync(feedPath, 'utf-8');

// إصلاح جميع الرموز الخاصة في XML
content = content
  // إصلاح & غير المشفرة (ما عدا الموجودة في entities صحيحة)
  .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;')
  // إصلاح < و >
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  // استرجاع tags الصحيحة
  .replace(/&lt;(\/?[a-z:]+[^&]*?)&gt;/gi, '<$1>')
  // تنظيف المسافات الزائدة
  .replace(/\s+/g, ' ')
  .replace(/> </g, '>\n<');

// حفظ الملف المُصلح
fs.writeFileSync(feedPath, content, 'utf-8');

console.log('✅ تم إصلاح ملف product-feed.xml بنجاح!');
