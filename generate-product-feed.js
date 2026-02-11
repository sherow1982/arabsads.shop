const fs = require('fs');
const path = require('path');

// استيراد المنتجات
const { products } = require('./src/data/products.js');

// دالة لتحويل النص إلى XML آمن
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// دالة لتحديد فئة Google المناسبة بناءً على الفئة العربية
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

  // محاولة تحديد فئة أكثر دقة بناءً على العنوان
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
  if (titleLower.includes('مطبخ') || titleLower.includes('kitchen')) {
    return 'Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils';
  }
  if (titleLower.includes('إضاءة') || titleLower.includes('مصباح') || titleLower.includes('light')) {
    return 'Home & Garden > Lighting > Lamps';
  }
  if (titleLower.includes('سيارة') || titleLower.includes('car')) {
    return 'Vehicles & Parts > Vehicle Parts & Accessories';
  }
  if (titleLower.includes('أطفال') || titleLower.includes('طفل')) {
    return 'Baby & Toddler';
  }
  if (titleLower.includes('دراجة')) {
    return 'Sporting Goods > Cycling > Bicycles';
  }
  if (titleLower.includes('خلاط') || titleLower.includes('blender')) {
    return 'Home & Garden > Kitchen & Dining > Kitchen Appliances > Blenders';
  }
  if (titleLower.includes('مروحة') || titleLower.includes('fan')) {
    return 'Home & Garden > Household Appliances > Climate Control Appliances > Fans';
  }
  if (titleLower.includes('دفاية') || titleLower.includes('مدفأة') || titleLower.includes('heater')) {
    return 'Home & Garden > Household Appliances > Climate Control Appliances > Space Heaters';
  }

  return categoryMap[arabicCategory] || 'Home & Garden > Household Supplies';
}

// توليد XML
function generateProductFeed() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>إماراتي ستور - مخزونك في جيبك</title>
    <link>https://emirates.storesads.shop</link>
    <description>أفضل متجر إلكتروني في الإمارات - شحن مجاني لجميع الطلبات</description>
`;

  products.forEach(product => {
    const googleCategory = getGoogleCategory(product.category, product.title);
    const description = escapeXml(product.description.replace(/\n/g, ' ').substring(0, 5000));
    
    xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${description}</g:description>
      <g:link>https://emirates.storesads.shop/product/${product.id}</g:link>
      <g:image_link>${escapeXml(product.image)}</g:image_link>
      <g:availability>${product.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${product.price} AED</g:price>
      <g:sale_price>${product.salePrice} AED</g:sale_price>
      <g:brand>إماراتي ستور</g:brand>
      <g:condition>${product.condition}</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(product.category)}</g:product_type>
      <g:gtin>PROD${String(product.id).padStart(6, '0')}</g:gtin>
      <g:mpn>SKU-${product.sku}</g:mpn>
    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}

// كتابة الملف
try {
  const feedXml = generateProductFeed();
  const outputPath = path.join(__dirname, 'public', 'product-feed.xml');
  
  fs.writeFileSync(outputPath, feedXml, { encoding: 'utf8', flag: 'w' });
  console.log(`✅ تم إنشاء ملف الفييد بنجاح!`);
  console.log(`📁 الموقع: ${outputPath}`);
  console.log(`📊 عدد المنتجات: ${products.length}`);
} catch (error) {
  console.error('❌ خطأ في إنشاء ملف الفييد:', error);
  process.exit(1);
}
