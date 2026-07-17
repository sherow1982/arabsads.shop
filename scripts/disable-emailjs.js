const fs = require('fs');
const path = require('path');

console.log('🔧 تعطيل EmailJS واستخدام واتساب...\n');

const checkoutPath = path.join(process.cwd(), 'src/pages/checkout.jsx');
let content = fs.readFileSync(checkoutPath, 'utf8');

// استبدال handleSubmit بنسخة واتساب
const newHandleSubmit = `const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.phone || !formData.address) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (!items || items.length === 0) {
      toast.error('السلة فارغة! يرجى إضافة منتجات أولاً');
      return;
    }

    const productsText = items.map(item => 
      \`\${item.title} × \${item.quantity} = \${(item.salePrice * item.quantity).toFixed(2)} ر.ع\`
    ).join('\\n');

    const message = \`
🛍️ *طلب جديد من إعلانات العرب الكويت*

👤 *معلومات العميل:*
الاسم: \${formData.firstName} \${formData.lastName}
الهاتف: \${formData.phone}
البريد: \${formData.email || 'لا يوجد'}
العنوان: \${formData.address}
المدينة: \${formData.city || 'غير محدد'}
الدولة: \${formData.country}

💳 *طريقة الدفع:* \${formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}

📦 *المنتجات:*
\${productsText}

💰 *الإجمالي:* \${total.toFixed(2)} ر.ع

📝 *ملاحظات:* \${formData.notes || 'لا توجد'}
    \`.trim();

    const whatsappUrl = \`https://wa.me/201110760081?text=\${encodeURIComponent(message)}\`;
    
    dispatch(clearCart());
    toast.success('سيتم تحويلك لواتساب لإتمام الطلب');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      window.location.href = '/thank-you';
    }, 1000);
  };`;

content = content.replace(
  /const handleSubmit = async \(e\) => {[\s\S]*?};/,
  newHandleSubmit
);

fs.writeFileSync(checkoutPath, content, 'utf8');

console.log('✅ تم التعطيل بنجاح!\n');
console.log('📱 الآن الطلبات ستذهب مباشرة لواتساب');
console.log('🔗 رقم واتساب: +201110760081\n');
