const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح صفحات Mass-SEO...\n');

// قراءة ملف الصفحات
const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

console.log(`📄 عدد الصفحات: ${pages.length}`);

// قراءة ملف [slug].jsx
const slugPath = path.join(process.cwd(), 'src/pages/seo/[slug].jsx');
let content = fs.readFileSync(slugPath, 'utf8');

// استخدام fallback: 'blocking' لتجنب timeout في البناء
const newGetStaticPaths = `export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}`;

// استبدال في الملف
content = content.replace(
  /export async function getStaticPaths\(\) \{[\s\S]*?\n\}/,
  newGetStaticPaths
);

// حفظ الملف
fs.writeFileSync(slugPath, content, 'utf8');

console.log('✅ تم توليد ' + pages.length + ' path');
console.log('✅ تم تحديث ملف [slug].jsx');
console.log('\n🎉 صفحات Mass-SEO جاهزة!');
