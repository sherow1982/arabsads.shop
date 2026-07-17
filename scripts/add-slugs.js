const fs = require('fs');
const path = require('path');

function toSlug(text) {
  return text.trim()
    .replace(/\s+/g, '-')
    .replace(/[،,\.!؟?()\[\]{}\/\\:;"'*&%$#@^+=|<>~`]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.js');
const content = fs.readFileSync(productsPath, 'utf8');
const match = content.match(/export const products = (\[[\s\S]*\]);/);
if (!match) { console.error('Cannot parse products'); process.exit(1); }

const products = JSON.parse(match[1]);
const usedSlugs = {};

const updated = products.map(p => {
  let slug = toSlug(p.title);
  if (usedSlugs[slug]) { usedSlugs[slug]++; slug = `${slug}-${usedSlugs[slug]}`; }
  else usedSlugs[slug] = 1;
  return { ...p, slug };
});

fs.writeFileSync(productsPath,
  `// Auto-generated - ${new Date().toISOString()}\nexport const products = ${JSON.stringify(updated, null, 2)};\n`,
  'utf8'
);
console.log(`Done! ${updated.length} products with slugs`);
updated.slice(0, 3).forEach(p => console.log(`  /product/${p.slug}`));
