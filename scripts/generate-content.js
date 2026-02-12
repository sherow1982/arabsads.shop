const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// توليد وصف SEO من اسم المنتج
function generateDescription(name, category) {
  const templates = [
    `اكتشف ${name} الأصلي بأفضل سعر في سلطنة عمان. منتج عالي الجودة من فئة ${category} مع ضمان الجودة والأصالة. احصل على ${name} الآن مع شحن مجاني لجميع محافظات السلطنة وتوصيل سريع خلال 1-3 أيام عمل. نوفر لك أفضل تجربة تسوق أونلاين مع خدمة عملاء متميزة على مدار الساعة. اطلب ${name} اليوم واستمتع بجودة لا مثيل لها وأسعار تنافسية.`,
    
    `${name} متوفر الآن في عماني ستور بأفضل الأسعار. منتج أصلي 100% من ${category} مع ضمان الجودة. استمتع بتجربة تسوق فريدة مع ${name} وتوصيل مجاني لجميع مناطق عمان. نضمن لك الحصول على منتج عالي الجودة يلبي احتياجاتك. اشتري ${name} الآن واحصل على أفضل قيمة مقابل سعر ممتاز.`,
    
    `احصل على ${name} الأصلي من عماني ستور. منتج متميز في فئة ${category} بجودة عالية وسعر منافس. نوفر لك ${name} مع شحن مجاني وتوصيل سريع. تسوق بثقة مع ضمان الجودة والأصالة. ${name} هو الخيار الأمثل لمن يبحث عن الجودة والسعر المناسب في سلطنة عمان.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// توليد تقييمات
function generateReviews(productName) {
  const reviewTemplates = [
    { name: 'أحمد المعمري', rating: 5, comment: `منتج ممتاز! ${productName} جودة عالية وسعر مناسب. التوصيل كان سريع والتغليف محترف. أنصح بالشراء.`, verified: true },
    { name: 'فاطمة الحارثية', rating: 5, comment: `راضية جداً عن ${productName}. المنتج مطابق للوصف تماماً. شكراً لعماني ستور على الخدمة الممتازة.`, verified: true },
    { name: 'سالم البلوشي', rating: 4, comment: `${productName} جيد جداً. الجودة ممتازة والسعر معقول. التوصيل استغرق يومين فقط.`, verified: true },
    { name: 'مريم الشحية', rating: 5, comment: `أفضل ${productName} اشتريته! جودة ممتازة وخدمة عملاء رائعة. سأشتري مرة أخرى بالتأكيد.`, verified: true },
    { name: 'خالد الرواحي', rating: 5, comment: `منتج رائع! ${productName} يستحق السعر. التعامل مع المتجر كان سلس وسهل.`, verified: false }
  ];
  
  return reviewTemplates.slice(0, 3 + Math.floor(Math.random() * 3));
}

// توليد أسئلة شائعة
function generateFAQs(productName, category) {
  return [
    {
      q: `هل ${productName} أصلي؟`,
      a: `نعم، جميع منتجاتنا أصلية 100% ونضمن جودتها. ${productName} يأتي مع ضمان الأصالة من عماني ستور.`
    },
    {
      q: `كم يستغرق توصيل ${productName}؟`,
      a: `التوصيل يستغرق من 1 إلى 3 أيام عمل لجميع محافظات سلطنة عمان. الشحن مجاني لجميع الطلبات.`
    },
    {
      q: `هل يمكن إرجاع ${productName}؟`,
      a: `نعم، لديك 7 أيام لإرجاع المنتج إذا لم يكن مطابقاً للمواصفات أو في حالة وجود عيب صناعي.`
    },
    {
      q: `ما هي طرق الدفع المتاحة؟`,
      a: `نوفر الدفع عند الاستلام لجميع مناطق عمان. يمكنك الدفع نقداً للمندوب عند استلام ${productName}.`
    },
    {
      q: `هل ${productName} متوفر في المخزون؟`,
      a: `نعم، ${productName} متوفر حالياً في المخزون. اطلب الآن للحصول على توصيل سريع.`
    }
  ];
}

// معالجة المنتجات
let updatedCount = 0;
const updatedProducts = products.map(product => {
  let updated = false;
  
  // إضافة وصف إذا لم يكن موجوداً أو قصير جداً
  if (!product.description || product.description.length < 100) {
    product.description = generateDescription(product.name, product.category);
    updated = true;
  }
  
  // إضافة التقييمات
  if (!product.reviews) {
    product.reviews = generateReviews(product.name);
    updated = true;
  }
  
  // إضافة الأسئلة الشائعة
  if (!product.faqs) {
    product.faqs = generateFAQs(product.name, product.category);
    updated = true;
  }
  
  if (updated) updatedCount++;
  return product;
});

// حفظ الملف المحدث
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

console.log('✅ تم توليد المحتوى بنجاح!');
console.log(`📊 عدد المنتجات المحدثة: ${updatedCount} من ${products.length}`);
console.log(`📝 تم إضافة: أوصاف SEO + تقييمات + أسئلة شائعة`);
