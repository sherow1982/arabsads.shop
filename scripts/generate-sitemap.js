const fs = require('fs');
const { products } = require('../src/data/products.js');

const baseUrl = 'https://emirates.storesads.shop';

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
${products.map(p => `  <url><loc>${baseUrl}/product/${p.id}</loc><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>إماراتي ستور - مخزونك في جيبك</title>
    <link>${baseUrl}</link>
    <description>أفضل متجر إلكتروني في الإمارات - شحن مجاني لجميع الطلبات</description>
${products.map(p => `    <item>
      <g:id>${p.id}</g:id>
      <g:title>${p.title}</g:title>
      <g:description>${(p.description || p.title).substring(0, 200)}</g:description>
      <g:link>${baseUrl}/product/${p.id}</g:link>
      <g:image_link>${p.image}</g:image_link>
      <g:availability>${p.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${p.price} AED</g:price>
      <g:sale_price>${p.salePrice} AED</g:sale_price>
      <g:brand>إماراتي ستور</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>${p.category}</g:product_type>
    </item>`).join('\n')}
  </channel>
</rss>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
fs.writeFileSync('./public/product-feed.xml', feed);

console.log('✅ Sitemap: /sitemap.xml');
console.log('✅ Product Feed: /product-feed.xml');
