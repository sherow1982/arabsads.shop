const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح مشكلة require في [slug].jsx...\n');

const slugPath = path.join(process.cwd(), 'src/pages/seo/[slug].jsx');
let content = fs.readFileSync(slugPath, 'utf8');

// استبدال require بـ fs.readFileSync
const newGetStaticProps = `export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  const page = pages.find(p => p.slug === params.slug);
  if (!page) return { notFound: true };
  
  const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const product = productsData.find(p => p.id === page.productId);
  if (!product) return { notFound: true };
  
  return { props: { page, product } };
}`;

// استبدال في الملف
content = content.replace(
  /export async function getStaticProps\(\{ params \}\) \{[\s\S]*?\n\}/,
  newGetStaticProps
);

fs.writeFileSync(slugPath, content, 'utf8');

console.log('✅ تم إصلاح getStaticProps');
console.log('✅ استبدال require بـ fs.readFileSync');
console.log('\n🎉 المشكلة محلولة!');
