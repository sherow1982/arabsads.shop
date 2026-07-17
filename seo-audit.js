const fs = require('fs');
const results = [];
let issues = 0;

function ok(msg)  { results.push('  ✅ ' + msg); }
function bad(msg) { results.push('  ❌ ' + msg); issues++; }
function info(msg){ results.push('  📊 ' + msg); }
function title(t) { results.push('\n' + t); results.push('─'.repeat(50)); }

// ─── 1. sitemap.xml ───
title('=== sitemap.xml ===');
const sm = fs.readFileSync('public/sitemap.xml','utf8');
const smUrls = (sm.match(/<loc>/g)||[]).length;
const smBad  = (sm.match(/\/product\/\d+</g)||[]).length;
const smUndef= (sm.match(/undefined/g)||[]).length;
const smImg  = (sm.match(/<image:loc>/g)||[]).length;
info('URLs: ' + smUrls + ' (1901 products + 8 static)');
smBad   ? bad('Numeric slugs: ' + smBad)   : ok('No numeric slugs');
smUndef ? bad('undefined found: ' + smUndef): ok('No undefined values');
smImg > 0 ? ok('Image tags: ' + smImg)     : bad('No image tags');
const smSample = sm.split('\n').find(l=>l.includes('<loc>'));
info('Sample: ' + (smSample||'').trim());

// ─── 2. mass-seo-sitemap.xml ───
title('=== mass-seo-sitemap.xml ===');
const ms = fs.readFileSync('public/mass-seo-sitemap.xml','utf8');
const msUrls   = (ms.match(/<loc>/g)||[]).length;
const msBad    = (ms.match(/\/seo\/(buy|price|kuwait|hawalli|offer)-\d+</g)||[]).length;
const msArabic = (ms.match(/\/seo\/(buy|price|kuwait|hawalli|offer)-[\u0600-\u06ff]/g)||[]).length;
const msMuscat = (ms.match(/muscat|salalah/g)||[]).length;
info('URLs: ' + msUrls + ' (expected 9505)');
msUrls === 9505 ? ok('Count correct: 9505') : bad('Count wrong: ' + msUrls + ' (expected 9505)');
msBad     ? bad('Numeric slugs: ' + msBad)    : ok('No numeric slugs');
msArabic > 0 ? ok('Arabic slugs: ' + msArabic): bad('No Arabic slugs found');
msMuscat  ? bad('Oman cities found: ' + msMuscat): ok('No Oman cities (muscat/salalah)');
const msSample = ms.split('\n').find(l=>l.includes('<loc>'));
info('Sample: ' + (msSample||'').trim());

// ─── 3. pages-sitemap.xml ───
title('=== pages-sitemap.xml ===');
const ps = fs.readFileSync('public/pages-sitemap.xml','utf8');
const psUrls = (ps.match(/<loc>/g)||[]).length;
const psBad  = (ps.match(/\/product\/\d+</g)||[]).length;
const psUndef= (ps.match(/undefined/g)||[]).length;
const psImg  = (ps.match(/<image:loc>/g)||[]).length;
info('URLs: ' + psUrls);
psBad   ? bad('Numeric slugs: ' + psBad)   : ok('No numeric slugs');
psUndef ? bad('undefined found: ' + psUndef): ok('No undefined values');
psImg > 0 ? ok('Image tags: ' + psImg)     : bad('No image tags');
const psSample = ps.split('\n').find(l=>l.includes('<loc>'));
info('Sample: ' + (psSample||'').trim());

// ─── 4. product-feed.xml ───
title('=== product-feed.xml ===');
const pf = fs.readFileSync('public/product-feed.xml','utf8');
const pfItems= (pf.match(/<item>/g)||[]).length;
const pfBad  = (pf.match(/\/product\/\d+</g)||[]).length;
const pfUndef= (pf.match(/undefined/g)||[]).length;
const pfKWD  = pf.includes('KWD');
const pfKW   = pf.includes('>KW<');
info('Items: ' + pfItems + ' (expected 1901)');
pfItems === 1901 ? ok('Count correct: 1901') : bad('Count wrong: ' + pfItems);
pfBad   ? bad('Numeric slugs: ' + pfBad)   : ok('No numeric slugs');
pfUndef ? bad('undefined found: ' + pfUndef): ok('No undefined values');
pfKWD   ? ok('Currency KWD: yes')          : bad('Currency KWD: missing');
pfKW    ? ok('Country KW: yes')            : bad('Country KW: missing');

// ─── 5. robots.txt ───
title('=== robots.txt ===');
const rb = fs.readFileSync('public/robots.txt','utf8');
rb.includes('sitemap.xml')          ? ok('sitemap.xml listed')          : bad('sitemap.xml MISSING');
rb.includes('mass-seo-sitemap.xml') ? ok('mass-seo-sitemap.xml listed') : bad('mass-seo-sitemap.xml MISSING');
rb.includes('pages-sitemap.xml')    ? ok('pages-sitemap.xml listed')    : bad('pages-sitemap.xml MISSING');
rb.includes('product-feed.xml')     ? ok('product-feed.xml listed')     : bad('product-feed.xml MISSING');
rb.includes('Disallow: /api/')      ? ok('API disallowed')              : bad('/api/ not disallowed');

// ─── 6. pages.json ───
title('=== public/mass-seo-data/pages.json ===');
const pg = JSON.parse(fs.readFileSync('public/mass-seo-data/pages.json','utf8'));
const pgBad = pg.filter(x => /^(buy|price|kuwait|hawalli|offer)-\d+$/.test(x.slug)).length;
const pgHasTitle = pg.every(x => x.title && x.title.length > 5);
const pgHasDesc  = pg.every(x => x.description && x.description.length > 10);
info('Count: ' + pg.length + ' (expected 9505)');
pg.length === 9505 ? ok('Count correct: 9505') : bad('Count wrong: ' + pg.length);
pgBad ? bad('Numeric slugs: ' + pgBad) : ok('No numeric slugs');
pgHasTitle ? ok('All pages have title') : bad('Some pages missing title');
pgHasDesc  ? ok('All pages have description') : bad('Some pages missing description');
info('Sample slug: ' + pg[0].slug);
info('Sample title: ' + pg[0].title);

// ─── 7. seo/[slug].jsx ───
title('=== src/pages/seo/[slug].jsx ===');
const sl = fs.readFileSync('src/pages/seo/[slug].jsx','utf8');
const slTotal  = (sl.match(/params: \{ slug:/g)||[]).length;
const slBad    = (sl.match(/slug: '(buy|price|kuwait|hawalli|offer)-\d+'/g)||[]).length;
const slMuscat = (sl.match(/muscat|salalah/g)||[]).length;
info('Total paths: ' + slTotal + ' (expected 9505)');
slTotal === 9505 ? ok('Paths count correct: 9505') : bad('Paths count wrong: ' + slTotal);
slBad    ? bad('Numeric paths: ' + slBad)    : ok('No numeric paths');
slMuscat ? bad('Oman cities: ' + slMuscat)   : ok('No Oman cities');
sl.includes('getStaticPaths')  ? ok('getStaticPaths: yes')  : bad('getStaticPaths: MISSING');
sl.includes('getStaticProps')  ? ok('getStaticProps: yes')  : bad('getStaticProps: MISSING');
sl.includes('products.js')     ? ok('reads products.js: yes'): bad('reads products.js: MISSING');
sl.includes('fallback: false') ? ok('fallback: false')      : bad('fallback not set to false');
sl.includes('canonical')       ? ok('canonical tag: yes')   : bad('canonical tag: MISSING');
sl.includes('schema.org')      ? ok('schema.org: yes')      : bad('schema.org: MISSING');
sl.includes('KWD')             ? ok('currency KWD: yes')    : bad('currency KWD: MISSING');

// ─── 8. product/[slug].jsx ───
title('=== src/pages/product/[slug].jsx ===');
const pr = fs.readFileSync('src/pages/product/[slug].jsx','utf8');
pr.includes('getStaticPaths') ? ok('getStaticPaths: yes') : bad('getStaticPaths: MISSING');
pr.includes('getStaticProps') ? ok('getStaticProps: yes') : bad('getStaticProps: MISSING');
pr.includes('canonical')      ? ok('canonical tag: yes')  : bad('canonical tag: MISSING');
pr.includes('schema.org')     ? ok('schema.org: yes')     : bad('schema.org: MISSING');
pr.includes('KWD')            ? ok('currency KWD: yes')   : bad('currency KWD: MISSING');
pr.includes('BreadcrumbList') ? ok('Breadcrumb schema: yes'): bad('Breadcrumb schema: MISSING');
pr.includes('AggregateRating')? ok('AggregateRating: yes') : bad('AggregateRating: MISSING');

// ─── 9. _document.jsx ───
title('=== src/pages/_document.jsx ===');
const doc = fs.readFileSync('src/pages/_document.jsx','utf8');
doc.includes('lang="ar"')          ? ok('lang=ar: yes')    : bad('lang=ar: MISSING');
doc.includes('dir="rtl"')          ? ok('dir=rtl: yes')    : bad('dir=rtl: MISSING');
doc.includes('googletagmanager')   ? ok('GA/GTM: yes')     : bad('GA/GTM: MISSING');
doc.includes('GTM-')               ? ok('GTM ID: yes')     : bad('GTM ID: MISSING');
doc.includes('og:image')           ? ok('OG image: yes')   : bad('OG image: MISSING');
doc.includes('ar_KW')              ? ok('locale ar_KW: yes'): bad('locale ar_KW: MISSING');

// ─── 10. index.jsx ───
title('=== src/pages/index.jsx ===');
const idx = fs.readFileSync('src/pages/index.jsx','utf8');
idx.includes('<SEO')       ? ok('SEO component: yes') : bad('SEO component: MISSING');
idx.includes('الكويت')     ? ok('Kuwait mention: yes'): bad('Kuwait mention: MISSING');
idx.includes('schema')     ? ok('schema: yes')        : info('schema: not found (optional)');
idx.includes('canonical')  ? ok('canonical: yes')     : info('canonical: not in index (check SEO component)');

// ─── SUMMARY ───
results.push('\n' + '═'.repeat(50));
results.push('SUMMARY');
results.push('═'.repeat(50));
results.push('Total Issues: ' + issues);
issues === 0
  ? results.push('🎉 All SEO checks passed!')
  : results.push('⚠️  Fix the ' + issues + ' issues above');

console.log(results.join('\n'));
