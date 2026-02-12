# 📧 دليل إعداد EmailJS لصفحة الدفع

## المشكلة الحالية
❌ **حدث خطأ في إرسال الطلب**

## السبب
إعدادات EmailJS غير مكتملة في ملف `.env.local`

---

## ✅ الحل: إعداد EmailJS (5 دقائق)

### الخطوة 1: إنشاء حساب EmailJS
1. اذهب إلى: https://www.emailjs.com/
2. اضغط **Sign Up** (مجاني 200 إيميل/شهر)
3. سجل بإيميلك

### الخطوة 2: إضافة خدمة البريد
1. من لوحة التحكم → **Email Services**
2. اضغط **Add New Service**
3. اختر **Gmail** (أو أي خدمة أخرى)
4. سجل دخول بحساب Gmail الخاص بك
5. انسخ **Service ID** (مثل: `service_abc123`)

### الخطوة 3: إنشاء قالب الإيميل
1. من لوحة التحكم → **Email Templates**
2. اضغط **Create New Template**
3. استخدم هذا القالب:

```
الموضوع: طلب جديد من {{customer_name}}

---

📦 طلب جديد من متجر عماني ستور

👤 معلومات العميل:
الاسم: {{customer_name}}
الهاتف: {{phone}}
البريد: {{email}}
العنوان: {{address}}
المدينة: {{city}}
الدولة: {{country}}

💳 طريقة الدفع: {{payment_method}}

📝 المنتجات:
{{products}}

💰 الإجمالي: {{total}} ر.ع

📌 ملاحظات:
{{notes}}

---
تم الإرسال من: https://omany.storesads.shop
```

4. احفظ القالب
5. انسخ **Template ID** (مثل: `template_xyz789`)

### الخطوة 4: الحصول على Public Key
1. من لوحة التحكم → **Account** → **General**
2. انسخ **Public Key** (مثل: `user_abc123xyz`)

### الخطوة 5: تحديث ملف .env.local
افتح ملف `.env.local` وحدث هذه القيم:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

### الخطوة 6: إعادة تشغيل المشروع
```bash
# أوقف المشروع (Ctrl+C)
# ثم شغله من جديد
npm run dev
```

---

## 🧪 اختبار الإعداد

1. افتح المتجر: http://localhost:4000
2. أضف منتج للسلة
3. اذهب للدفع: http://localhost:4000/checkout
4. املأ البيانات واضغط **إتمام الطلب**
5. يجب أن تصلك رسالة نجاح ✅
6. تحقق من إيميلك - يجب أن يصلك الطلب 📧

---

## 🔧 الإصلاحات المنفذة

✅ **معالجة أخطاء محسّنة**
- رسائل خطأ واضحة بالعربي
- التحقق من إعدادات EmailJS
- التحقق من السلة الفارغة

✅ **تحسينات UX**
- البريد الإلكتروني أصبح اختياري
- placeholders للحقول
- رسالة نجاح واضحة
- انتقال تلقائي لصفحة الشكر

✅ **صفحة شكر احترافية**
- تصميم جميل مع أيقونات
- معلومات التواصل
- أزرار واتساب ومكالمة
- روابط للمتابعة

---

## 📱 بدائل إذا لم يعمل EmailJS

### البديل 1: واتساب مباشر
```javascript
// في handleSubmit
const message = `
طلب جديد 🛍️
الاسم: ${formData.firstName} ${formData.lastName}
الهاتف: ${formData.phone}
العنوان: ${formData.address}
المنتجات: ${productsText}
الإجمالي: ${total} ر.ع
`;
window.open(`https://wa.me/201110760081?text=${encodeURIComponent(message)}`);
```

### البديل 2: Formspree (مجاني)
1. اذهب إلى: https://formspree.io/
2. أنشئ حساب مجاني
3. احصل على endpoint
4. استبدل EmailJS بـ Formspree

---

## 🎯 النتيجة النهائية

بعد الإعداد الصحيح:
- ✅ صفحة دفع تعمل 100%
- ✅ إرسال الطلبات عبر الإيميل
- ✅ رسائل خطأ واضحة
- ✅ صفحة شكر احترافية
- ✅ تجربة مستخدم ممتازة

---

**💡 نصيحة:** احتفظ بنسخة من الإعدادات في مكان آمن!
