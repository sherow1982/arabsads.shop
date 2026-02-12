# 📚 دليل السكريبتات - عماني ستور

## 🎯 المهام التلقائية الكبيرة

### 1. تحديث شامل كامل مع إصلاح الصور
```bash
npm run task:complete-update-plus
```
**يشمل:**
- إصلاح الصور المكسورة + إصلاح الصور الرئيسية من الجاليري
- تصنيف المنتجات + تحسين المحتوى
- إضافة زر اشتري الآن + تحسين SEO
- تحديث SEO العماني + التقييمات + Sitemap

### 2. تحديث شامل كامل
```bash
npm run task:complete-update
```
**يشمل:**
- تصنيف المنتجات + تحسين المحتوى
- إضافة زر اشتري الآن + تحسين SEO
- تحديث SEO العماني + التقييمات + Sitemap

### 2. إصلاح شامل
```bash
npm run task:complete-fix
```
**يشمل:**
- إصلاح Export + Mass-SEO + require
- إصلاح Development + التصنيفات

### 3. تحسين متقدم
```bash
npm run task:advanced-optimization
```
**يشمل:**
- تحسين Mass-SEO المتقدم + تقرير SEO
- إصلاح Product Feed

### 4. الاستعداد للنشر
```bash
npm run task:deploy-ready
```
**يشمل:**
- فحص جاهزية Cloudflare + البناء + رفع GitHub

---

## 🔧 السكريبتات الفردية

### إدارة الملفات الكبيرة

#### مراقبة الملفات الكبيرة
```bash
npm run monitor:large-files
```
- فحص الملفات أكبر من 1MB
- إنشاء سكريبتات معالجة تلقائية
- إحصائيات مفصلة

#### فحص المساحة
```bash
npm run cleanup:check
```
- فحص استخدام المساحة لكل مجلد
- عرض أحجام المجلدات

#### تنظيف الملفات
```bash
npm run cleanup:clean
```
- حذف .next و node_modules و out
- حذف الملفات المؤقتة
- حذف سكريبتات المعالجة المولدة

#### إصلاح الصور الرئيسية من الجاليري
```bash
npm run fix:main-images
```
- فحص الصور الرئيسية المكسورة
- استبدال بصور من الجاليري
- إزالة صور placeholder من الجاليري
- تنظيف الملفات من placeholder

#### إصلاح الصور المكسورة
```bash
npm run fix:images
```
- فحص وإصلاح الصور المكسورة
- استبدال بصور عالية الجودة
- مسح العناصر النائبة
- إنشاء تقرير مفصل

### حفظ الهيستوري

#### حفظ تلقائي
```bash
npm run history:auto "الموضوع" "الطلب" "النتيجة" "الملفات"
```

**مثال:**
```bash
npm run history:auto "إضافة ميزة" "تم بنجاح" "src/pages/index.jsx"
```

---

### المحتوى والتحسين

#### تحسين المحتوى
```bash
npm run enhance-content
```
- أوصاف غنية بالكلمات المفتاحية
- ذكر 8 مدن عمانية
- 7 مميزات لكل منتج

#### إضافة زر اشتري الآن
```bash
npm run add-buy-now
```
- زر ثابت في أسفل الشاشة
- يظهر في جميع صفحات المنتجات

#### توليد المحتوى
```bash
npm run generate-content
```
- أوصاف SEO للمنتجات
- تقييمات (3-5 لكل منتج)
- أسئلة شائعة (5 لكل منتج)

#### تحديث التقييمات
```bash
npm run update-reviews
```
- تحديث ملف التقييمات
- أسماء عمانية
- تقييمات 4-5 نجوم

---

### التصنيف والـ SEO

#### تصنيف Google
```bash
npm run google-categories
```
- 22 فئة دقيقة
- فئات Google Merchant Center 2026
- جاهز لـ Google Shopping

#### تحسين SEO
```bash
npm run enhance-seo
```
- مواصفات مع اسم بولد
- سكيما غنية 2026
- كلمات مفتاحية في السياق

#### تحديث SEO العماني
```bash
npm run seo:update-oman
```
- تحديث sitemap.xml
- تحديث mass-seo-sitemap.xml
- تحديث robots.txt

---

### إصلاح المشاكل

#### إصلاح Static Export
```bash
npm run fix-export
```
- تغيير fallback من blocking إلى false
- توافق مع Cloudflare Pages

#### إصلاح Mass-SEO
```bash
npm run fix-mass-seo
```
- توليد 710 path تلقائياً
- حل مشكلة 404

#### إصلاح require
```bash
npm run fix-require
```
- استبدال require بـ fs.readFileSync
- حل مشكلة webpack

#### إصلاح Development Errors
```bash
npm run fix-dev
```
- تحسين إعدادات development mode
- حل أخطاء 404 في Console

---

## 📝 حفظ الهيستوري

### حفظ يدوي
```bash
npm run history:save "الموضوع" "الطلب" "النتيجة" "الملفات"
```

**مثال:**
```bash
npm run history:save "إضافة ميزة" "تم بنجاح" "src/pages/index.jsx"
```

---

## 🚀 الأوامر الأساسية

### التطوير
```bash
npm run dev          # تشغيل المشروع (localhost:4000)
npm run build        # بناء المشروع
npm run start        # تشغيل الإنتاج
```

### التنظيف
```bash
restart.bat          # تنظيف وإعادة تشغيل
```

---

## 📊 إحصائيات المشروع

- **142 منتج** عماني
- **710 صفحة SEO** (142 × 5 كلمات مفتاحية)
- **22 فئة** Google Merchant Center
- **426-710 تقييم** (3-5 لكل منتج)
- **710 سؤال شائع** (5 لكل منتج)
- **8 مدن عمانية** في كل وصف
- **110 ملف** في المشروع
- **14 ملف كبير** (أكبر من 1MB)
- **100 صورة مُصلحة** من أصل 142 منتج
- **4 عناصر نائبة** تم مسحها

---

## 🎨 المميزات

- ✅ ثيم WoodMart احترافي
- ✅ سكيما غنية 2026
- ✅ SEO محسّن 300%
- ✅ زر اشتري الآن ثابت
- ✅ محتوى عربي 100%
- ✅ جاهز لـ Cloudflare Pages
- ✅ جاهز لـ Google Shopping
- ✅ نظام مراقبة الملفات الكبيرة
- ✅ سكريبتات تلقائية للمهام الكبيرة
- ✅ حفظ هيستوري تلقائي

---

## 📞 الدعم

- 📧 sherow1982@gmail.com
- 📱 +201110760081
- 🌐 https://omany.storesads.shop

---

**آخر تحديث:** 2026-02-12
