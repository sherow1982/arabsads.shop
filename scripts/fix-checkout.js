const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح صفحة الدفع...\n');

const checkoutPath = path.join(process.cwd(), 'src/pages/checkout.jsx');
let content = fs.readFileSync(checkoutPath, 'utf8');

// إصلاح 1: إضافة معالجة أخطاء أفضل
content = content.replace(
  /const handleSubmit = async \(e\) => {[\s\S]*?} catch \(error\) {[\s\S]*?}/,
  `const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من الحقول المطلوبة
    if (!formData.firstName || !formData.phone || !formData.address) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // التحقق من وجود منتجات في السلة
    if (!items || items.length === 0) {
      toast.error('السلة فارغة! يرجى إضافة منتجات أولاً');
      return;
    }

    // التحقق من إعدادات EmailJS
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('❌ إعدادات EmailJS غير موجودة في .env.local');
      toast.error('حدث خطأ في النظام. يرجى المحاولة لاحقاً');
      return;
    }

    const productsText = items.map(item => 
      \`\${item.title} × \${item.quantity} = \${(item.salePrice * item.quantity).toFixed(2)} ر.ع\`
    ).join('\\n');

    const templateParams = {
      customer_name: \`\${formData.firstName} \${formData.lastName}\`,
      phone: formData.phone,
      email: formData.email || 'لا يوجد',
      address: formData.address,
      city: formData.city || 'غير محدد',
      country: formData.country,
      notes: formData.notes || 'لا توجد',
      payment_method: formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي',
      products: productsText,
      total: total.toFixed(2),
    };

    try {
      // إرسال الطلب عبر EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      // تتبع Google Analytics
      const orderId = 'ORD-' + Date.now();
      if (typeof gtag !== 'undefined' && gtag.purchase) {
        gtag.purchase(orderId, items, total);
      }
      
      // مسح السلة
      dispatch(clearCart());
      
      // رسالة نجاح
      toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
      
      // الانتقال لصفحة الشكر
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 1500);
      
    } catch (error) {
      console.error('❌ خطأ في إرسال الطلب:', error);
      toast.error('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة');
    }
  }`
);

// إصلاح 2: جعل البريد الإلكتروني اختياري
content = content.replace(
  /<label htmlFor="email" className="block mb-2.5">\s*البريد الإلكتروني <span className="text-red">\*<\/span>/g,
  '<label htmlFor="email" className="block mb-2.5">\n                      البريد الإلكتروني (اختياري)'
);

// إصلاح 3: إضافة placeholder للحقول
content = content.replace(
  /name="city"\s*id="city"/,
  'name="city"\n                      id="city"\n                      placeholder="مسقط، صلالة، صحار..."'
);

content = content.replace(
  /name="phone"\s*id="phone"/,
  'name="phone"\n                      id="phone"\n                      placeholder="+968 9XXXXXXX"'
);

content = content.replace(
  /name="email"\s*id="email"/,
  'name="email"\n                      id="email"\n                      placeholder="example@email.com (اختياري)"'
);

// حفظ الملف
fs.writeFileSync(checkoutPath, content, 'utf8');

console.log('✅ تم إصلاح صفحة الدفع بنجاح!\n');
console.log('📋 الإصلاحات المنفذة:');
console.log('  1. ✓ معالجة أخطاء محسّنة');
console.log('  2. ✓ التحقق من إعدادات EmailJS');
console.log('  3. ✓ التحقق من السلة الفارغة');
console.log('  4. ✓ البريد الإلكتروني اختياري');
console.log('  5. ✓ إضافة placeholders للحقول');
console.log('  6. ✓ رسائل خطأ واضحة\n');
