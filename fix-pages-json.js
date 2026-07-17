const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/mass-seo-data/pages.json');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // عماني ستور
  [/عماني ستور/g, 'إعلانات العرب الكويت'],
  [/عمانى ستور/g, 'إعلانات العرب الكويت'],
  // في عمان
  [/في عُمان/g, 'في الكويت'],
  [/في عمان/g, 'في الكويت'],
  [/بعمان/g, 'بالكويت'],
  // مناطق السلطنة
  [/مناطق السلطنة/g, 'محافظات الكويت'],
  [/السلطنة/g, 'الكويت'],
  // المنتجات العمانية
  [/المنتجات العمانية/g, 'المنتجات الكويتية'],
  [/العمانية الأصيلة/g, 'الكويتية الأصيلة'],
  [/العمانية/g, 'الكويتية'],
  [/العماني/g, 'الكويتي'],
  [/عمانية/g, 'كويتية'],
  [/عماني/g, 'كويتي'],
  // مسقط وصلالة
  [/مسقط/g, 'الكويت العاصمة'],
  [/صلالة/g, 'حولي'],
  [/نزوى/g, 'الفروانية'],
  [/صحار/g, 'الأحمدي'],
  [/السيب/g, 'مبارك الكبير'],
  // ريال عماني
  [/ريال عماني/g, 'دينار كويتي'],
  [/الريال العماني/g, 'الدينار الكويتي'],
  [/ر\.ع/g, 'د.ك'],
  [/"OMR"/g, '"KWD"'],
  [/'OMR'/g, "'KWD'"],
  [/OMR/g, 'KWD'],
  // ar_OM
  [/ar_OM/g, 'ar_KW'],
  // addressCountry OM
  [/"addressCountry":"OM"/g, '"addressCountry":"KW"'],
  [/"addressCountry": "OM"/g, '"addressCountry": "KW"'],
  // بأفضل سعر في عمان
  [/بأفضل سعر في الكويت/g, 'بأفضل سعر في الكويت'], // already fixed - skip
];

let count = 0;
for (const [from, to] of replacements) {
  const before = content;
  content = content.replace(from, to);
  if (content !== before) count++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ تم إصلاح pages.json - ${count} نوع استبدال`);

// تحقق
const data = JSON.parse(content);
const stillOman = data.filter(x => 
  (x.title && x.title.includes('عمان')) ||
  (x.content && x.content.includes('عماني ستور'))
);
console.log(`📊 صفحات لسه فيها مشكلة: ${stillOman.length}`);
if (stillOman.length > 0) {
  console.log('مثال:', stillOman[0].title);
}
