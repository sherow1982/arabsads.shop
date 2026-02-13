const fs = require('fs');
const path = require('path');

const productsData = require('./src/data/products-data.json');
const products = productsData || [];

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
    <title>عماني ستور - مخزونك في جيبك</title>
    <link>https://omany.storesads.shop</link>
    <description>أفضل متجر إلكتروني في سلطنة عمان - شحن مجاني لجميع الطلبات</description>
`;

  products.filter(p => p.category !== 'ساعات وإكسسوارات').forEach(product => {
    const googleCategory = getGoogleCategory(product.category, product.name);
    // تنظيف الوصف من الأحرف الخاصة والمسافات الزائدة
    const cleanDesc = (product.description || '')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 5000);
    const description = escapeXml(cleanDesc);
    
    xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${description}</g:description>
      <g:link>https://omany.storesads.shop/product/${product.id}</g:link>
      <g:image_link>${escapeXml(product.image)}</g:image_link>`;
    
    if (product.additionalImage) {
      xml += `
      <g:additional_image_link>${escapeXml(product.additionalImage)}</g:additional_image_link>`;
    }
    
    xml += `
      <g:availability>${product.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${product.price} OMR</g:price>
      <g:brand>عماني ستور</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}</g:product_type>
      <g:gtin>PROD${String(product.id).padStart(6, '0')}</g:gtin>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:shipping>
        <g:country>OM</g:country>
        <g:service>Standard</g:service>
        <g:price>0 OMR</g:price>
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
