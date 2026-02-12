const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح خطأ Static Export...\n');

// قراءة ملف [slug].jsx
const slugPath = path.join(process.cwd(), 'src/pages/seo/[slug].jsx');
let content = fs.readFileSync(slugPath, 'utf8');

// استبدال fallback: 'blocking' بـ fallback: false
content = content.replace(
  "return { paths: [], fallback: 'blocking' };",
  "return { paths: [], fallback: false };"
);

// حفظ الملف
fs.writeFileSync(slugPath, content, 'utf8');

console.log('✅ تم إصلاح ملف [slug].jsx');
console.log('✅ تم تغيير fallback من "blocking" إلى false');
console.log('\n🎉 يمكنك الآن تشغيل: npm run dev');
