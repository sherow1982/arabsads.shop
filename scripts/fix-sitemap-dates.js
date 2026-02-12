const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح تواريخ خرائط الموقع...\n');

const correctDate = '2024-12-15';

// إصلاح sitemap.xml
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/2026-02-11/g, correctDate);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml - تم تصحيح التواريخ');

console.log('\n✨ تم إصلاح جميع التواريخ بنجاح!');
