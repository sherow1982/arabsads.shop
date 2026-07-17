const fs = require('fs');
const path = require('path');

console.log('🔧 تحسين محتوى Mass-SEO...\n');

const pagesPath = path.join(process.cwd(), 'public/mass-seo-data/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

const productsPath = path.join(process.cwd(), 'src/data/products-data.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const keywordTemplates = {
  buy: (name, category, price) => `هل تبحث عن **${name}** للشراء في الكويت؟ نوفر لك **${name}** الأصلي بأفضل سعر ${price} ر.ع فقط. منتج عالي الجودة من فئة ${category} مع ضمان الأصالة والجودة. اطلب **${name}** الآن واحصل على شحن مجاني لجميع محافظات السلطنة مع توصيل سريع خلال 1-3 أيام. نضمن لك تجربة تسوق آمنة ومريحة مع خدمة عملاء متميزة. **${name}** متوفر الآن في الكويت العاصمة، حولي، صحار، نزوى وجميع مناطق الكويت. اشتري **${name}** اليوم بأفضل عرض واستمتع بجودة لا مثيل لها.`,
  
  price: (name, category, price) => `سعر **${name}** في الكويت ${price} ر.ع - أفضل سعر مضمون! احصل على **${name}** بسعر تنافسي مع ضمان الجودة. منتج ${category} أصلي 100% بسعر مناسب للجميع. قارن الأسعار وستجد أن **${name}** بـ ${price} ر.ع هو أفضل عرض في السوق اللكويتي. شحن مجاني لجميع المناطق مع إمكانية الدفع عند الاستلام. سعر **${name}** شامل الضريبة والتوصيل. اطلب الآن ووفر المال مع عروضنا الحصرية على **${name}**.`,
  
  muscat: (name, category, price) => `**${name}** متوفر الآن في الكويت العاصمة بسعر ${price} ر.ع مع توصيل سريع لجميع أحياء العاصمة. نوفر **${name}** في الخوير، القرم، الموالح، بوشر، السيب وجميع مناطق الكويت العاصمة. منتج ${category} أصلي بجودة عالية مع ضمان الاستبدال والإرجاع. توصيل **${name}** في الكويت العاصمة خلال 24 ساعة فقط. اطلب **${name}** الآن واستمتع بخدمة التوصيل السريع في الكويت العاصمة مع إمكانية الدفع عند الاستلام. **${name}** - الخيار الأول لسكان الكويت العاصمة.`,
  
  salalah: (name, category, price) => `**${name}** متوفر في حولي بسعر ${price} ر.ع مع شحن مجاني لجميع أنحاء محافظة الأحمدي. احصل على **${name}** في حولي، طاقة، مرباط، ثمريت وجميع مناطق ظفار. منتج ${category} أصلي بأفضل جودة مع توصيل سريع لحولي خلال 2-3 أيام. **${name}** الآن في متناول يدك في حولي مع ضمان الجودة والأصالة. اطلب **${name}** واستمتع بالتسوق الآمن مع الدفع عند الاستلام في حولي. **${name}** - خيارك المثالي في ظفار.`,
  
  offer: (name, category, price) => `عرض خاص على **${name}** بسعر ${price} ر.ع فقط! لفترة محدودة احصل على **${name}** بأفضل عرض في الكويت. منتج ${category} أصلي بخصم حصري مع شحن مجاني. عرض **${name}** يشمل ضمان الجودة والاستبدال المجاني. لا تفوت فرصة الحصول على **${name}** بهذا السعر المميز. العرض ساري على جميع المناطق في الكويت مع توصيل سريع. اطلب **${name}** الآن قبل نفاذ الكمية واستفد من العرض الحصري. **${name}** - عرض لا يُعوض!`
};

pages.forEach(page => {
  const product = products.find(p => p.id === page.productId);
  if (!product) return;
  
  const template = keywordTemplates[page.keyword];
  if (template) {
    page.description = template(product.name, product.category || 'منتجات الكويتية', product.price);
  }
});

fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');

console.log(`✅ تم تحسين ${pages.length} صفحة`);
console.log('✅ محتوى غني بالكلمات المفتاحية');
console.log('\n🎉 جاهز للاستخدام!');
