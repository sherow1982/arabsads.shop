const fs = require('fs');
const file = 'src/pages/seo/[slug].jsx';

// قراءة الملف كـ buffer ثم تحويله
const buf = fs.readFileSync(file);
let c = buf.toString('utf8');

// البحث عن النص بالعربي مباشرة
const oldText1 = '{product.price} \u0631.\u0639';  // ر.ع
const newText1 = '{product.price} \u062f.\u0643';  // د.ك

const count = (c.split(oldText1).length - 1);
c = c.split(oldText1).join(newText1);

fs.writeFileSync(file, c, 'utf8');
console.log('استبدال ر.ع بـ د.ك:', count, 'مرة');

// تحقق
const verify = fs.readFileSync(file, 'utf8');
const lines = verify.split('\n');
lines.forEach((l, i) => {
  if (l.includes('product.price') && (l.includes('\u0631.\u0639') || l.includes('\u062f.\u0643'))) {
    console.log('سطر', i+1, ':', l.trim());
  }
});
