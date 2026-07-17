const fs = require('fs');
const path = require('path');

// قراءة بيانات المنتجات
const productsData = require('../src/data/products-data.json');

// فلترة المنتجات - استبعاد فئة الساعات
const filteredProducts = productsData.filter(product => {
  const category = product.category || '';
  return !category.includes('ساعات') && !category.includes('إكسسوارات');
});

// إنشاء XML للفييد
function generateProductFeed() {
  const baseUrl = 'https://arabsads.shop';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>إعلانات العرب الكويت - منتجات</title>
    <link>${baseUrl}</link>
    <description>أفضل متجر إلكتروني في دولة الكويت</description>`;

  filteredProducts.forEach(product => {
    const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
    const salePrice = parseFloat(product.sale_price.replace(/[^\d.]/g, ''));
    const finalPrice = salePrice || price;
    
    // تحديد الفئة المناسبة لجوجل
    const googleCategory = getGoogleCategory(product.category);
    
    xml += `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${cleanDescription(product.description || product.name)}]]></g:description>
      <g:link>${baseUrl}/product/${product.id}</g:link>
      <g:image_link>${product.mainImage}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${finalPrice} KWD</g:price>
      <g:brand>إعلانات العرب الكويت</g:brand>
      <g:product_type>${product.category || 'منتجات متنوعة'}</g:product_type>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:shipping>
        <g:country>OM</g:country>
        <g:service>Standard</g:service>
        <g:price>0 KWD</g:price>
      </g:shipping>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
  });

  xml += `
  </channel>
</rss>`;

  return xml;
}

// تنظيف الوصف
function cleanDescription(description) {
  return description
    .replace(/<[^>]*>/g, '') // إزالة HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .substring(0, 5000); // حد أقصى 5000 حرف
}

// تحديد فئة جوجل المناسبة
function getGoogleCategory(category) {
  const categoryMap = {
    'أدوات البناء': 'Hardware > Building Materials',
    'أدوات تصفيف الشعر': 'Health & Beauty > Personal Care > Hair Care',
    'أجهزة التدليك': 'Health & Beauty > Personal Care > Massage & Relaxation',
    'أجهزة منزلية': 'Home & Garden > Kitchen & Dining > Kitchen Appliances',
    'أدوات مطبخ': 'Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils',
    'أدوات غسيل': 'Home & Garden > Household Supplies > Laundry Supplies',
    'أدوات حمام': 'Home & Garden > Bathroom Accessories',
    'إلكترونيات': 'Electronics',
    'إلكترونيات السيارات': 'Vehicles & Parts > Vehicle Parts & Accessories',
    'إلكترونيات ذكية': 'Electronics > Smart Home',
    'إزالة الشعر': 'Health & Beauty > Personal Care > Shaving & Hair Removal',
    'ألعاب الأطفال': 'Toys & Games',
    'العناية بالبشرة': 'Health & Beauty > Personal Care > Skin Care',
    'علاجات الشعر': 'Health & Beauty > Personal Care > Hair Care',
    'مستحضرات التجميل': 'Health & Beauty > Personal Care > Cosmetics',
    'مستحضرات الجسم': 'Health & Beauty > Personal Care > Bath & Body',
    'مستلزمات الأطفال': 'Baby & Toddler > Baby Care',
    'مستلزمات التنظيف': 'Home & Garden > Household Supplies > Cleaning Supplies',
    'مستلزمات منزلية': 'Home & Garden > Household Supplies',
    'شواحن ومحولات': 'Electronics > Electronics Accessories > Cables & Adapters'
  };
  
  return categoryMap[category] || 'Home & Garden';
}

// تشغيل السكريبت
try {
  console.log('🔧 بدء إصلاح ملف الفييد...');
  
  const feedXml = generateProductFeed();
  const outputPath = path.join(__dirname, '../public/product-feed.xml');
  
  fs.writeFileSync(outputPath, feedXml, 'utf8');
  
  console.log(`✅ تم إنشاء ملف الفييد بنجاح!`);
  console.log(`📊 عدد المنتجات: ${filteredProducts.length}`);
  console.log(`📁 المسار: ${outputPath}`);
  console.log(`🚫 تم استبعاد فئة الساعات والإكسسوارات`);
  console.log(`🌐 الرابط: https://arabsads.shop/product-feed.xml`);
  
} catch (error) {
  console.error('❌ خطأ في إنشاء ملف الفييد:', error);
  process.exit(1);
}