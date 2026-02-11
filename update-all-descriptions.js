const fs = require('fs');
const path = require('path');

// قراءة ملف المنتجات
const productsPath = path.join(__dirname, 'src', 'data', 'products.js');
const productsContent = fs.readFileSync(productsPath, 'utf8');

// استخراج المنتجات من الملف
const productsMatch = productsContent.match(/export const products = (\[[\s\S]*\]);/);
if (!productsMatch) {
  console.error('لم يتم العثور على بيانات المنتجات');
  process.exit(1);
}

const products = JSON.parse(productsMatch[1]);
console.log(`تم العثور على ${products.length} منتج`);

// دالة لتوليد وصف احترافي
function generateRichDescription(product) {
  const title = product.title;
  const category = product.category;
  const price = product.price;
  const salePrice = product.salePrice;
  
  // استخراج الكلمات المفتاحية من العنوان
  const keywords = extractKeywords(title, category);
  
  // بناء وصف غني بالمحتوى
  let description = `${title} - منتج مميز يجمع بين الجودة العالية والتصميم العصري. `;
  
  // إضافة تفاصيل حسب الفئة
  description += getCategorySpecificDescription(title, category);
  
  // إضافة مميزات المنتج
  description += `\n\nيتميز ${title} بـ:\n`;
  description += `• جودة تصنيع عالية تضمن الاستخدام الطويل\n`;
  description += `• تصميم عملي يناسب احتياجاتك اليومية\n`;
  description += `• سهولة في الاستخدام والصيانة\n`;
  description += `• قيمة ممتازة مقابل السعر\n`;
  
  // إضافة معلومات السعر
  if (salePrice < price) {
    const discount = Math.round(((price - salePrice) / price) * 100);
    description += `\n💰 عرض خاص: خصم ${discount}% - السعر ${salePrice} درهم بدلاً من ${price} درهم\n`;
  }
  
  // إضافة الكلمات المفتاحية
  description += `\n🔍 الكلمات المفتاحية: ${keywords.join('، ')}\n`;
  
  // إضافة معلومات الشحن
  description += `\n📦 شحن مجاني لجميع إمارات الدولة\n`;
  description += `⚡ توصيل سريع خلال 24-48 ساعة\n`;
  description += `✅ ضمان الجودة والاستبدال خلال 7 أيام\n`;
  description += `🛡️ منتج أصلي 100%\n`;
  
  return description;
}

// دالة لاستخراج الكلمات المفتاحية
function extractKeywords(title, category) {
  const keywords = [title, category];
  
  // إضافة كلمات مفتاحية إضافية حسب المحتوى
  const commonKeywords = {
    'ساعة': ['ساعات فاخرة', 'ساعات رجالية', 'ساعات نسائية', 'إكسسوارات'],
    'حقيبة': ['حقائب نسائية', 'حقائب فاخرة', 'إكسسوارات', 'موضة'],
    'عطر': ['عطور فاخرة', 'عطور رجالية', 'عطور نسائية', 'فرنسية'],
    'جهاز': ['أجهزة منزلية', 'إلكترونيات', 'تقنية حديثة'],
    'مطبخ': ['أدوات مطبخ', 'طبخ', 'مطبخ عصري'],
    'سيارة': ['إكسسوارات سيارات', 'قطع غيار', 'سيارات'],
    'أطفال': ['ألعاب أطفال', 'منتجات أطفال', 'رعاية الأطفال'],
    'إضاءة': ['إنارة', 'ديكور', 'إضاءة LED', 'إضاءة منزلية']
  };
  
  for (const [key, values] of Object.entries(commonKeywords)) {
    if (title.includes(key)) {
      keywords.push(...values);
    }
  }
  
  return [...new Set(keywords)].slice(0, 8);
}

// دالة للحصول على وصف خاص بالفئة
function getCategorySpecificDescription(title, category) {
  const descriptions = {
    'ساعات': `تتميز ${title} بتصميم أنيق وحركة دقيقة، مقاومة للماء والخدش. مثالية للاستخدام اليومي والمناسبات الخاصة. `,
    'حقائب': `${title} مصنوعة من مواد فاخرة عالية الجودة مع تصميم عملي وأنيق. توفر مساحة واسعة ومنظمة لجميع احتياجاتك. `,
    'عطور': `${title} برائحة فاخرة تدوم طويلاً، تركيبة عطرية فريدة من أجود المكونات. مثالي لجميع المناسبات. `,
    'أدوات مطبخ': `${title} أداة مطبخ عملية مصنوعة من مواد آمنة وصحية، سهلة التنظيف والاستخدام. إضافة لا غنى عنها لمطبخك. `,
    'إكسسوارات سيارات': `${title} إكسسوار سيارة عملي يضيف الراحة والأناقة، مصنوع من مواد عالية الجودة وسهل التركيب. `,
    'صحة وعناية': `${title} منتج عناية احترافي بجودة عالية، يوفر نتائج فعالة وآمنة. سهل الاستخدام في المنزل. `,
    'إضاءة': `${title} إضاءة عصرية توفر إنارة مثالية، تصميم أنيق موفر للطاقة وطويل العمر. تضيف لمسة جمالية لمكانك. `,
    'أطفال': `${title} منتج آمن ومسلي للأطفال، تصميم مريح مصنوع من مواد عالية الجودة. يساعد على تنمية مهارات طفلك. `,
    'رحلات وتخييم': `${title} مثالي للرحلات والتخييم، خفيف الوزن وسهل الحمل. مصنوع من مواد متينة تتحمل الظروف الخارجية. `
  };
  
  return descriptions[category] || `${title} منتج عالي الجودة بتصميم عملي وعصري. مصنوع من مواد متينة تضمن الأداء الممتاز. `;
}

// تحديث جميع المنتجات
let updatedCount = 0;
products.forEach((product, index) => {
  const newDescription = generateRichDescription(product);
  product.description = newDescription;
  updatedCount++;
  
  if ((index + 1) % 100 === 0) {
    console.log(`تم تحديث ${index + 1} منتج...`);
  }
});

// حفظ الملف المحدث
const updatedContent = `export const products = ${JSON.stringify(products, null, 2)};`;
fs.writeFileSync(productsPath, updatedContent, 'utf8');

console.log(`\n✅ تم تحديث ${updatedCount} منتج بنجاح!`);
console.log(`📁 الملف: ${productsPath}`);
