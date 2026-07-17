const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://arabsads.shop';
const PRODUCT_COUNT = 142;

// تحديث sitemap.xml
function updateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${DOMAIN}</loc><priority>1.0</priority></url>
  <url><loc>${DOMAIN}/shop</loc><priority>0.9</priority></url>
  <url><loc>${DOMAIN}/about</loc><priority>0.7</priority></url>
  <url><loc>${DOMAIN}/cart</loc><priority>0.6</priority></url>
  <url><loc>${DOMAIN}/checkout</loc><priority>0.6</priority></url>
  <url><loc>${DOMAIN}/privacy</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/terms</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/return-policy</loc><priority>0.5</priority></url>
  <url><loc>${DOMAIN}/shipping-policy</loc><priority>0.5</priority></url>\n`;

  for (let i = 1; i <= PRODUCT_COUNT; i++) {
    sitemap += `  <url><loc>${DOMAIN}/product/${i}</loc><priority>0.8</priority></url>\n`;
  }

  sitemap += `</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, 'utf8');
  console.log('✅ تم تحديث sitemap.xml');
}

// تحديث mass-seo-sitemap.xml
function updateMassSeoSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const keywords = ['buy', 'price', 'muscat', 'salalah', 'offer'];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (let i = 1; i <= PRODUCT_COUNT; i++) {
    keywords.forEach(keyword => {
      sitemap += `  <url>
    <loc>${DOMAIN}/seo/${keyword}-${i}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });
  }

  sitemap += `</urlset>`;
  
  fs.writeFileSync(path.join(__dirname, '../public/mass-seo-sitemap.xml'), sitemap, 'utf8');
  console.log('✅ تم تحديث mass-seo-sitemap.xml');
}

// تحديث mass-seo pages.json
function updateMassSeoPages() {
  const productsPath = path.join(__dirname, '../src/data/products-data.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  
  const keywords = [
    { key: 'buy', ar: 'شراء', en: 'Buy' },
    { key: 'price', ar: 'سعر', en: 'Price' },
    { key: 'muscat', ar: 'الكويت العاصمة', en: 'Muscat' },
    { key: 'salalah', ar: 'حولي', en: 'Salalah' },
    { key: 'offer', ar: 'عرض', en: 'Offer' }
  ];

  const pages = [];

  products.forEach(product => {
    keywords.forEach(kw => {
      const slug = `${kw.key}-${product.id}`;
      pages.push({
        slug,
        productId: product.id,
        keyword: kw.key,
        title: `${kw.ar} ${product.name} في الكويت | إعلانات العرب الكويت`,
        description: `${kw.ar} ${product.name} بأفضل سعر في الكويت. ${product.description.substring(0, 100)}... شحن مجاني لجميع مناطق الكويت.`,
        h1: `${kw.ar} ${product.name}`,
        content: `اكتشف ${product.name} في إعلانات العرب الكويت - متجرك الموثوق للمنتجات اللكويتية الأصيلة. ${product.description} نوفر شحن مجاني لجميع مناطق الكويت مع ضمان الجودة.`
      });
    });
  });

  fs.writeFileSync(
    path.join(__dirname, '../public/mass-seo-data/pages.json'),
    JSON.stringify(pages, null, 2),
    'utf8'
  );
  console.log(`✅ تم تحديث ${pages.length} صفحة SEO`);
}

// تحديث products-seo.json
function updateProductsSeo() {
  const productsPath = path.join(__dirname, '../src/data/products-data.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  
  const seoData = products.map(product => ({
    id: product.id,
    title: `${product.name} | إعلانات العرب الكويت`,
    description: `${product.description.substring(0, 150)}... اطلب الآن من إعلانات العرب الكويت مع شحن مجاني لجميع مناطق الكويت.`,
    keywords: `${product.name}, منتجات الكويتية, ${product.category}, إعلانات العرب الكويت, الكويت العاصمة, حولي`,
    ogTitle: `${product.name} - إعلانات العرب الكويت`,
    ogDescription: `${product.description.substring(0, 100)}...`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "brand": "إعلانات العرب الكويت",
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "KWD",
        "availability": "https://schema.org/InStock"
      }
    }
  }));

  fs.writeFileSync(
    path.join(__dirname, '../public/seo-data/products-seo.json'),
    JSON.stringify(seoData, null, 2),
    'utf8'
  );
  console.log(`✅ تم تحديث SEO لـ ${seoData.length} منتج`);
}

// تشغيل جميع التحديثات
console.log('🚀 بدء تحديث ملفات SEO...\n');
updateSitemap();
updateMassSeoSitemap();
updateMassSeoPages();
updateProductsSeo();
console.log('\n✨ تم الانتهاء من جميع التحديثات بنجاح!');
