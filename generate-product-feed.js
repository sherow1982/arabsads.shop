const fs = require('fs');
const path = require('path');

const vm = require('vm');
const productsPath = require('path').join(__dirname, 'src/data/products.js');
let _content = require('fs').readFileSync(productsPath, 'utf8').replace('export const products =', 'module.exports.products =');
const _mod = { exports: {} };
vm.runInNewContext(_content, { module: _mod, exports: _mod.exports });
const products = _mod.exports.products || [];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // إزالة الأحرف غير الصالحة
}

function getGoogleCategory(arabicCategory, productTitle) {
  const categoryMap = {
    'ساعات': 'Apparel & Accessories > Jewelry > Watches',
    'حقائب': 'Apparel & Accessories > Handbags, Wallets & Cases > Handbags',
    'عطور': 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne',
    'أدوات مطبخ': 'Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils',
    'إضاءة': 'Home & Garden > Lighting > Lamps',
    'صحة وعناية': 'Health & Beauty > Personal Care',
    'إكسسوارات سيارات': 'Vehicles & Parts > Vehicle Parts & Accessories',
    'أطفال': 'Baby & Toddler > Baby Transport > Baby Strollers',
    'رحلات وتخييم': 'Sporting Goods > Outdoor Recreation > Camping & Hiking',
    'منتجات متنوعة': 'Home & Garden > Household Supplies'
  };

  const titleLower = productTitle.toLowerCase();
  
  if (titleLower.includes('ساعة') || titleLower.includes('watch')) {
    return 'Apparel & Accessories > Jewelry > Watches';
  }
  if (titleLower.includes('حقيبة') || titleLower.includes('bag')) {
    return 'Apparel & Accessories > Handbags, Wallets & Cases > Handbags';
  }
  if (titleLower.includes('عطر') || titleLower.includes('perfume')) {
    return 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne';
  }

  return categoryMap[arabicCategory] || 'Home & Garden > Household Supplies';
}

function generateProductFeed() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>إعلانات العرب الكويت</title>
    <link>https://arabsads.shop</link>
    <description>أفضل متجر إلكتروني في الكويت - شحن مجاني لجميع الطلبات</description>
`;

  products.filter(p => p.category !== 'ساعات وإكسسوارات').forEach(product => {
    const googleCategory = getGoogleCategory(product.category, product.title);
    const cleanDesc = (product.description || '')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 5000);
    const description = escapeXml(cleanDesc);
    
    const price = parseFloat(product.price) || 0;
    const salePrice = parseFloat(product.salePrice) || 0;
    
    xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${description}</g:description>
      <g:link>https://arabsads.shop/product/${escapeXml(product.slug)}</g:link>
      <g:image_link>${escapeXml(product.image)}</g:image_link>`;
    
    // إضافة صور الجاليري
    if (product.images && Array.isArray(product.images) && product.images.length > 1) {
      product.images.slice(1, 10).forEach(img => {
        if (img) xml += `
      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`;
      });
    }
    
    xml += `
      <g:availability>in stock</g:availability>`;
    
    if (salePrice && salePrice < price) {
      xml += `
      <g:price>${price.toFixed(3)} KWD</g:price>
      <g:sale_price>${salePrice.toFixed(3)} KWD</g:sale_price>`;
    } else {
      xml += `
      <g:price>${(salePrice || price).toFixed(3)} KWD</g:price>`;
    }
    
    xml += `
      <g:brand>إعلانات العرب الكويت</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>KW</g:country>
        <g:service>Standard</g:service>
      </g:shipping>
    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}

try {
  if (!products || products.length === 0) {
    console.log('⚠️ لا توجد منتجات، تخطي إنشاء product feed');
    process.exit(0);
  }
  
  const filteredProducts = products.filter(p => p.category !== 'ساعات وإكسسوارات');
  const feedXml = generateProductFeed();
  const outputPath = path.join(__dirname, 'public', 'product-feed.xml');
  
  fs.writeFileSync(outputPath, feedXml, { encoding: 'utf8', flag: 'w' });
  console.log(`✅ تم إنشاء ملف الفييد بنجاح!`);
  console.log(`📊 عدد المنتجات: ${filteredProducts.length}`);
} catch (error) {
  console.error('❌ خطأ في إنشاء ملف الفييد:', error.message);
  process.exit(0);
}
