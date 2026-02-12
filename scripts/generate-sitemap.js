const fs = require('fs');
const productsData = require('../src/data/products-data.json');

const baseUrl = 'https://omany.storesads.shop';

// فلترة المنتجات العمانية فقط (من 1 إلى 142)
const omanProducts = productsData.filter(p => p.id >= 1 && p.id <= 142);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
  <url><loc>${baseUrl}/shop</loc><priority>0.9</priority></url>
  <url><loc>${baseUrl}/about</loc><priority>0.7</priority></url>
  <url><loc>${baseUrl}/cart</loc><priority>0.6</priority></url>
  <url><loc>${baseUrl}/checkout</loc><priority>0.6</priority></url>
  <url><loc>${baseUrl}/privacy</loc><priority>0.5</priority></url>
  <url><loc>${baseUrl}/terms</loc><priority>0.5</priority></url>
  <url><loc>${baseUrl}/return-policy</loc><priority>0.5</priority></url>
  <url><loc>${baseUrl}/shipping-policy</loc><priority>0.5</priority></url>
${omanProducts.map(p => `  <url><loc>${baseUrl}/product/${p.id}</loc><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>عماني ستور - مخزونك في جيبك</title>
    <link>${baseUrl}</link>
    <description>أفضل متجر إلكتروني في سلطنة عمان - شحن مجاني لجميع الطلبات</description>
${omanProducts.map(p => `    <item>
      <g:id>${p.id}</g:id>
      <g:title>${p.name}</g:title>
      <g:description>${(p.description || p.name).substring(0, 200)}</g:description>
      <g:link>${baseUrl}/product/${p.id}</g:link>
      <g:image_link>${p.mainImage}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${p.price}</g:price>
      <g:sale_price>${p.sale_price}</g:sale_price>
      <g:brand>عماني ستور</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>منتجات عمانية</g:product_type>
    </item>`).join('\n')}
  </channel>
</rss>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
fs.writeFileSync('./public/product-feed.xml', feed);

console.log(`✅ Sitemap: /sitemap.xml (${omanProducts.length} منتج عماني)`);
console.log('✅ Product Feed: /product-feed.xml');
