# ⚙️ إضافة متغيرات البيئة في Cloudflare Pages

## 🚨 المشكلة
البناء يفشل لأن متغيرات EmailJS غير موجودة

## ✅ الحل (دقيقة واحدة)

### الخطوة 1: اذهب لإعدادات المشروع
```
Cloudflare Dashboard → Pages → [اسم المشروع] → Settings → Environment variables
```

### الخطوة 2: أضف هذه المتغيرات

**Production & Preview:**

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = user_abc123xyz
```

**ملاحظة:** استبدل القيم بالقيم الحقيقية من EmailJS

### الخطوة 3: أعد البناء
```
Deployments → Retry deployment
```

---

## 📋 جميع المتغيرات المطلوبة

```env
# EmailJS (مطلوب)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123xyz

# Google Analytics (اختياري)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# معلومات المتجر (اختياري - موجودة في الكود)
NEXT_PUBLIC_SITE_URL=https://omany.storesads.shop
```

---

## 🎯 إذا لم يكن عندك حساب EmailJS

### البديل السريع: تعطيل EmailJS مؤقتاً

سأنشئ سكريبت يعطل EmailJS ويستخدم واتساب بدلاً منه
