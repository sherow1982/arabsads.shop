const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const cities = ['الكويت العاصمة', 'حولي', 'صحار', 'نزوى', 'البريمي', 'الرستاق', 'صور', 'عبري'];
const keywords = ['شراء', 'سعر', 'عرض', 'توصيل', 'أصلي', 'جودة عالية', 'ضمان'];

products.forEach(product => {
  const name = product.name || product.title;
  const category = product.category || 'منتج';
  const price = product.price || product.salePrice;
  
  // وصف غني بالكلمات المفتاحية
  const descriptions = [
    `احصل على **${name}** الأصلي بأفضل سعر في الكويت. يتميز هذا ${category} بجودة عالية وضمان كامل. متوفر الآن في ${cities.slice(0, 3).join('، ')} مع توصيل مجاني لجميع محافظات السلطنة. سعر ${name} المميز ${price} دينار كويتي فقط. اطلب الآن واستمتع بخدمة توصيل سريعة خلال 1-3 أيام. ${name} - الخيار الأمثل للباحثين عن الجودة والسعر المناسب في دولة الكويت.`,
    
    `**${name}** - منتج أصلي 100% من فئة ${category} بسعر ${price} ر.ع. نوفر لك ${name} بأعلى معايير الجودة مع ضمان الأصالة. شحن مجاني لكل من ${cities.slice(3, 6).join('، ')} وجميع مناطق الكويت. اشتري ${name} الآن واحصل على توصيل سريع وآمن. منتج موثوق ومجرب من آلاف العملاء في السلطنة. ${name} بسعر تنافسي وجودة لا تضاهى.`,
    
    `عرض خاص على **${name}** بسعر ${price} دينار كويتي. ${category} عالي الجودة مع ضمان شامل. ${name} متوفر للتوصيل في ${cities.slice(0, 4).join('، ')} وكافة محافظات الكويت. شحن مجاني وتوصيل خلال 1-3 أيام عمل. اطلب ${name} الآن واستفد من العرض المحدود. منتج أصلي بضمان الجودة والسعر الأفضل في السوق اللكويتي.`
  ];
  
  const randomDesc = descriptions[product.id % 3];
  
  // مواصفات محسّنة
  product.specs = {
    name: `**${name}**`,
    description: randomDesc,
    keywords: `${name}, شراء ${name}, سعر ${name}, ${name} الكويت, ${name} الكويت العاصمة, ${name} حولي, ${category}, ${category} الكويت, توصيل ${category}, ${name} أصلي, ${name} بضمان`,
    features: [
      `✓ **${name}** أصلي 100% بضمان الجودة`,
      `✓ شحن مجاني لجميع محافظات دولة الكويت`,
      `✓ توصيل سريع خلال 1-3 أيام عمل`,
      `✓ دفع آمن عند الاستلام`,
      `✓ خدمة عملاء متاحة على مدار الساعة`,
      `✓ سياسة إرجاع مرنة خلال 7 أيام`,
      `✓ منتج مجرب وموثوق من آلاف العملاء`
    ]
  };
});

fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
console.log(`✅ تم تحسين محتوى ${products.length} منتج بكلمات مفتاحية احترافية`);
